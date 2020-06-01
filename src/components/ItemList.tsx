import React from 'react';
import Header from './layout/Header';
import CheckBox from './layout/Checkbox.js';
import styled from 'styled-components';
import theme from './layout/theme';

interface DiscountListProps {
  isLoading: boolean;
  itemList: [
    string,
    {
      count: number;
      name: string;
      price: number;
    }
  ][];
  selectedItemList: object[];
  handleSelectedItemList: (
    item: [
      string,
      {
        count: number;
        name: string;
        price: number;
      }
    ]
  ) => void;
  handleBack: () => void;
}

const ItemList = (props: DiscountListProps) => {
  const {
    isLoading,
    itemList,
    selectedItemList,
    handleSelectedItemList,
    handleBack
  } = props;

  const isSelectedItem = (key: string) =>
    selectedItemList.some(selectedItem => selectedItem[0] === key);

  const items = itemList.map(item => {
    return (
      <Li key={item[0]}>
        <CheckBox
          checked={isSelectedItem(item[0])}
          onChange={() => handleSelectedItemList(item)}
        />
        <Info onclick={() => handleSelectedItemList(item)}>
          <Name>{item[1].name}</Name>
          <Price>{item[1].price.toLocaleString()}원</Price>
        </Info>
      </Li>
    );
  });

  return (
    <>
      <Header title='시술 추가하기' handleBack={handleBack} />
      <Section>{isLoading ? <div>Loading...</div> : <ul>{items}</ul>}</Section>
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

const Price = styled.dd`
  font-weight: 200;
  font-size: 16px;
  color: ${theme.COLOR_PINK_2};
`;

export default ItemList;
