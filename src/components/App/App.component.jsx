import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AuthProvider from '../../providers/Auth';
import DarkProvider from '../../providers/DarkMode';
import ThemesProvider from '../../providers/Theme';

import NavBar from '../NavBar';

import HomePage from '../../pages/Home';
import WatchPage from '../../pages/Watch';
import Results from '../../pages/Results';
import LoginPage from '../../pages/Login';
import NotFound from '../../pages/NotFound';
import SecretPage from '../../pages/Secret';
import Private from '../Private';
import Layout from '../Layout';

import { ROUTES } from '../../utils/functions/routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DarkProvider>
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
                <Route exact path="/login">
                  <LoginPage />
                </Route>
                <Private exact path="/secret">
                  <SecretPage />
                </Private>
                {/* TODO check if this is working correctly */}
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </Layout>
          </ThemesProvider>
        </DarkProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
