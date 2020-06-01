import React, { useState } from 'react';
import styled from 'styled-components';

interface InputNumberProps {
  currentCount: number;
  max: number;
  handleCount: (key: string, count: number) => void;
}

const InputNumber = props => {
  const { currentCount, max, handleCount } = props;
  const [count, setCount] = useState(currentCount);

  const handleMinus = value => {
    if (value > 1) {
      setCount(value - 1);
      handleCount(value - 1);
    }
  };

  const handlePlus = (value, max) => {
    if (value < max) {
      setCount(value + 1);
      handleCount(value + 1);
    } else {
      alert(`최대 ${max}까지 선택 가능합니다.`);
    }
  };

  return (
    <div>
      <Button type='button' onClick={() => handleMinus(count)}>
        -
      </Button>
      <Number readOnly type='number' value={count} min='0' />
      <Button type='button' onClick={() => handlePlus(count, max)}>
        +
      </Button>
    </div>
  );
};

const Button = styled.button`
  position: relative;
  width: 24px;
  height: 24px;
  background: #fff;
  border: 1px solid lightgray;
  vertical-align: top;
  text-align: center;
  font-size: 15px;
  color: gray;
  cursor: pointer;
`;

const Number = styled.input`
  box-sizing: border-box;
  width: 30px;
  height: 24px;
  border: 1px solid lightgray;
  border-width: 1px 0;
  vertical-align: top;
  text-align: center;
  font-size: 12px;
  color: gray;
`;

export default InputNumber;
