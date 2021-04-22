import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { GoSearch } from 'react-icons/go';

import * as Styled from './NavBar.styled';

import { ACTIONS as GLOBAL_ACTIONS } from '../../providers/Global/useGlobalReducer';
import { useGlobalContext } from '../../providers/Global/Global.provider';

import { ROUTES } from '../../utils/functions/routes';

const NavBarForm = () => {
  const { globalState, dispatchGlobal } = useGlobalContext();
  const [searchString, setSearchString] = useState(globalState.searchTerm);

  const history = useHistory();

  const handleInput = (e) => {
    setSearchString(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchString((prev) => prev.trim());
    dispatchGlobal({ type: GLOBAL_ACTIONS.UPDATE_SEARCH, payload: searchString });

    history.push(`/${ROUTES.RESULTS}`);
  };

  return (
    <Styled.StyledForm>
      <Styled.Input placeholder="Search" onChange={handleInput} value={searchString} />
      <Styled.InputButton onClick={handleSearch} data-testid="input-button-testid">
        <GoSearch />
      </Styled.InputButton>
    </Styled.StyledForm>
  );
};

export default NavBarForm;
