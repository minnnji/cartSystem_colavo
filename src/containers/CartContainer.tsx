import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { cartItemState, cartDiscountState } from '../store/atoms';
import Cart from '../components/Cart';

interface CartContainerProps {
  history: RouteComponentProps;
}

const CartContainer = (props: CartContainerProps) => {
  const { history } = props;
  const schedule = {
    name: '최민지',
    date: '2020. 6. 2. 오후 6:00'
  };

  const [seletedItemList, setSelectedItemList] = useRecoilState(cartItemState);
  const [selectedDiscountList, setSelectedDiscountList] = useRecoilState(
    cartDiscountState
  );

  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const handleTotalCost = () => {
      let totalPrice,
        totalDiscountCost = 0;
      if (seletedItemList.length) {
        const costList = seletedItemList.map(
          item => item[1].price * item[1].count
        );
        totalPrice = costList.reduce((acc, cur) => acc + cur);

        if (selectedDiscountList.length) {
          const discountCostList = selectedDiscountList.map(
            discount => discount[1].discountCost
          );
          totalDiscountCost = discountCostList.reduce((acc, cur) => acc + cur);
        }
        setTotalCost(totalPrice - totalDiscountCost);
      }
    };
    handleTotalCost();
  });

  const handleItemCount = (key: string, count: number) => {
    const newItemList = seletedItemList.map(item => {
      const itemKey = item[0];
      const itemInfo = item[1];
      return itemKey === key ? [itemKey, { ...itemInfo, count: count }] : item;
    });

    setSelectedItemList(newItemList);
  };

  const removeItem = (key: string) => {
    const newItemList = seletedItemList.filter(item => item[0] !== key);
    setSelectedItemList(newItemList);
  };

  const removeDiscount = (key: string) => {
    const newDiscountList = selectedDiscountList.filter(
      discount => discount[0] !== key
    );
    setSelectedDiscountList(newDiscountList);
  };

  return (
    <Cart
      history={history}
      schedule={schedule}
      itemList={seletedItemList}
      discountList={selectedDiscountList}
      totalCost={totalCost}
      handleItemCount={handleItemCount}
      removeItem={removeItem}
      removeDiscount={removeDiscount}
    />
  );
};

export default CartContainer;
