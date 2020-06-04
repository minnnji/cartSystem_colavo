import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './layout/Header';
import CheckBox from './layout/Checkbox.js';
import InputNumber from './layout/InputNumber';
import Submit from './layout/Submit';
import theme from './layout/theme';

interface Item {
  count: number;
  name: string;
  price: number;
}

interface ItemListProps {
  isLoading: boolean;
  items: { [key: string]: Item };
  selectedItemIds: { [key: string]: { count: number } };
  handleBack: () => void;
  submitItems: (object) => void;
}

const ItemList = (props: ItemListProps) => {
  const { isLoading, items, selectedItemIds, handleBack, submitItems } = props;

  const [newSelectedItemIds, setNewSelectedItemIds] = useState<{
    [key: string]: { count: number };
  }>(selectedItemIds);

  const isSelectedItem = (key: string) =>
    newSelectedItemIds[key] ? true : false;

  const toggleItem = (key: string, count: number) => {
    const newItems = { ...newSelectedItemIds };
    newSelectedItemIds[key]
      ? delete newItems[key]
      : (newItems[key] = { count });
    setNewSelectedItemIds(newItems);
  };

  const handleCount = (key: string, count: number) => {
    const newItems = { ...newSelectedItemIds };
    newItems[key] = { count };
    setNewSelectedItemIds(newItems);
  };

  const itemList = Object.keys(items).map((key: string) => {
    const { count, name, price } = items[key];

    return (
      <Li key={key}>
        <CheckBox
          checked={isSelectedItem(key)}
          onChange={() => toggleItem(key, count)}
        />
        <InfoWrapper>
          <Info onClick={() => toggleItem(key, count)}>
            <Name>{name}</Name>
            <Price>{price.toLocaleString()}원</Price>
          </Info>
          {isSelectedItem(key) && (
            <InputNumber
              currentCount={
                isSelectedItem(key) ? newSelectedItemIds[key].count : 1
              }
              max={10}
              handleCount={newCount => handleCount(key, newCount)}
            />
          )}
        </InfoWrapper>
      </Li>
    );
  });

  return (
    <>
      <Header title='시술 추가하기' handleBack={handleBack} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Section>
          <form
            onSubmit={e => {
              e.preventDefault();
              submitItems(newSelectedItemIds);
            }}
          >
            <ul>{itemList}</ul>
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
  margin-right: 10px;
  width: 70%;
  font-size: 18px;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Name = styled.dt`
  margin-bottom: 10px;
`;

const Price = styled.dd`
  font-weight: 200;
  font-size: 16px;
  color: ${theme.COLOR_GRREN_1};
`;

export default ItemList;
