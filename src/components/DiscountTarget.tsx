import React, { ReactElement, useState } from 'react';
import CheckBox from './layout/Checkbox.js';
import { Button } from './layout/Button';
import styled from 'styled-components';
import theme from './layout/theme';

interface Item {
  count: number;
  name: string;
  price: number;
}

interface DiscountTargetProps {
  children: JSX.Element[];
  discountKey: string;
  discountName: string;
  cartItems: { [key: string]: Item };
  targetItems: { [key: string]: Item };
  submitTargetItems: (
    discountKey: string,
    targetItem: { [key: string]: Item }
  ) => void;
  handleModalOpen: (title: string, children: ReactElement) => void;
  handleModalClose: () => void;
}

const DiscountTarget = (props: DiscountTargetProps) => {
  const {
    children,
    discountKey,
    discountName,
    cartItems,
    targetItems,
    submitTargetItems,
    handleModalOpen,
    handleModalClose
  } = props;

  const [targets, setTargets] = useState(targetItems);

  const makeTargetList = (key: string, item: Item) => {
    setTargets(targets => {
      const newTargets = { ...targets };
      newTargets.hasOwnProperty(key)
        ? delete newTargets[key]
        : (newTargets[key] = item);
      return newTargets;
    });
  };

  const isSelectedItem = (key: string) => targets.hasOwnProperty(key);

  const itemList = Object.keys(cartItems).map((key: string) => {
    const { count, name, price } = cartItems[key];
    const isChecked = isSelectedItem(key);

    return (
      <Li key={name}>
        <CheckBox
          defaultChecked={isChecked}
          onChange={() => {
            makeTargetList(key, cartItems[key]);
          }}
        />
        <Info>
          <Name>{name}</Name>
          <Price>
            {price.toLocaleString()}원 x {count}
          </Price>
        </Info>
      </Li>
    );
  });

  return (
    <>
      <Target
        onClick={() =>
          handleModalOpen(
            `[${discountName}] 적용대상을 선택해주세요.`,
            <>
              {itemList}
              <Button
                purple
                type='button'
                onClick={() => {
                  submitTargetItems(discountKey, targets);
                  handleModalClose();
                }}
              >
                확인
              </Button>
            </>
          )
        }
      >
        {children}
      </Target>
    </>
  );
};

const Target = styled.dd`
  display: inline;
  margin-right: 10px;
  font-weight: 200;
  font-size: 16px;
  color: ${theme.COLOR_PURPLE_4};
  text-decoration: underline;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-top: 1px solid lightgray;
`;

const Info = styled.dl`
  display: inline-block;
  margin-right: 10px;
  font-size: 18px;
`;

const Name = styled.dt`
  margin-bottom: 10px;
`;

const Price = styled.dd`
  font-weight: 200;
  font-size: 16px;
  color: ${theme.COLOR_GRREN_1};
`;

export default DiscountTarget;
