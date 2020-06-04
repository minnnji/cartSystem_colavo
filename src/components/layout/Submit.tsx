import React from 'react';
import styled from 'styled-components';
import theme from './theme';

const Submit = ({ value }) => {
  return (
    <SubmitWrap>
      <SubmitButton value={value} />
    </SubmitWrap>
  );
};

const SubmitWrap = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 140;
  height: 50px;
`;

const SubmitButton = styled.input.attrs({
  type: 'submit'
})`
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: ${theme.COLOR_PURPLE_4};
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

export default Submit;
