import React from 'react';
import { useHistory } from 'react-router-dom';

import { CgSun } from 'react-icons/cg';
import { HiMoon, HiOutlineHome } from 'react-icons/hi';

import { ACTIONS as GLOBAL_ACTIONS } from '../../providers/Global/useGlobalReducer';
import { useGlobalContext } from '../../providers/Global/Global.provider';

import SignInOrAvatar from './NavBarSignInOrAvatar.component';
import NavBarForm from './NavBarForm';

import * as Styled from './NavBar.styled';

const NavBar = () => {
  const history = useHistory();

  const { globalState, dispatchGlobal } = useGlobalContext();

  const { isDarkMode } = globalState;

  const themeIconSize = '80%';
  const ThemeIcon = isDarkMode ? (
    <CgSun size={themeIconSize} data-testid="icon-sun-testid" />
  ) : (
    <HiMoon size={themeIconSize} data-testid="icon-moon-testid" />
  );

  const goHome = (event) => {
    event.preventDefault();
    history.push('/');
  };

  const toggleTheme = (e) => {
    e.preventDefault();
    dispatchGlobal({ type: GLOBAL_ACTIONS.TOOGLE_DARK });
  };

  return (
    <Styled.StyledHeader>
      <Styled.HomeButton onClick={goHome} data-testid="home-button">
        <HiOutlineHome size="90%" />
      </Styled.HomeButton>
      <Styled.StyledNav>
        <Styled.StyledUl>
          <li>
            <NavBarForm />
          </li>

          <Styled.LeftSideLi>
            <SignInOrAvatar />
          </Styled.LeftSideLi>

          <li>
            <Styled.ToggleDark data-testid="toggleTheme-button" onClick={toggleTheme}>
              {ThemeIcon}
            </Styled.ToggleDark>
          </li>
        </Styled.StyledUl>
      </Styled.StyledNav>
    </Styled.StyledHeader>
  );
};

export default NavBar;
