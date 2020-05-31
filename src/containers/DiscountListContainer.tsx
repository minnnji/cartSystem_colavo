import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import DiscountList from '../components/DiscountList';
import { requestDiscounts } from '../api';

interface DiscountContainerProps {
  history: RouteComponentProps;
}

const DiscountContainer = (props: DiscountContainerProps) => {
  const { history } = props;
  const [discount, setDiscount] = useState({});

  const handleBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const getDiscount = async () => {
      const data = await requestDiscounts();
      setDiscount(data);
    };

    getDiscount();
  }, []);

  return <DiscountList discount={discount} handleBack={handleBack} />;
};

export default DiscountContainer;
