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

  return (
    <Cart history={history} schedule={schedule} itemList={seletedItemList} />
  );
};

export default CartContainer;
