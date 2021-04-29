import React, { useState, useEffect } from 'react';

import { auth } from '../../../../utils/authentication/firebase';

import * as Styled from './SignIn.styled';

const SignIn = ({ setButtonMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmatoryPassword, setConfirmatoryPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false);
  const [errorOnSubmit, setErrorOnSubmit] = useState(false);

  useEffect(() => {
    setButtonMessage('Already have an account');
    if (registeredSuccessfully) setButtonMessage('Go to Log In');
  }, [setButtonMessage, registeredSuccessfully]);

  if (registeredSuccessfully) {
    return (
      <Styled.Success>Succesfully registered. Please go to Log In section</Styled.Success>
    );
  }

  const handleUserEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const tmpEmail = e.target.value.trim();
    setEmail(tmpEmail);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const tmpPassword = e.target.value;
    setPassword(tmpPassword);
  };

  const handleConfirmatoryPassword = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const tmpPassword = e.target.value;
    setConfirmatoryPassword(tmpPassword);
  };

  const arePassWordsEqual = password.length > 6 && password === confirmatoryPassword;
  const isEmailAndPasswordFilled = email.length > 0 && arePassWordsEqual;

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    let isMounted = true;

    if (!arePassWordsEqual) {
      setPassword('');
      setConfirmatoryPassword('');
      return;
    }

    if (!isEmailAndPasswordFilled) {
      setErrorOnSubmit(true);
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      if (isMounted) setRegisteredSuccessfully(true);
    } catch (error) {
      console.log(error);
      if (isMounted) {
        setErrorMessage(error.message);
        setEmail('');
        setPassword('');
        setConfirmatoryPassword('');
        setErrorOnSubmit(true);
      }
    }

    return () => {
      isMounted = false;
    };
  };

  return (
    <div>
      <Styled.LoginContainer>
        <Styled.StyledForm onSubmit={handleSubmit}>
          {errorOnSubmit && (
            <Styled.AlertFlag>{errorMessage || 'Something went wrong'}</Styled.AlertFlag>
          )}

          <Styled.InputField>
            <Styled.Label htmlFor="user-name">
              Email<Styled.RequiredField>*</Styled.RequiredField>:
            </Styled.Label>
            <Styled.UserEmailInput
              id="user-name"
              onChange={handleUserEmail}
              value={email}
            />
          </Styled.InputField>

          <Styled.InputField>
            <Styled.Label htmlFor="user-password">
              Password<Styled.RequiredField>*</Styled.RequiredField>:
            </Styled.Label>
            <Styled.UserPasswordInput
              id="user-password"
              onChange={handlePassword}
              value={password}
            />
          </Styled.InputField>

          <Styled.InputField>
            <Styled.Label htmlFor="user-confirmatory-password">
              Password<Styled.RequiredField>*</Styled.RequiredField>:
            </Styled.Label>
            <Styled.UserPasswordInput
              id="user-confirmatory-password"
              onChange={handleConfirmatoryPassword}
              value={confirmatoryPassword}
            />
          </Styled.InputField>

          {password.length <= 6 && (
            <Styled.AlertFlag>Password must have at least 7 characters</Styled.AlertFlag>
          )}

          {!arePassWordsEqual &&
            password.length > 6 &&
            confirmatoryPassword.length > 6 && (
              <Styled.AlertFlag>Passwords are not equal</Styled.AlertFlag>
            )}

          <Styled.ButtonContainer>
            <Styled.InputButton disabled={!isEmailAndPasswordFilled}>
              Sign-in
            </Styled.InputButton>
          </Styled.ButtonContainer>
        </Styled.StyledForm>
      </Styled.LoginContainer>
    </div>
  );
};

export default SignIn;
