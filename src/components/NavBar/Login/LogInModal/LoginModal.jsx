import React from 'react';
import ReactDom from 'react-dom';

import { AiOutlineClose } from 'react-icons/ai';
import Login from '../LogInComponent';

import * as Styled from './LoginModal.styled';

// TODO pasar el estado para null si no está cargado
const LoginModal = ({ isModalOpen, closeModal }) => {
  if (!isModalOpen) return null;

  return ReactDom.createPortal(
    <>
      <Styled.Background />
      <Styled.ModalContainer>
        <Styled.CloseModalContainer>
          <Styled.CloseModal onClick={closeModal}>
            <AiOutlineClose />
          </Styled.CloseModal>
        </Styled.CloseModalContainer>
        <Login closeModal={closeModal} />
      </Styled.ModalContainer>
    </>,
    document.getElementById('portal')
  );
};

export default LoginModal;
