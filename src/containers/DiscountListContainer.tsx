import React, { ReactElement, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  cartItemIdState,
  cartDiscountState,
  currentModal
} from '../store/atoms';
import DiscountList from '../components/DiscountList';
import Modal from '../components/layout/Modal';
import { requestDiscounts } from '../api';

interface Discount {
  name: string;
  rate: number;
}

interface Item {
  count: number;
  name: string;
  price: number;
}

interface DiscountContainerProps {
  history: RouteComponentProps;
}

const DiscountContainer = (props: DiscountContainerProps) => {
  const { history } = props;
  const [selectedDiscountList, setSelectedDiscountList] = useRecoilState(
    cartDiscountState
  );
  const [modalState, setModalState] = useRecoilState(currentModal);
  const itemList = useRecoilValue(cartItemIdState);
  const closeModal = useResetRecoilState(currentModal);

  const [discountList, setDiscountList] = useState<[string, Discount][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getDiscount = async () => {
      setIsLoading(true);

      const data: object = await requestDiscounts();
      const newDiscountList: [string, Discount][] = [];

      for (let key in data) newDiscountList.push([key, data[key]]);
      setDiscountList(newDiscountList);

      setIsLoading(false);
    };

    getDiscount();
  }, []);

  const handleSelectedDiscountList = (item: [string, Discount]) => {
    const index = selectedDiscountList.map(item => item[0]).indexOf(item[0]);
    const newItemList = [...selectedDiscountList];

    index === -1 ? newItemList.push(item) : newItemList.splice(index, 1);
    setSelectedDiscountList(newItemList);
  };

  const handleTargetItem = (
    discountKey: string,
    targetItem: [string, Item][]
  ) => {
    const itemCostList = targetItem.map(item => item[1].price * item[1].count);
    const totalCostForDiscount = itemCostList.reduce((acc, cur) => acc + cur);

    const newList = selectedDiscountList.map(discount => {
      const info = discount[1];
      return discount[0] === discountKey
        ? [
            discountKey,
            {
              ...info,
              targetItem,
              discountCost: totalCostForDiscount * discount[1].rate
            }
          ]
        : discount;
    });
    setSelectedDiscountList(newList);
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleModalOpen = (title: string, children: ReactElement) => {
    const newModal = { ...modalState, isDisplay: true, title, children };
    setModalState(newModal);
  };

  return (
    <>
      <DiscountList
        isLoading={isLoading}
        discountList={discountList}
        itemList={itemList}
        selectedDiscountList={selectedDiscountList}
        handleSelectedDiscountList={handleSelectedDiscountList}
        handleTargetItem={handleTargetItem}
        handleModalOpen={handleModalOpen}
        handleModalClose={closeModal}
        handleBack={handleBack}
      />
      <Modal
        isDisplay={modalState.isDisplay}
        handleClose={closeModal}
        title={modalState.title}
        children={modalState.children}
      />
    </>
  );
};

export default DiscountContainer;
