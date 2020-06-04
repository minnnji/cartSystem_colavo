import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  cartItemIdState,
  cartItemState,
  cartDiscountIdState,
  cartDiscountState
} from '../store/atoms';
import {
  requestCurrencyCode,
  requestItemByIdList,
  requestDiscountByIdList
} from '../api';
import Cart from '../components/Cart';

interface Item {
  count: number;
  name: string;
  price: number;
}

interface Discount {
  name: string;
  rate: number;
  targetItems: { [key: string]: Item };
  costForDiscount: number;
}

interface CartContainerProps {
  history: RouteComponentProps;
}

const CartContainer = (props: CartContainerProps) => {
  const { history } = props;
  const schedule = {
    name: '최민지',
    date: '2020. 6. 2. 오후 6:00'
  };

  const [cartItemIds, setCartItemIds] = useRecoilState(cartItemIdState);
  const [cartItems, setCartItems] = useRecoilState(cartItemState);
  const [cartDiscountIds, setCartDiscountIds] = useRecoilState(
    cartDiscountIdState
  );
  const [cartDiscounts, setCartDiscounts] = useRecoilState(cartDiscountState);

  const [isLoading, setIsLoading] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [currencyCode, setCurrencyCode] = useState('');

  useEffect(() => {
    const getCurrencyCode = async () => {
      const code = await requestCurrencyCode();
      setCurrencyCode(code);
    };
    getCurrencyCode();
  }, []);

  const cartItemIdList = Object.keys(cartItemIds);
  useEffect(() => {
    // instead of getItemById
    const getItem = async () => {
      try {
        setIsLoading(true);
        const data:
          | { [key: string]: Item }
          | undefined = await requestItemByIdList(cartItemIdList);

        for (let key in data) {
          data[key].count = cartItemIds[key].count;
        }
        setCartItems(data);

        setIsLoading(false);
      } catch (err) {
        console.warn(err);
      }
    };

    if (cartItemIdList.length) getItem();
  }, []);

  const cartDiscountIdList = Object.keys(cartDiscountIds);
  useEffect(() => {
    // instead of getDiscountById
    const getDiscount = async () => {
      try {
        setIsLoading(true);
        const data:
          | { [key: string]: Discount }
          | undefined = await requestDiscountByIdList(cartDiscountIdList);

        for (let key in data) {
          data[key].targetItems = cartDiscountIds[key].targetItems;
          data[key].costForDiscount = cartDiscountIds[key].costForDiscount;
        }
        setCartDiscounts(data);

        setIsLoading(false);
      } catch (err) {
        console.warn(err);
      }
    };

    if (cartDiscountIdList.length) getDiscount();
  }, []);

  // useEffect(() => {
  //   const handleTotalCost = () => {
  //     let totalPrice,
  //       totalDiscountCost = 0;
  //     if (seletedItemList.length) {
  //       const costList = seletedItemList.map(
  //         item => item[1].price * item[1].count
  //       );
  //       totalPrice = costList.reduce((acc, cur) => acc + cur);

  //       if (selectedDiscountList.length) {
  //         const discountCostList = selectedDiscountList.map(
  //           discount => discount[1].discountCost
  //         );
  //         totalDiscountCost = discountCostList.reduce((acc, cur) => acc + cur);
  //       }
  //       setTotalCost(totalPrice - totalDiscountCost);
  //     }
  //   };
  //   handleTotalCost();
  // });

  const handleItemCount = (key: string, count: number) => {
    const updateItemInfo = { ...cartItems[key], count };
    const newItems = { ...cartItems };
    newItems[key] = updateItemInfo;
    setCartItemIds(newItems);
  };

  const removeItem = (key: string) => {
    const newItems = { ...cartItems };
    delete newItems[key];
    setCartItemIds(newItems);
    setCartItems(newItems);
  };

  const removeDiscount = (key: string) => {
    const newDiscounts = { ...cartDiscounts };
    delete newDiscounts[key];
    setCartDiscountIds(newDiscounts);
    setCartDiscounts(newDiscounts);
  };

  // const handleItemCount = (key: string, count: number) => {
  //   const newItemList = seletedItemList.map(item => {
  //     const itemKey = item[0];
  //     const itemInfo = item[1];
  //     return itemKey === key ? [itemKey, { ...itemInfo, count: count }] : item;
  //   });

  //   setSelectedItemList(newItemList);
  // };

  // const removeDiscount = (key: string) => {
  //   const newDiscountList = selectedDiscountList.filter(
  //     discount => discount[0] !== key
  //   );
  //   setSelectedDiscountList(newDiscountList);
  // };

  return (
    <Cart
      isLoading={isLoading}
      history={history}
      schedule={schedule}
      currencyCode={currencyCode}
      cartItems={cartItems}
      cartDiscounts={cartDiscounts}
      totalCost={totalCost}
      handleItemCount={handleItemCount}
      removeItem={removeItem}
      removeDiscount={removeDiscount}
    />
  );
};

export default CartContainer;
