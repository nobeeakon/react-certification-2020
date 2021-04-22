import React, { useState } from 'react';

import LoginModal from '../Login/LogInModal/LoginModal';

import * as Styled from '../NavBar.styled';

const SignIn = () => {
  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLogInModalOpen(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setIsLogInModalOpen(false);
  };
  return (
    <>
      <Styled.SignIn onClick={handleSignIn} data-testid="sign-in-button">
        Log In
      </Styled.SignIn>
      <LoginModal isModalOpen={isLogInModalOpen} closeModal={closeModal} />
    </>
  );
};

export default SignIn;
