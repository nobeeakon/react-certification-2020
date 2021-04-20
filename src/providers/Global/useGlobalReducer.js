import { useReducer } from 'react';

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
      throw new Error(`Global reducer action.type "${action.type}" not allowed`);
  }
};

const useGlobalReducer = () => {
  const [globalState, dispatchGlobal] = useReducer(reducer, INITIAL_STATE);

  return [globalState, dispatchGlobal];
};

export default useGlobalReducer;
