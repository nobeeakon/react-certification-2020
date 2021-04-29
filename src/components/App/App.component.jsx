import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import GlobalProvider from '../../providers/Global';
import ThemesProvider from '../../providers/Theme';

import NavBar from '../NavBar';

import HomePage from '../../pages/Home';
import WatchPage from '../../pages/Watch';
import Results from '../../pages/Results';
import NotFoundPage from '../../pages/NotFound';

import PrivateRoutes from './PrivateRoutes/PrivateRoutes';

import Private from '../Private';
import Layout from '../Layout';

import { ROUTES } from '../../utils/functions/routes';

function App() {
  return (
    <Router>
      <GlobalProvider>
        <ThemesProvider>
          <NavBar />
          <Layout>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>

              <Route exact path={`/${ROUTES.RESULTS}`}>
                <Results />
              </Route>
              <Route exact path={`/${ROUTES.WATCH}`}>
                <WatchPage />
              </Route>

              <Private path={`/${ROUTES.PRIVATE}`}>
                <PrivateRoutes />
              </Private>

              <Route path="*">
                <NotFoundPage />
              </Route>
            </Switch>
          </Layout>
        </ThemesProvider>
      </GlobalProvider>
    </Router>
  );
}

export default App;
