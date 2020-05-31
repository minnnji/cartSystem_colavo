import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import CartHeader from './layout/CartHeader';
import { HalfButton } from './layout/Button';

interface CartProps {
  history: RouteComponentProps;
  schedule: {
    name: string;
    date: string;
  };
}

const Cart = (props: CartProps) => {
  const { history, schedule } = props;

  return (
    <Wrapper>
      <CartHeader name={schedule.name} date={schedule.date} />
      <ButtonWrapper>
        <HalfButton onClick={() => history.push('/cart/item')}>
          + 시술 추가
        </HalfButton>
        <HalfButton pink onClick={() => history.push('/cart/discount')}>
          + 할인 추가
        </HalfButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 16px;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 16px;
`;

export default Cart;
