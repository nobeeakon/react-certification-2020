import { useReducer } from 'react';

export const ACTIONS = {
  TOOGLE_DARK: 'toogleDark',
  UPDATE_SEARCH: 'updateSearch',
  LOGIN: 'logIn',
  LOGOUT: 'logOut',
};

/* const mockedUser = {
  id: '123',
  name: 'Wizeline',
  avatarUrl:
    'https://media.glassdoor.com/sqll/868055/wizeline-squarelogo-1473976610815.png',
}; */

const INITIAL_STATE = {
  isDarkMode: false,
  searchTerm: '',
  isAuthenticated: false,
  userInfo: null,
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
    case ACTIONS.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        userInfo: action.payload,
      };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        userInfo: null,
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
