import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import CartHeader from './layout/CartHeader';
import { HalfButton } from './layout/Button';
import InputNumber from './layout/InputNumber';
import NoList from './layout/NoList';
import theme from './layout/theme';
import { BsTrashFill } from 'react-icons/bs';

interface CartProps {
  history: RouteComponentProps;
  schedule: {
    name: string;
    date: string;
  };
  itemList: [
    string,
    {
      count: number;
      name: string;
      price: number;
    }
  ][];
}

const Cart = (props: CartProps) => {
  const { history, schedule, itemList } = props;

  // cost, handleRemove 추가 예정
  const items = itemList.map(item => {
    return (
      <Item>
        <Info>
          <Title>{item[1].name}</Title>
          <Price>{item[1].price.toLocaleString()}원</Price>
          <InputNumber />
        </Info>
        <Cost>가격 * 수량</Cost>
        <RemoveButton onClick={() => alert('handleRemove')}>
          <BsTrashFill />
        </RemoveButton>
      </Item>
    );
  });

  return (
    <Wrap>
      <CartHeader name={schedule.name} date={schedule.date} />
      <ButtonWrap>
        <HalfButton onClick={() => history.push('/cart/item')}>
          + 시술 추가
        </HalfButton>
        <HalfButton pink onClick={() => history.push('/cart/discount')}>
          + 할인 추가
        </HalfButton>
      </ButtonWrap>
      <CartWrap>
        <SubTitle>시술</SubTitle>
        <ul>{items.length ? items : <NoList text='시술을 추가해주세요.' />}</ul>
      </CartWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 16px;
`;

const ButtonWrap = styled.div`
  margin-bottom: 20px;
`;

const CartWrap = styled.section``;

const SubTitle = styled.h3`
  padding: 10px 0;
  margin-bottom: 10px;
  color: ${theme.COLOR_GRAY_3};
  border-bottom: 1px solid ${theme.COLOR_GRAY_2};
`;

const Item = styled.li`
  display: flex;
  position: relative;
  align-items: center;
  padding: 20px 0;
  border-bottom: 2px dotted ${theme.COLOR_GRAY_1};
`;

const Info = styled.dl`
  max-width: 60%;
  margin-right: 10px;
  font-size: 18px;
`;

const Title = styled.dt`
  margin-bottom: 10px;
`;

const Price = styled.dd`
  margin-bottom: 10px;
  font-weight: 200;
  font-size: 16px;
  color: ${theme.COLOR_GRREN_1};
`;

const Cost = styled.div`
  position: absolute;
  right: 30px;
  font-size: 18px;
`;

const RemoveButton = styled.button.attrs({
  type: 'button'
})`
  position: absolute;
  right: 0px;
`;

export default Cart;
