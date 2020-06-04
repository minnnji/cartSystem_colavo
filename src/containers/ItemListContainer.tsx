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
  }, [selectedItemIds]);

  const handleBack = () => {
    history.goBack();
  };

  const handleNext = () => {
    history.push('/cart');
  };

  return (
    <ItemList
      isLoading={isLoading}
      items={items}
      selectedItemIds={selectedItemIds}
      setSelectedItemIds={setSelectedItemIds}
      handleBack={handleBack}
      handleNext={handleNext}
    />
  );
};

export default ItemContainer;
