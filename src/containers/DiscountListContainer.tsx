import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { cartDiscountState } from '../store/atoms';
import DiscountList from '../components/DiscountList';
import { requestDiscounts } from '../api';

interface DiscountContainerProps {
  history: RouteComponentProps;
}

const DiscountContainer = (props: DiscountContainerProps) => {
  const { history } = props;
  const [selectedDiscountList, setSelectedDiscountList] = useRecoilState(
    cartDiscountState
  );

  const [discount, setDiscount] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDiscount = async () => {
      setIsLoading(true);

      const data: object = await requestDiscounts();
      const items: [string, object][] = [];

      for (let key in data) items.push([key, data[key]]);
      setDiscount(items);

      setIsLoading(false);
    };

    getDiscount();
  }, []);

  const handleBack = () => {
    history.goBack();
  };

  const handleSelectedDiscountList = (
    item: [
      string,
      {
        name: string;
        rate: number;
      }
    ]
  ) => {
    const index = selectedDiscountList.map(item => item[0]).indexOf(item[0]);
    const newItemList = [...selectedDiscountList];

    index === -1 ? newItemList.push(item) : newItemList.splice(index, 1);
    setSelectedDiscountList(newItemList);
  };

  return (
    <DiscountList
      isLoading={isLoading}
      discount={discount}
      selectedDiscountList={selectedDiscountList}
      handleSelectedDiscountList={handleSelectedDiscountList}
      handleBack={handleBack}
    />
  );
};

export default DiscountContainer;
