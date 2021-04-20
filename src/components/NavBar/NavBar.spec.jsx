import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import NavBar from './NavBar.component';

import GlobalContextProvider, * as GlobalProvider from '../../providers/Global/Global.provider';

import AuthProvider from '../../providers/Auth';

import { ROUTES } from '../../utils/functions/routes';

// mocking history
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

afterEach(() => {
  mockHistoryPush.mockClear();
});

const NavBarProviders = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalContextProvider>{children}</GlobalContextProvider>
    </AuthProvider>
  );
};

const customRenderNavBar = (ui, options) =>
  render(ui, { wrapper: NavBarProviders, ...options });

describe('Testing NavBar.component', () => {
  describe('Toogle theme button', () => {
    it('changes icon when clicked', () => {
      const { queryByTestId, getByTestId } = customRenderNavBar(<NavBar />);

      expect(queryByTestId(/icon-moon-testid/i)).toBeInTheDocument();
      expect(queryByTestId(/icon-sun-testid/i)).not.toBeInTheDocument();

      const toogleDarkButton = getByTestId(/toggleTheme-button/i);
      fireEvent.click(toogleDarkButton);

      expect(queryByTestId(/icon-moon-testid/i)).not.toBeInTheDocument();
      expect(queryByTestId(/icon-sun-testid/i)).toBeInTheDocument();
    });

    it('calls useGlobalReducer dispatch', () => {
      const INITIAL_STATE = {
        isDarkMode: false,
        searchTerm: '',
      };

      const mockDispatchGlobal = jest.fn();
      jest.spyOn(GlobalProvider, 'useGlobalContext').mockImplementation(() => ({
        dispatchGlobal: mockDispatchGlobal,
        globalState: INITIAL_STATE,
      }));

      const { getByTestId } = customRenderNavBar(<NavBar />);

      expect(mockDispatchGlobal).toBeCalledTimes(0);
      const toogleDarkButton = getByTestId(/toggleTheme-button/i);
      fireEvent.click(toogleDarkButton);

      expect(mockDispatchGlobal).toBeCalledTimes(1);
    });
  });

  describe('Home icon', () => {
    it('should go to the home page, when home icon is clicked', () => {
      const { getByTestId } = customRenderNavBar(<NavBar />);

      const homeButton = getByTestId(/home-button/i);

      fireEvent.click(homeButton);

      expect(mockHistoryPush).toHaveBeenNthCalledWith(1, `/`);
    });
  });

  describe('Sign in button', () => {
    it('should go to /login, when it is clicked', () => {
      const { getByTestId } = customRenderNavBar(<NavBar />);

      const homeButton = getByTestId(/sign-in-button/i);

      fireEvent.click(homeButton);

      expect(mockHistoryPush).toHaveBeenNthCalledWith(1, `/login`);
    });
  });

  describe('Search and input', () => {
    test('Search value should change when input', () => {
      const { getByPlaceholderText } = customRenderNavBar(<NavBar />);

      const input = getByPlaceholderText(/Search/i);
      expect(input.value).toBe('');
      act(() => {
        fireEvent.change(input, { target: { value: '23' } });
      });
      expect(input.value).toBe('23');
    });

    it('should should change route to search Page, when searchButton is clicked  ', () => {
      const { getByPlaceholderText, getByTestId } = customRenderNavBar(<NavBar />);

      const input = getByPlaceholderText(/Search/i);
      const inputButton = getByTestId(/input-button-testid/i);

      expect(input.value).toBe('');
      act(() => {
        fireEvent.change(input, { target: { value: '23' } });
      });
      expect(input.value).toBe('23');

      fireEvent.click(inputButton);

      expect(mockHistoryPush).toHaveBeenNthCalledWith(1, `/${ROUTES.RESULTS}`);
    });
  });
});
