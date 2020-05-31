import React from 'react';
import Header from './layout/Header';

interface DiscountListProps {
  item: object;
  handleBack: () => void;
}

const ItemList = (props: DiscountListProps) => {
  const { item, handleBack } = props;
  console.log(item);

  return (
    <>
      <Header title='시술 추가하기' handleBack={handleBack} />
    </>
  );
};

export default ItemList;
