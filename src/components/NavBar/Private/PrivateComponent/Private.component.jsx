import React from 'react';

import { MdVideoLibrary } from 'react-icons/md';

import { privateLibraryUrl } from '../../../../utils/functions/routes';

import { ACTIONS as GLOBAL_ACTIONS } from '../../../../providers/Global/useGlobalReducer';
import { useGlobalContext } from '../../../../providers/Global/Global.provider';

import * as Styled from './Private.component.styled';

const Private = () => {
  const { dispatchGlobal } = useGlobalContext();

  const handleLogOut = (event) => {
    event.preventDefault();
    dispatchGlobal({ type: GLOBAL_ACTIONS.LOGOUT });
  };

  return (
    <Styled.MenuContainer>
      <Styled.StyledLink to={privateLibraryUrl}>
        <MdVideoLibrary /> Library
      </Styled.StyledLink>
      <Styled.StyledButton onClick={handleLogOut}> Log Out</Styled.StyledButton>
    </Styled.MenuContainer>
  );
};

export default Private;
