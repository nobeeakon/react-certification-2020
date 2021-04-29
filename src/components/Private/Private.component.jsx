import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useGlobalContext } from '../../providers/Global/Global.provider';

const Private = ({ children, ...rest }) => {
  const { globalState } = useGlobalContext();
  const { isAuthenticated } = globalState;

  return (
    <Route {...rest} render={() => (isAuthenticated ? children : <Redirect to="/" />)} />
  );
};

export default Private;
