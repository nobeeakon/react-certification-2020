import React, { useContext } from 'react';

import useGlobalReducer from './useGlobalReducer';

const GlobalContext = React.createContext();

const GlobalContextProvider = ({ children }) => {
  const [globalState, dispatchGlobal] = useGlobalReducer();

  return (
    <GlobalContext.Provider value={{ globalState, dispatchGlobal }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const global = useContext(GlobalContext);
  if (!global) {
    throw new Error("Can't use useGlobalContext ouside of GlobalContext provider");
  }
  return global;
};

export default GlobalContextProvider;
