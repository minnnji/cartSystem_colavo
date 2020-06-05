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
      <Title>{title}</Title>
      <BackButton onClick={handleBack}>❮</BackButton>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.header`
  position: relative;
  height: 50px;
`;

const BackButton = styled.button`
  position: absolute;
  width: 50px;
  height: 50px;
  left: 0;
  top: 8px;
  padding: 4px;
  background-color: ${theme.COLOR_BG};
  border: none;
  font-size: 24px;
  color: ${theme.COLOR_GRAY_3};
`;

const Title = styled.h2`
  position: absolute;
  top: 50%;
  width: 100%;
  font-weight: 600;
  text-align: center;
`;

export default Header;
