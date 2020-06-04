import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './layout/Header';
import CheckBox from './layout/Checkbox.js';
import InputNumber from './layout/InputNumber';
import SubmitButton from './layout/SubmitButton';
import theme from './layout/theme';

interface Item {
  count: number;
  name: string;
  price: number;
}

interface DiscountListProps {
  isLoading: boolean;
  items: { [key: string]: Item };
  selectedItemIds: { [key: string]: { count: number } };
  handleBack: () => void;
  submitItems: (object) => void;
}

const ItemList = (props: DiscountListProps) => {
  const { isLoading, items, selectedItemIds, handleBack, submitItems } = props;

  const [newSelectedItems, setNewSelectedItems] = useState<{
    [key: string]: { count: number };
  }>(selectedItemIds);

  const isSelectedItem = (key: string) =>
    newSelectedItems[key] ? true : false;

  const toggleItem = (key: string, count: number) => {
    const newItems = { ...newSelectedItems };
    newSelectedItems[key] ? delete newItems[key] : (newItems[key] = { count });
    setNewSelectedItems(newItems);
  };

  const handleCount = (key: string, count: number) => {
    const newItems = { ...newSelectedItems };
    newItems[key] = { count };
    setNewSelectedItems(newItems);
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
                isSelectedItem(key) ? newSelectedItems[key].count : 1
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
              submitItems(newSelectedItems);
            }}
          >
            <ul>{itemList}</ul>{' '}
            <SubmitWrap>
              <SubmitButton value='확인' />
            </SubmitWrap>
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

const SubmitWrap = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 140;
  height: 50px;
`;

export default ItemList;
