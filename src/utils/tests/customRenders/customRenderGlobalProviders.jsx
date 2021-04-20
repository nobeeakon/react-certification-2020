import React from 'react';
import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import GlobalContextProvider from '../../../providers/Global';
import ThemesProvider from '../../../providers/Theme';

const AllTheGlobalProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <GlobalContextProvider>
        <ThemesProvider>{children}</ThemesProvider>
      </GlobalContextProvider>
    </BrowserRouter>
  );
};

const customRenderGlobalProviders = (ui, options) =>
  render(ui, { wrapper: AllTheGlobalProviders, ...options });

// override render method
export default customRenderGlobalProviders;
