import React, { useState, useEffect } from 'react';

import { useGlobalContext } from '../../../../providers/Global/Global.provider';
import { ACTIONS as GLOBAL_ACTIONS } from '../../../../providers/Global/useGlobalReducer';

import { auth } from '../../../../utils/authentication/firebase';

import * as Styled from './Login.styled';

const Login = ({ closeModal, setButtonMessage }) => {
  const { globalState, dispatchGlobal } = useGlobalContext();
  const { isAuthenticated } = globalState;
  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [errorOnSubmit, setErrorOnSubmit] = useState(false);

  useEffect(() => {
    setButtonMessage('Register new account');
  }, [setButtonMessage]);

  const handleUserEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const tmpEmail = e.target.value.trim();
    setEmail(tmpEmail);
  };

  if (isAuthenticated) closeModal();

  const handleUserPassword = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const tmpPassword = e.target.value;
    setUserPassword(tmpPassword);
  };

  const isEmailAndPasswordFilled = email.length > 0 && userPassword.length > 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isEmailAndPasswordFilled) {
      setErrorOnSubmit(true);
    } else {
      try {
        const userData = await auth.signInWithEmailAndPassword(email, userPassword);
        userData.avatarUrl =
          'https://media.glassdoor.com/sqll/868055/wizeline-squarelogo-1473976610815.png';
        dispatchGlobal({ type: GLOBAL_ACTIONS.LOGIN, payload: userData });
      } catch (error) {
        setErrorMessage(error.message);
        setEmail('');
        setUserPassword('');
        setErrorOnSubmit(true);
      }
    }
  };

  return (
    <div>
      <Styled.LoginContainer>
        <Styled.StyledForm onSubmit={handleSubmit}>
          {errorOnSubmit && (
            <Styled.AlertFlag>{errorMessage || 'Something went wrong '}</Styled.AlertFlag>
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
              onChange={handleUserPassword}
              value={userPassword}
            />
          </Styled.InputField>

          <Styled.ButtonContainer>
            <Styled.InputButton disabled={!isEmailAndPasswordFilled}>
              Log-in
            </Styled.InputButton>
          </Styled.ButtonContainer>
        </Styled.StyledForm>
      </Styled.LoginContainer>
    </div>
  );
};

export default Login;
