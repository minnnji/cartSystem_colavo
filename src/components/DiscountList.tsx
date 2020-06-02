import React, { ReactElement } from 'react';
import Header from './layout/Header';
import CheckBox from './layout/Checkbox.js';
import styled from 'styled-components';
import theme from './layout/theme';

interface DiscountListProps {
  isLoading: boolean;
  discountList: [
    string,
    {
      name: string;
      rate: number;
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
  handleModalOpen: (title: string, children: ReactElement) => void;
  handleBack: () => void;
}

const DiscountList = (props: DiscountListProps) => {
  const {
    isLoading,
    discountList,
    selectedDiscountList,
    handleSelectedDiscountList,
    handleModalOpen,
    handleBack
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
            <Target
              onClick={() =>
                handleModalOpen(
                  '할인 적용대상을 선택해주세요.',
                  <div>시술리스트 노출예정</div>
                )
              }
            >
              전체 시술 적용 >
            </Target>
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

const Target = styled(Discount)`
  text-decoration: underline;
`;

export default DiscountList;
