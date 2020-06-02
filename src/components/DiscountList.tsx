import React, { ReactElement } from 'react';
import Header from './layout/Header';
import CheckBox from './layout/Checkbox.js';
import styled from 'styled-components';
import theme from './layout/theme';
import DiscountTarget from './DiscountTarget';

interface DiscountListProps {
  isLoading: boolean;
  discountList: [
    string,
    {
      name: string;
      rate: number;
    }
  ][];
  itemList: [
    string,
    {
      count: number;
      name: string;
      price: number;
    }
  ][];
  selectedDiscountList: object[];
  handleSelectedDiscountList: (
    item: [
      string,
      {
        name: string;
        rate: number;
      }
    ]
  ) => void;
  handleTargetItem: (
    discountKey: string,
    targetItem: [
      string,
      {
        count: number;
        name: string;
        price: number;
      }
    ][]
  ) => void;
  handleModalOpen: (title: string, children: ReactElement) => void;
  handleBack: () => void;
  handleModalClose: () => void;
}

const DiscountList = (props: DiscountListProps) => {
  const {
    isLoading,
    discountList,
    itemList,
    selectedDiscountList,
    handleSelectedDiscountList,
    handleTargetItem,
    handleModalOpen,
    handleBack,
    handleModalClose
  } = props;

  const isSelectedDiscount = (key: string) =>
    selectedDiscountList.some(selectedDiscount => selectedDiscount[0] === key);

  const discounts = discountList.map(item => {
    const isChecked = isSelectedDiscount(item[0]);
    return (
      <Li key={item[0]}>
        <CheckBox
          checked={isChecked}
          onChange={() => handleSelectedDiscountList(item)}
        />
        <Info>
          <Name>{item[1].name}</Name>
          <Discount>{Math.floor(item[1].rate * 100)}% 할인</Discount>
          {isChecked && (
            <DiscountTarget
              discount={item}
              discountList={discountList}
              itemList={itemList}
              handleTargetItem={handleTargetItem}
              handleModalOpen={handleModalOpen}
              handleModalClose={handleModalClose}
            />
          )}
        </Info>
      </Li>
    );
  });

  return (
    <>
      <Header title='할인 추가하기' handleBack={handleBack} />
      <Section>
        {isLoading ? <div>Loading...</div> : <ul>{discounts}</ul>}
      </Section>
    </>
  );
};

const Section = styled.section`
  padding: 16px;
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

const Discount = styled.dd`
  display: inline;
  margin-right: 10px;
  font-weight: 200;
  font-size: 16px;
  color: ${theme.COLOR_PINK_2};
`;

export default DiscountList;
