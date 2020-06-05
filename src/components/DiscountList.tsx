import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './layout/Header';
import Loading from './layout/Loading';
import CheckBox from './layout/Checkbox.js';
import theme from './layout/theme';
import Submit from './layout/Submit';

interface Discount {
  name: string;
  rate: number;
}

interface Item {
  count: number;
  name: string;
  price: number;
}

interface DiscountListProps {
  isLoading: boolean;
  discounts: { [key: string]: Discount };
  cartItems: { [key: string]: Item };
  cartDiscountIds: {
    [key: string]: {
      targetItems: { [key: string]: Item };
      costForDiscount: number;
    };
  };
  submitDiscounts: (object) => void;
  handleBack: () => void;
}

const DiscountList = (props: DiscountListProps) => {
  const {
    isLoading,
    discounts,
    cartItems,
    cartDiscountIds,
    submitDiscounts,
    handleBack
  } = props;

  const [newSelectedDiscountIds, setNewSelectedDiscountIds] = useState(
    cartDiscountIds
  );

  const isSelectedDiscount = (key: string) =>
    newSelectedDiscountIds[key] ? true : false;

  const initialCostForDiscount = () => {
    const cartItemList = Object.values(cartItems);
    const cartItemCostList = cartItemList.map(item => item.price * item.count);
    return cartItemCostList.reduce((acc, cur) => acc + cur);
  };

  const toggleDiscount = (key: string, rate: number) => {
    const newItems = { ...newSelectedDiscountIds };
    newSelectedDiscountIds[key]
      ? delete newItems[key]
      : (newItems[key] = {
          targetItems: cartItems,
          costForDiscount: initialCostForDiscount() * rate
        });
    setNewSelectedDiscountIds(newItems);
  };

  const discountList = Object.keys(discounts).map((key: string) => {
    const { name, rate } = discounts[key];
    const isChecked = isSelectedDiscount(key);

    return (
      <Li key={key}>
        <CheckBox
          checked={isChecked}
          onChange={() => toggleDiscount(key, rate)}
        />
        <Info>
          <Name
            onClick={() => {
              toggleDiscount(key, rate);
            }}
          >
            {name}
          </Name>
          <Discount>{Math.floor(rate * 100)}% 할인</Discount>
        </Info>
      </Li>
    );
  });

  return (
    <>
      <Header title='할인 추가하기' handleBack={handleBack} />
      {isLoading ? (
        <Loading />
      ) : (
        <Section>
          <form
            onSubmit={e => {
              e.preventDefault();
              submitDiscounts(newSelectedDiscountIds);
            }}
          >
            <ul>{discountList}</ul>
            <Submit value='확인' />
          </form>
        </Section>
      )}
    </>
  );
};

const Section = styled.section`
  padding: 16px;
  margin-bottom: 40px;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-top: 1px solid lightgray;
`;

const Info = styled.dl`
  display: inline-block;
  width: 100%;
  margin-right: 10px;
  font-size: 18px;
`;

const Name = styled.dt`
  margin-bottom: 10px;
`;

const Discount = styled.dd`
  display: inline;
  margin-right: 10px;
  font-weight: 200;
  font-size: 16px;
  color: ${theme.COLOR_PINK_2};
`;

export default DiscountList;
