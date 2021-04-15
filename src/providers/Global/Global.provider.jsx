import React, { useReducer, useContext } from 'react';

const GlobalContext = React.createContext();

export const ACTIONS = {
  TOOGLE_DARK: 'toogleDark',
  UPDATE_SEARCH: 'updateSearch',
};

const INITIAL_STATE = {
  isDarkMode: false,
  searchTerm: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.TOOGLE_DARK:
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    case ACTIONS.UPDATE_SEARCH:
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      throw new Error(`Global reducer action.type ${action.type} not allowed`);
  }
};

const GlobalContextProvider = ({ children }) => {
  const [globalState, dispatchGlobal] = useReducer(reducer, INITIAL_STATE);

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
