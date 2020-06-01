import React from 'react';
import styled from 'styled-components';

interface NoListProps {
  text: string;
}

const NoList = (props: NoListProps) => {
  return <NoListWrap>{props.text}</NoListWrap>;
};

const NoListWrap = styled.div`
  text-align: center;
  padding: 50px 0;
  border-bottom: 1px solid lightgray;
`;

export default NoList;
