import styled from 'styled-components';
import theme from './theme';

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

export default SubmitButton;
