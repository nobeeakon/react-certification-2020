import styled from 'styled-components';

import StyledButton from '../StyledComponents/StyledButton';

import * as breakpoints from '../../utils/deviceBreakpoints';

export const StyledHeader = styled.header(
  ({ theme }) => `
  background-color: ${theme.secondary};

  display: flex;
  align-items: center;

  top: 0;
  left: 0;
  right: 0;
  height: 50px;
`
);

export const StyledNav = styled.nav`
  left: 0;

  flex: 1;
`;

export const HomeButton = styled(StyledButton)(
  ({ theme }) => `
  color: ${theme.warning1};
  width: 40px;
`
);

export const StyledUl = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;

  padding: 0;

  & li {
    display: inline;
    padding-left: 10px;
  }
`;

export const LeftSideLi = styled.li`
  margin-left: auto;
`;

export const ToggleDark = styled(StyledButton)`
  width: 40px;

  height: 32px;
`;

export const SignIn = styled(StyledButton)(
  ({ theme }) => `
  background-color: transparent;

  padding: 5px;
  font-size: 8px;
  border: 1px solid ${theme.contrast1};
  border-radius: 5px;

  &:hover {
    transform: scale(1.02);
  }

  @media only screen and (${breakpoints.medium}) {
    padding: 5px;
    font-size: 12px;
  }
`
);

export const StyledForm = styled.form(
  ({ theme }) => `
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid ${theme.contrast1};
  height: 32px;
  overflow: hidden;

  &:hover {
    border-color: ${theme.warning1};
  }
`
);

export const Input = styled.input.attrs(() => ({
  type: 'text',
}))(
  ({ theme }) => `
  padding: 2px;
  color: ${theme.contrast2};
  border: none;
  background: transparent;
  width: 100px;

  &:focus {
  }

  @media only screen and (${breakpoints.small}) {
    padding: 5px;
    width: 200px;
  }

  @media only screen and (${breakpoints.large}) {
    width: 300px;
  }
`
);

export const InputButton = styled(StyledButton)(
  ({ theme }) => `
  height: 100%;

  background-color: ${theme.primary};
`
);

export const StyledAvatarImg = styled.img`
  border-radius: 50%;
  height: 32px;
  width: 32px;

  &:hover {
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;
