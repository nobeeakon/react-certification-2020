import React from 'react';
import ReactDOM from 'react-dom';

// mock service worker, for development only
import { worker } from './mocks/browser';

import App from './components/App';

import GlobalStyle from './GlobalStyles';

// mock service worker, for development only
if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
