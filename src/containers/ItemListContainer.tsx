import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { cartItemIdState } from '../store/atoms';
import ItemList from '../components/ItemList';
import { requestItem } from '../api';

interface Item {
  count: number;
  name: string;
  price: number;
}

interface DiscountContainerProps {
  history: RouteComponentProps;
}

const ItemContainer = (props: DiscountContainerProps) => {
  const { history } = props;
  const [selectedItemIds, setSelectedItemIds] = useRecoilState(cartItemIdState);

  const [items, setItems] = useState<{ [key: string]: Item }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      try {
        setIsLoading(true);
        const data: { [key: string]: Item } = await requestItem();
        setItems(data);
        setIsLoading(false);
      } catch (err) {
        console.warn(err);
      }
    };

    getItem();
  }, []);

  useEffect(() => {
    if (isUpdate) history.push('/cart');
  }, [isUpdate]);

  const handleBack = () => {
    history.goBack();
  };

  const submitItems = (items = Object) => {
    setSelectedItemIds(items);
    setIsUpdate(true);
  };

  return (
    <ItemList
      isLoading={isLoading}
      items={items}
      selectedItemIds={selectedItemIds}
      handleBack={handleBack}
      submitItems={submitItems}
    />
  );
};

export default ItemContainer;
