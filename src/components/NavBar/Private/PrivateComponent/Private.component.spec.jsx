import React from 'react';

import { fireEvent } from '@testing-library/react';

import { act } from 'react-dom/test-utils';
import Private from './Private.component';

import * as GlobalProvider from '../../../../providers/Global/Global.provider';

import customGlobalRender from '../../../../utils/tests/customRenders/customRenderGlobalProviders';

import { ACTIONS as GLOBAL_ACTIONS } from '../../../../providers/Global/useGlobalReducer';

afterEach(() => {
  jest.clearAllMocks();
});

const STATE_LOGGED_IN = {
  isDarkMode: false,
  searchTerm: '',
  isAuthenticated: true,
  userInfo: {},
};

describe('NavBar private menu', () => {
  describe('Initial render', () => {
    it('renders elements', () => {
      const { getByRole } = customGlobalRender(<Private />);

      expect(getByRole('button', { name: /Log out/i })).toBeInTheDocument();
      expect(getByRole('link', { name: /Library/i })).toBeInTheDocument();
    });
  });
  describe('Link and button functionality', () => {
    it('LogOut calls global dispatch ', () => {
      const mockDispatchGlobal = jest.fn();
      jest.spyOn(GlobalProvider, 'useGlobalContext').mockImplementation(() => ({
        dispatchGlobal: mockDispatchGlobal,
        globalState: STATE_LOGGED_IN,
      }));

      const { getByRole } = customGlobalRender(<Private />);

      const logOutButton = getByRole('button', { name: /Log out/i });

      act(() => {
        fireEvent.click(logOutButton);
      });

      expect(mockDispatchGlobal).toHaveBeenNthCalledWith(1, {
        type: GLOBAL_ACTIONS.LOGOUT,
      });
    });
  });
});
