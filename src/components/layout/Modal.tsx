import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface ModalProps {
  isDisplay: boolean;
  title: string;
  children: ReactElement;
  handleClose: () => void;
}

const Modal = ({ isDisplay, handleClose, title, children }: ModalProps) => {
  return (
    <Wrap isDisplay={isDisplay}>
      <ModalOverlay onClick={handleClose} />
      <ModalWrap>
        <TopWrap>
          <Title>{title}</Title>
          <Close onClick={handleClose}>X</Close>
        </TopWrap>
        {children}
      </ModalWrap>
    </Wrap>
  );
};

const Wrap = styled.section`
  display: ${props => (props.isDisplay ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #282929;
`;

const ModalOverlay = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalWrap = styled.div`
  position: absolute;
  padding: 10px;
  width: 90%;
  min-height: 300px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  background-color: white;
  border-radius: 2px;
`;

const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  min-height: 40px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
`;

const Close = styled.button`
  position: absolute;
  right: 0;
  all: unset;
  padding: 0 10px;
  font-size: 25px;
`;

export default Modal;
