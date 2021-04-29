import React, { useState } from 'react';
import ReactDom from 'react-dom';

import { AiOutlineClose } from 'react-icons/ai';
import Login from '../LogInComponent';
import SignIn from '../SignInComponent';

import * as Styled from './LoginModal.styled';

const LoginModal = ({ closeModal }) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [buttonMessage, setButtonMessage] = useState('');

  const ModalContent = isNewUser ? SignIn : Login;

  const toggleContentChange = (e) => {
    e.preventDefault();
    setIsNewUser((prev) => !prev);
  };

  return ReactDom.createPortal(
    <>
      <Styled.Background />
      <Styled.ModalContainer>
        <Styled.CloseModalContainer>
          <Styled.CloseModal onClick={closeModal}>
            <AiOutlineClose />
          </Styled.CloseModal>
        </Styled.CloseModalContainer>

        <ModalContent closeModal={closeModal} setButtonMessage={setButtonMessage} />

        <Styled.ChangeContentTypeButtonContainer>
          <Styled.ChangeContentTypeButton onClick={toggleContentChange}>
            {buttonMessage}
          </Styled.ChangeContentTypeButton>
        </Styled.ChangeContentTypeButtonContainer>
      </Styled.ModalContainer>
    </>,
    document.getElementById('portal')
  );
};

export default LoginModal;
