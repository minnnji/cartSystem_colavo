import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import CartHeader from './layout/CartHeader';
import { Button, HalfButton } from './layout/Button';
import InputNumber from './layout/InputNumber';
import NoList from './layout/NoList';
import theme from './layout/theme';
import { BsTrashFill } from 'react-icons/bs';

interface Discount {
  name: string;
  rate: number;
}

interface Item {
  count: number;
  name: string;
  price: number;
}

interface CartProps {
  isLoading: boolean;
  history: RouteComponentProps;
  schedule: {
    name: string;
    date: string;
  };
  currencyCode: string;
  items: { [key: string]: Item };
  discountList: [
    string,
    {
      name: string;
      rate: number;
      discountCost: number;
      targetItem: [
        string,
        {
          count: number;
          name: string;
          price: number;
        }
      ][];
    }
  ][];
  totalCost: number;
  // handleItemCount: (key: string, count: number) => void;
  // removeItem: (key: string) => void;
  // removeDiscount: (key: string) => void;
}

const Cart = (props: CartProps) => {
  const {
    isLoading,
    history,
    schedule,
    currencyCode,
    items,
    discountList,
    totalCost
    // handleItemCount,
    // removeItem,
    // removeDiscount
  } = props;

  console.log(items);

  const itemList = Object.keys(items).map((key: string) => {
    const { count, name, price } = items[key];
    return (
      <Li key={key}>
        <Info>
          <Title>{name}</Title>
          <Memo>{price.toLocaleString()}원</Memo>
          <InputNumber
            currentCount={count}
            max={10}
            // handleCount={count => handleItemCount(key, count)}
          />
        </Info>
        <Cost>{(price * count).toLocaleString()}원</Cost>
        <RemoveButton
        // onClick={() => removeItem(key)}
        >
          <BsTrashFill />
        </RemoveButton>
      </Li>
    );
  });

  const targetItems = targetList =>
    targetList.map(item => <Target key={item[0]}>{item[1].name}</Target>);

  const discounts = discountList.map(discount => {
    return (
      <Li key={discount[0]}>
        <Info>
          <Title>{discount[1].name}</Title>
          <Memo>{Math.floor(discount[1].rate * 100)}% 할인</Memo>
          {discount[1].targetItem && (
            <Memo>{targetItems(discount[1].targetItem)}</Memo>
          )}
        </Info>
        <Discount>- {Math.floor(discount[1].discountCost)}원</Discount>
        <RemoveButton
        // onClick={() => removeDiscount(discount[0])}
        >
          <BsTrashFill />
        </RemoveButton>
      </Li>
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
      <section>
        <Content>
          <SubTitle>시술</SubTitle>
          <ul>
            {isLoading ? (
              <div>Loading...</div>
            ) : Object.keys(items).length ? (
              itemList
            ) : (
              <NoList text='시술을 추가해주세요.' />
            )}
          </ul>
        </Content>
        {discounts.length > 0 && (
          <Content>
            <SubTitle>할인</SubTitle>
            <ul>{discounts}</ul>
          </Content>
        )}
        <CostWrap>
          <div>총 결제금액</div>
          {currencyCode === 'KRW' && (
            <TotalCost>{totalCost.toLocaleString()}원</TotalCost>
          )}
          {currencyCode === 'USD' && <TotalCost>${totalCost / 1200}</TotalCost>}
        </CostWrap>
        <Button purple>다음</Button>
      </section>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 16px;
`;

const ButtonWrap = styled.div`
  margin-bottom: 20px;
`;

const Content = styled.div`
  margin-bottom: 20px;
`;

const SubTitle = styled.h3`
  padding: 10px 0;
  margin-bottom: 10px;
  color: ${theme.COLOR_GRAY_3};
  border-bottom: 1px solid ${theme.COLOR_GRAY_2};
`;

const Li = styled.li`
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

const Memo = styled.dd`
  margin-bottom: 10px;
  font-weight: 200;
  font-size: 16px;
  color: ${theme.COLOR_GRAY_3};
`;

const Target = styled.span`
  margin-right: 5px;
`;

const Cost = styled.div`
  position: absolute;
  right: 40px;
  font-size: 18px;
  color: ${theme.COLOR_GRREN_1};
`;

const Discount = styled(Cost)`
  color: ${theme.COLOR_PINK_2};
`;

const RemoveButton = styled.button.attrs({
  type: 'button'
})`
  position: absolute;
  right: 0px;
`;

const CostWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const TotalCost = styled.div`
  font-size: 24px;
`;

export default Cart;
