import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ItemList from '../components/ItemList';
import { requestItem } from '../api';

interface DiscountContainerProps {
  history: RouteComponentProps;
}

const ItemContainer = (props: DiscountContainerProps) => {
  const { history } = props;
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const getItem = async () => {
      setIsLoading(true);
      const data = await requestItem();
      setItem(data);
      setIsLoading(false);
    };

    getItem();
  }, []);

  return <ItemList isLoading={isLoading} item={item} handleBack={handleBack} />;
};

export default ItemContainer;
