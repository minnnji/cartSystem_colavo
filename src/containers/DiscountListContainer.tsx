import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartItemState, cartDiscountIdState } from '../store/atoms';
import DiscountList from '../components/DiscountList';
import { requestDiscounts } from '../api';

interface Discount {
  name: string;
  rate: number;
}

interface DiscountContainerProps {
  history: RouteComponentProps;
}

const DiscountContainer = (props: DiscountContainerProps) => {
  const { history } = props;

  const cartItems = useRecoilValue(cartItemState);
  const [cartDiscountIds, setCartDiscountIds] = useRecoilState(
    cartDiscountIdState
  );

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

  const submitDiscounts = (items = Object) => {
    setCartDiscountIds(items);
    setIsUpdate(true);
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <>
      <DiscountList
        isLoading={isLoading}
        discounts={discounts}
        cartItems={cartItems}
        cartDiscountIds={cartDiscountIds}
        submitDiscounts={submitDiscounts}
        handleBack={handleBack}
      />
    </>
  );
};

export default DiscountContainer;
