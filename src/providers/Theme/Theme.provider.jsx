import React from 'react';
import { ThemeProvider } from 'styled-components';

import { useGlobalContext } from '../Global/Global.provider';

import themes from '../../utils/themes';

const ThemesProvider = ({ children }) => {
  const { globalState } = useGlobalContext();
  const { isDarkMode } = globalState;

  const theme = isDarkMode ? 'dark' : 'light';

  return <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>;
};

export default ThemesProvider;
