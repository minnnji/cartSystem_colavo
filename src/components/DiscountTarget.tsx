import React, { ReactElement } from 'react';
import CheckBox from './layout/Checkbox.js';
import { Button } from './layout/Button';
import styled from 'styled-components';
import theme from './layout/theme';

interface Discount {
  name: string;
  rate: number;
}

interface Item {
  count: number;
  name: string;
  price: number;
}

interface DiscountTargetProps {
  discount: [string, Discount];
  discountList: [string, Discount][];
  itemList: [string, Item][];
  handleTargetItem: (discountKey: string, targetItem: [string, Item][]) => void;
  handleModalOpen: (title: string, children: ReactElement) => void;
  handleModalClose: () => void;
}

const DiscountTarget = (props: DiscountTargetProps) => {
  const {
    discount,
    itemList,
    handleTargetItem,
    handleModalOpen,
    handleModalClose
  } = props;

  const targetList: [string, Item][] = [];

  const makeTargetList = (item: [string, Item]) => {
    const index = targetList.map(target => target[0]).indexOf(item[0]);
    index === -1 ? targetList.push(item) : targetList.splice(index, 1);
  };

  const items = itemList.map(item => {
    return (
      <Li key={item[0]}>
        <CheckBox
          onChange={() => {
            makeTargetList(item);
          }}
        />
        <Info>
          <Name>{item[1].name}</Name>
          <Price>
            {item[1].price.toLocaleString()}원 x {item[1].count}
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
            `[${discount[1].name}] 적용대상을 선택해주세요.`,
            <>
              {items}
              <Button
                purple
                type='button'
                onClick={() => {
                  handleTargetItem(discount[0], targetList);
                  handleModalClose();
                }}
              >
                확인
              </Button>
            </>
          )
        }
      >
        할인 적용 대상을 선택해주세요 >
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
