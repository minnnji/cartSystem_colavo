import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { cartItemState } from '../store/atoms';
import ItemList from '../components/ItemList';
import { requestItem } from '../api';

interface DiscountContainerProps {
  history: RouteComponentProps;
}

const initialItemList = ['', { count: 0, name: '', price: 0 }];

const ItemContainer = (props: DiscountContainerProps) => {
  const { history } = props;
  const [selectedItemList, setSelectedItemList] = useRecoilState(cartItemState);

  const [itemList, setItemList] = useState([initialItemList]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      setIsLoading(true);

      const data: object = await requestItem();
      const items: [string, object][] = [];

      for (let key in data) items.push([key, data[key]]);
      setItemList(items);

      setIsLoading(false);
    };

    getItem();
  }, []);

  const handleBack = () => {
    history.goBack();
  };

  const handleSelectedItemList = (
    item: [
      string,
      {
        count: number;
        name: string;
        price: number;
      }
    ]
  ) => {
    const index = selectedItemList.map(item => item[0]).indexOf(item[0]);
    const newItemList = [...selectedItemList];

    index === -1 ? newItemList.push(item) : newItemList.splice(index, 1);
    setSelectedItemList(newItemList);
  };

  return (
    <ItemList
      isLoading={isLoading}
      itemList={itemList}
      selectedItemList={selectedItemList}
      handleSelectedItemList={handleSelectedItemList}
      handleBack={handleBack}
    />
  );
};

export default ItemContainer;
