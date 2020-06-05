import React from 'react';
import styled from 'styled-components';
import theme from './theme';

const Loading = () => {
  return <Wrap>Loading...</Wrap>;
};

const Wrap = styled.div`
  height: 400px;
  text-align: center;
  line-height: 200px;
  color: ${theme.COLOR_PURPLE_4};
  font-size: 20px;
`;

export default Loading;
