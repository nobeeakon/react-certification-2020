import styled from 'styled-components';

import StyledButton from '../../../StyledComponents/StyledButton';

import * as breakpoints from '../../../../utils/deviceBreakpoints';

export const Label = styled.label`
  font-size: small;

  @media only screen and (${breakpoints.medium}) {
    font-size: normal;
  }
`;

export const LoginContainer = styled.div``;

export const StyledForm = styled.form``;

export const InputField = styled.div`
  display: flex;
  justify-content: space-around;
  flex-grow: 1;

  margin-top: 10px;
`;

export const AlertFlag = styled.div`
  color: ${(props) => props.theme.warning1};

  font-size: small;
`;

export const RequiredField = styled.span`
  color: ${(props) => props.theme.warning1};
`;

export const UserEmailInput = styled.input.attrs(() => ({
  type: 'email',
  autocomplete: 'off',
}))(
  ({ theme }) => `
    padding: 2px;
    color: ${theme.general.dark};
    border: none;
    background: transparent;
    width: 90px;
  

    border-bottom:1px solid ${theme.general.dark};

    &:focus {
    }
  

  @media only screen and (${breakpoints.medium}) {
    width: 170px;
  }
    
  `
);

export const UserPasswordInput = styled.input.attrs(() => ({
  type: 'password',
  autocomplete: 'off',
}))(
  ({ theme }) => `
      padding: 2px;
      color: ${theme.general.dark};
      border: none;
      background: transparent;
      width: 90px;
    
      border-bottom:1px solid ${theme.general.dark};


  @media only screen and (${breakpoints.medium}) {
    width: 170px;
  }
    `
);

export const InputButton = styled(StyledButton)`
  background-color: transparent;
  color: ${(props) => props.theme.general.dark};
  border: 1px solid ${(props) => props.theme.general.DarkBlue};
  border-radius: 5px;

  &:hover {
    color: ${(props) => props.theme.general.dark};
    border: 1px solid ${(props) => props.theme.general.warning1};
  }

  ${(props) =>
    props.disabled &&
    `
    border:none;
    cursor:not-allowed;
    background: ${props.theme.general.lightGray};
    color: ${props.theme.general.light};

    &:hover {
      color: ${props.theme.general.light};
      border:none;
    }

  `}
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 10px;
`;
