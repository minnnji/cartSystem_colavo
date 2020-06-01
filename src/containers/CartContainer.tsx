import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { cartItemState } from '../store/atoms';
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

  return (
    <Cart
      history={history}
      schedule={schedule}
      itemList={seletedItemList}
      handleItemCount={handleItemCount}
      removeItem={removeItem}
    />
  );
};

export default CartContainer;
