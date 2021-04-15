import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import NavBar from './NavBar.component';
import GlobalContextProvider from '../../providers/Global';
import AuthProvider from '../../providers/Auth';

import { ROUTES } from '../../utils/functions/routes';

// TODO: check if mocking history is a good aproach.
//       It seems to me (Daniel) as an implementation detail...
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

describe('Testing NavBar.component', () => {
  // TODO: how to  test toggle dark mode, without testing the actual implementation?

  describe('Home icon', () => {
    it('should go to the home page, when home icon is clicked', () => {
      const { getByTestId } = render(
        <AuthProvider>
          <GlobalContextProvider>
            <NavBar />
          </GlobalContextProvider>
        </AuthProvider>
      );

      const homeButton = getByTestId(/home-button/i);

      fireEvent.click(homeButton);

      expect(mockHistoryPush).toHaveBeenNthCalledWith(1, `/`);
    });
  });

  describe('Sign in button', () => {
    it('should go to /login, when it is clicked', () => {
      const { getByTestId } = render(
        <AuthProvider>
          <GlobalContextProvider>
            <NavBar />
          </GlobalContextProvider>
        </AuthProvider>
      );

      const homeButton = getByTestId(/sign-in-button/i);

      fireEvent.click(homeButton);

      expect(mockHistoryPush).toHaveBeenNthCalledWith(1, `/login`);
    });
  });

  describe('Search and input', () => {
    test('Search value should change when input', () => {
      const { getByPlaceholderText } = render(
        <AuthProvider>
          <GlobalContextProvider>
            <NavBar />
          </GlobalContextProvider>
        </AuthProvider>
      );

      const input = getByPlaceholderText(/Search/i);
      expect(input.value).toBe('');
      act(() => {
        fireEvent.change(input, { target: { value: '23' } });
      });
      expect(input.value).toBe('23');
    });

    it('should should change route to search Page, when searchButton is clicked  ', () => {
      const { getByPlaceholderText, getByTestId } = render(
        <AuthProvider>
          <GlobalContextProvider>
            <NavBar />
          </GlobalContextProvider>
        </AuthProvider>
      );

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
