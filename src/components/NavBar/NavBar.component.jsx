import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { CgSun } from 'react-icons/cg';
import { HiMoon, HiOutlineHome } from 'react-icons/hi';
import { GoSearch } from 'react-icons/go';

import { ACTIONS as GLOBAL_ACTIONS } from '../../providers/Global/useGlobalReducer';
import { useGlobalContext } from '../../providers/Global/Global.provider';

import { useAuth } from '../../providers/Auth/Auth.provider';

import { ROUTES } from '../../utils/functions/routes';

import {
  StyledHeader,
  StyledNav,
  SignIn,
  StyledUl,
  HomeButton,
  LeftSideLi,
  ToggleDark,
  StyledForm,
  Input,
  InputButton,
} from './NavBar.styled';

import AvatarImg from '../Avatar';

const NavBar = () => {
  const history = useHistory();

  const { globalState, dispatchGlobal } = useGlobalContext();
  const [searchString, setSearchString] = useState(globalState.searchTerm);

  const { isAuthenticated } = useAuth();

  const { isDarkMode } = globalState;

  const themeIconSize = '80%';
  const ThemeIcon = isDarkMode ? (
    <CgSun size={themeIconSize} data-testid="icon-sun-testid" />
  ) : (
    <HiMoon size={themeIconSize} data-testid="icon-moon-testid" />
  );

  const handleInput = (e) => {
    setSearchString(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchString((prev) => prev.trim());
    dispatchGlobal({ type: GLOBAL_ACTIONS.UPDATE_SEARCH, payload: searchString });

    history.push(`/${ROUTES.RESULTS}`);
  };

  const goHome = (event) => {
    event.preventDefault();
    history.push('/');
  };

  const toggleTheme = (e) => {
    e.preventDefault();
    dispatchGlobal({ type: GLOBAL_ACTIONS.TOOGLE_DARK });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    history.push('/login');
  };

  return (
    <StyledHeader>
      <HomeButton onClick={goHome} data-testid="home-button">
        <HiOutlineHome size="90%" />
      </HomeButton>
      <StyledNav>
        <StyledUl>
          <li>
            <StyledForm>
              <Input placeholder="Search" onChange={handleInput} value={searchString} />
              <InputButton onClick={handleSearch} data-testid="input-button-testid">
                <GoSearch />
              </InputButton>
            </StyledForm>
          </li>

          <LeftSideLi>
            {isAuthenticated ? (
              <AvatarImg />
            ) : (
              <SignIn onClick={handleSignIn} data-testid="sign-in-button">
                Sign In{' '}
              </SignIn>
            )}
          </LeftSideLi>
          <li>
            <ToggleDark data-testid="toggleTheme-button" onClick={toggleTheme}>
              {ThemeIcon}
            </ToggleDark>
          </li>
        </StyledUl>
      </StyledNav>
    </StyledHeader>
  );
};

export default NavBar;
