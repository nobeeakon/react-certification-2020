import React, { useState, useEffect, useContext, useCallback } from 'react';

import { DARK_MODE_KEY } from '../../utils/constants';
import { storage } from '../../utils/storage';

const DarkModeContext = React.createContext(null);

function useDark() {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error(`Can't use "useDark" without an DarkModeProvider!`);
  }

  return context;
}

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currState = storage.get(DARK_MODE_KEY);

    const isDark = Boolean(currState);

    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prevVal) => !prevVal);

    storage.set(DARK_MODE_KEY, isDarkMode);
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ toggleDarkMode, isDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export { useDark };
export default DarkModeProvider;
