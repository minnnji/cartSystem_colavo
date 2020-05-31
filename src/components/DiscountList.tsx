import React from 'react';
import Header from './layout/Header';

interface DiscountListProps {
  discount: object;
  handleBack: () => void;
}

const DiscountList = (props: DiscountListProps) => {
  const { discount, handleBack } = props;
  console.log(discount);

  return (
    <>
      <Header title='할인 추가하기' handleBack={handleBack} />
    </>
  );
};

export default DiscountList;
