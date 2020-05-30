import React from 'react';
import styled from 'styled-components';
import theme from './theme';

interface CartHeaderProps {
  name: string;
  date: string;
}

const CartHeader = ({ name, date }: CartHeaderProps) => {
  return (
    <CartHeaderWrap>
      <Close>X</Close>
      <Name>{name}</Name>
      <Date>{date}</Date>
    </CartHeaderWrap>
  );
};

const CartHeaderWrap = styled.header`
  position: relative;
  margin-bottom: 16px;
  line-height: 22px;
  text-align: center;
`;

const Close = styled.button`
  position: absolute;
  top: 4px;
  right: 0px;
  padding: 4px;
  font-size: 18px;
  border: none;
  background-color: ${theme.COLOR_BG};
`;

const Name = styled.h3`
  font-weight: 600;
  text-align: center;
`;

const Date = styled.h4`
  color: ${theme.COLOR_GRAY_2};
  font-size: 14px;
`;

export default CartHeader;
