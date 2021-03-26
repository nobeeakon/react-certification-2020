import React from 'react';
import { ThemeProvider } from 'styled-components';

import { useDark } from '../DarkMode/DarkMode.provider';

import themes from '../../utils/themes';

const ThemesProvider = ({ children }) => {
  const { isDarkMode } = useDark();
  const theme = isDarkMode ? 'dark' : 'light';

  return <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>;
};

export default ThemesProvider;
