import React, { useState } from 'react';

import loginApi from '../../../../utils/mocks/mockedLogin';

import { useGlobalContext } from '../../../../providers/Global/Global.provider';
import { ACTIONS as GLOBAL_ACTIONS } from '../../../../providers/Global/useGlobalReducer';

import * as Styled from './Login.styled';

const Login = ({ closeModal }) => {
  const { globalState, dispatchGlobal } = useGlobalContext();
  const { isAuthenticated } = globalState;
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isUserNameFilled, setIsUserNameFilled] = useState(false);
  const [isPassWordFilled, setIsPasswordFilled] = useState(false);

  const [errorOnSubmit, setErrorOnSubmit] = useState(false);
  const [isInvalidUSer, setIsInvalidUser] = useState(false);

  const handleUserName = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const tmpUserName = e.target.value.trim();
    setUserName(tmpUserName);

    setIsUserNameFilled(Boolean(tmpUserName.length));
  };

  if (isAuthenticated) closeModal();

  const handleUserPassword = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const tmpPassword = e.target.value;
    setUserPassword(tmpPassword);

    setIsPasswordFilled(Boolean(tmpPassword.length));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isUserNameFilled || !isPassWordFilled) {
      setErrorOnSubmit(true);
    } else {
      try {
        const userData = await loginApi(userName, userPassword);
        dispatchGlobal({ type: GLOBAL_ACTIONS.LOGIN, payload: userData });
      } catch (error) {
        setIsInvalidUser(true);
        setUserName('');
        setUserPassword('');
        setErrorOnSubmit(true);
      }
    }
  };

  return (
    <div>
      <Styled.LoginContainer>
        <Styled.StyledForm onSubmit={handleSubmit}>
          {errorOnSubmit && isInvalidUSer && (
            <Styled.AlertFlag>Invalid Name or Password</Styled.AlertFlag>
          )}

          <Styled.InputField>
            <Styled.Label htmlFor="user-name">
              Name<Styled.RequiredField>*</Styled.RequiredField>:
            </Styled.Label>
            <Styled.UserNameInput
              id="user-name"
              onChange={handleUserName}
              value={userName}
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
            <Styled.InputButton disabled={!isPassWordFilled || !isUserNameFilled}>
              Log-in
            </Styled.InputButton>
          </Styled.ButtonContainer>
        </Styled.StyledForm>
      </Styled.LoginContainer>
    </div>
  );
};

export default Login;
