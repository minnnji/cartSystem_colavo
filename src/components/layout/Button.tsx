import styled from 'styled-components';
import theme from './theme';

export const Button = styled.button`
  padding: 10px 14px;
  width: 100%;
  background-color: white;
  border-radius: 14px;
  border: 1px solid
    ${props =>
      props.purple
        ? `${theme.COLOR_PURPLE_4}`
        : props.pink
        ? `${theme.COLOR_PINK_2}`
        : `${theme.COLOR_GRAY_3}`};
  font-size: 14px;
  color: ${props =>
    props.purple
      ? `${theme.COLOR_PURPLE_4}`
      : props.pink
      ? `${theme.COLOR_PINK_2}`
      : `${theme.COLOR_GRAY_3}`};
`;

export const HalfButton = styled(Button)`
  width: 48%;
  margin: 0 2px;
`;
