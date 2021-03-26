import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AuthProvider from '../../providers/Auth';
import DarkProvider from '../../providers/DarkMode';
import ThemesProvider from '../../providers/Theme';

import NavBar from '../NavBar';

import HomePage from '../../pages/Home';
import LoginPage from '../../pages/Login';
import NotFound from '../../pages/NotFound';
import SecretPage from '../../pages/Secret';
import Private from '../Private';
import Layout from '../Layout';

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
                <Route exact path="/login">
                  <LoginPage />
                </Route>
                <Private exact path="/secret">
                  <SecretPage />
                </Private>

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
