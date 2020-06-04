import React, { ReactElement, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  cartItemState,
  cartDiscountIdState,
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
  const [cartDiscountIds, setCartDiscountIds] = useRecoilState(
    cartDiscountIdState
  );
  const [modalState, setModalState] = useRecoilState(currentModal);
  const cartItems = useRecoilValue(cartItemState);
  const closeModal = useResetRecoilState(currentModal);

  const [discounts, setDiscounts] = useState<{ [key: string]: Discount }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    const getDiscount = async () => {
      try {
        setIsLoading(true);
        const data: { [key: string]: Discount } = await requestDiscounts();
        setDiscounts(data);
        setIsLoading(false);
      } catch (err) {
        console.warn(err);
      }
    };
    getDiscount();
  }, []);

  useEffect(() => {
    if (isUpdate) history.push('/cart');
  }, [isUpdate]);

  // const handleSelectedDiscountList = (item: [string, Discount]) => {
  //   const index = selectedDiscountList.map(item => item[0]).indexOf(item[0]);
  //   const newItemList = [...selectedDiscountList];

  //   index === -1 ? newItemList.push(item) : newItemList.splice(index, 1);
  //   setSelectedDiscountList(newItemList);
  // };

  // const handleTargetItem = (
  //   discountKey: string,
  //   targetItem: [string, Item][]
  // ) => {
  //   const itemCostList = targetItem.map(item => item[1].price * item[1].count);
  //   const totalCostForDiscount = itemCostList.reduce((acc, cur) => acc + cur);

  //   const newList = selectedDiscountList.map(discount => {
  //     const info = discount[1];
  //     return discount[0] === discountKey
  //       ? [
  //           discountKey,
  //           {
  //             ...info,
  //             targetItem,
  //             discountCost: totalCostForDiscount * discount[1].rate
  //           }
  //         ]
  //       : discount;
  //   });
  //   setSelectedDiscountList(newList);
  // };

  const handleBack = () => {
    history.goBack();
  };

  const submitDiscounts = (items = Object) => {
    setCartDiscountIds(items);
    setIsUpdate(true);
  };

  const handleModalOpen = (title: string, children: ReactElement) => {
    const newModal = { ...modalState, isDisplay: true, title, children };
    setModalState(newModal);
  };

  return (
    <>
      <DiscountList
        isLoading={isLoading}
        discounts={discounts}
        cartItems={cartItems}
        cartDiscountIds={cartDiscountIds}
        submitDiscounts={submitDiscounts}
        // handleTargetItem={handleTargetItem}
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
