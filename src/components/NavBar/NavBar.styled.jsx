import styled from 'styled-components';

import StyledButton from '../StyledComponents/StyledButton';

import * as s from '../../utils/deviceBreaks';

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.secondary};

  display: flex;
  align-items: center;

  top: 0;
  left: 0;
  right: 0;
  height: 50px;
`;

const StyledNav = styled.nav`
  left: 0;

  flex: 1;
`;

const HomeButton = styled(StyledButton)`
  color: ${(props) => props.theme.warning1};
  width: 40px;
`;

const StyledUl = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;

  padding: 0;

  & li {
    display: inline;
    padding-left: 10px;
  }
`;

const LeftSideLi = styled.li`
  margin-left: auto;
`;

const ToggleDark = styled(StyledButton)`
  width: 40px;

  height: 32px;
`;

const SignIn = styled(StyledButton)`
  background-color: transparent;

  padding: 5px;
  font-size: 8px;
  border: 1px solid ${(props) => props.theme.contrast1};
  border-radius: 5px;

  &:hover {
    transform: scale(1.02);
  }

  @media only screen and (${s.medium}) {
    padding: 5px;
    font-size: 12px;
  }
`;

const StyledForm = styled.form`
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.contrast1};
  height: 32px;
  overflow: hidden;

  &:hover {
    border-color: ${(props) => props.theme.warning1};
  }
`;

const Input = styled.input.attrs(() => ({
  type: 'text',
}))`
  padding: 2px;
  color: ${(props) => props.theme.contrast2};
  border: none;
  background: transparent;
  width: 100px;

  &:focus {
  }

  @media only screen and (${s.small}) {
    padding: 5px;
    width: 200px;
  }

  @media only screen and (${s.large}) {
    width: 300px;
  }
`;

const InputButton = styled(StyledButton)`
  height: 100%;

  background-color: ${(props) => props.theme.primary};
`;

export {
  StyledHeader,
  SignIn,
  StyledNav,
  HomeButton,
  StyledUl,
  LeftSideLi,
  ToggleDark,
  Input,
  InputButton,
  StyledForm,
};
