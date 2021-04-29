import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { withRouter } from 'react-router';

import WatchPrivatePage from '../../../pages/WatchPrivate';
import LibraryPrivatePage from '../../../pages/Library';
import NotFoundPage from '../../../pages/NotFound';

import { PRIVATE_ROUTES as PRIV_ROUTES } from '../../../utils/functions/routes';

const PrivateRoutes = ({ match }) => {
  const { path } = match;
  return (
    <Switch>
      <Route path={`${path}/${PRIV_ROUTES.LIBRARY}`} exact>
        <LibraryPrivatePage />
      </Route>
      <Route path={`${path}/${PRIV_ROUTES.PRIVATE_WATCH}`} exact>
        <WatchPrivatePage />
      </Route>

      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default withRouter(PrivateRoutes);
