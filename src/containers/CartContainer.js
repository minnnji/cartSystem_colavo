import React from 'react';
import styled from 'styled-components';
import CartHeader from '../components/layout/CartHeader.tsx';
import { HalfButton } from '../components/layout/Button.tsx';

function CartContainer() {
  const name = '최민지';
  const date = '2020. 6. 2. 오후 6:00';

  return (
    <Wrapper>
      <CartHeader name={name} date={date} />
      <ButtonWrapper>
        <HalfButton>+ 시술 추가</HalfButton>
        <HalfButton pink>+ 할인 추가</HalfButton>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 16px;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 16px;
`;

export default CartContainer;
