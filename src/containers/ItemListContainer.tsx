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

  const handleBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const getItem = async () => {
      const data = await requestItem();
      setItem(data);
    };

    getItem();
  }, []);

  return <ItemList item={item} handleBack={handleBack} />;
};

export default ItemContainer;
