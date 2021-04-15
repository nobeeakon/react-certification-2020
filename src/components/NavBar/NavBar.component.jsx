import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { CgSun } from 'react-icons/cg';
import { HiMoon, HiOutlineHome } from 'react-icons/hi';
import { GoSearch } from 'react-icons/go';

import { useDark } from '../../providers/DarkMode/DarkMode.provider';
import { useAuth } from '../../providers/Auth/Auth.provider';

import { queryResultsUrl } from '../../utils/functions/routes';

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
  const [searchString, setSearchString] = useState('');

  const { toggleDarkMode, isDarkMode } = useDark();
  const { isAuthenticated } = useAuth();

  const history = useHistory();

  const themeIconSize = '80%';
  const ThemeIcon = isDarkMode ? (
    <CgSun size={themeIconSize} />
  ) : (
    <HiMoon size={themeIconSize} />
  );

  const handleInput = (e) => {
    setSearchString(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const resultsRoute = queryResultsUrl(searchString);
    history.push(resultsRoute);
  };

  const goHome = (event) => {
    event.preventDefault();
    history.push('/');
  };

  const toggleTheme = (e) => {
    e.preventDefault();
    toggleDarkMode();
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    history.push('/login');
  };

  return (
    <StyledHeader>
      <HomeButton onClick={goHome}>
        <HiOutlineHome size="90%" />
      </HomeButton>
      <StyledNav>
        <StyledUl>
          <li>
            <StyledForm>
              <Input placeholder="Search" onChange={handleInput} value={searchString} />
              <InputButton onClick={handleSearch}>
                <GoSearch />
              </InputButton>
            </StyledForm>
          </li>

          <LeftSideLi>
            {isAuthenticated ? (
              <AvatarImg />
            ) : (
              <SignIn onClick={handleSignIn}>Sign In </SignIn>
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
