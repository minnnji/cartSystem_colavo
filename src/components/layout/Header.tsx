import React from 'react';
import styled from 'styled-components';
import theme from './theme';

interface HeaderProps {
  title: string;
  handleBack: () => void;
}

const Header = ({ title, handleBack }: HeaderProps) => {
  return (
    <HeaderWrap>
      <BackButton onClick={handleBack}>❮</BackButton>
      <Title>{title}</Title>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.header`
  margin-bottom: 16px;
  line-height: 22px;
  text-align: center;
`;

const BackButton = styled.button`
  float: left;
  padding: 4px;
  font-size: 18px;
  border: none;
  background-color: ${theme.COLOR_BG};
`;

const Title = styled.h2`
  font-weight: 600;
  text-align: center;
`;

export default Header;
