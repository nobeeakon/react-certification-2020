import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import Login from './Login.component';

import loginApi from '../../../../utils/mocks/mockedLogin';

import GlobalContextProvider from '../../../../providers/Global';
import ThemesProvider from '../../../../providers/Theme';

jest.mock('../../../../utils/mocks/mockedLogin');

const LoginProviders = ({ children }) => {
  return (
    <GlobalContextProvider>
      <ThemesProvider>{children}</ThemesProvider>
    </GlobalContextProvider>
  );
};

const customRenderLogin = (ui, options) =>
  render(ui, { wrapper: LoginProviders, ...options });

afterEach(() => {
  jest.clearAllMocks();
});

describe('Testing LogIn component', () => {
  test('Initial render', () => {
    const { getByLabelText, getByRole } = customRenderLogin(<Login />);

    const userName = getByLabelText(/Name/i);
    const userPassword = getByLabelText(/Password/i);
    const inputButton = getByRole('button', { name: /Log-in/i });

    expect(userName).toBeInTheDocument();
    expect(userName.value).toBe('');
    expect(userPassword).toBeInTheDocument();
    expect(userPassword.value).toBe('');
    expect(inputButton).toBeInTheDocument();
    expect(inputButton).toBeDisabled();
  });

  test('User Name input', () => {
    const { getByLabelText } = customRenderLogin(<Login />);

    const userNameInput = getByLabelText(/Name/i);
    act(() => {
      fireEvent.change(userNameInput, { target: { value: '23' } });
    });
    expect(userNameInput.value).toBe('23');
  });

  describe('Submit button disabled behavior', () => {
    it('Disabled, unless both fields are filled', () => {
      const { getByLabelText, getByRole } = customRenderLogin(<Login />);

      const userNameInput = getByLabelText(/Name/i);
      const userPasswordInput = getByLabelText(/Password/i);
      const inputButton = getByRole('button', { name: /Log-in/i });

      expect(inputButton).toBeDisabled();
      act(() => {
        fireEvent.change(userNameInput, { target: { value: '' } });
        fireEvent.change(userPasswordInput, { target: { value: '123' } });
      });
      expect(inputButton).toBeDisabled();

      act(() => {
        fireEvent.change(userNameInput, { target: { value: '123' } });
        fireEvent.change(userPasswordInput, { target: { value: '' } });
      });
      expect(inputButton).toBeDisabled();

      act(() => {
        fireEvent.change(userNameInput, { target: { value: '123' } });
        fireEvent.change(userPasswordInput, { target: { value: '123' } });
      });
      expect(inputButton).not.toBeDisabled();
    });
  });

  describe('Both fields (name, password) are filled', () => {
    it('Button is not disabled, only when both fields have been filled', () => {
      const { getByLabelText, getByRole, queryByText } = customRenderLogin(<Login />);

      const userNameInput = getByLabelText(/Name/i);
      const userPasswordInput = getByLabelText(/Password/i);
      const inputButton = getByRole('button', { name: /Log-in/i });

      expect(queryByText(/Please fill your name/i)).not.toBeInTheDocument();

      expect(inputButton).toBeDisabled();
      expect(loginApi).toBeCalledTimes(0);

      act(() => {
        fireEvent.change(userNameInput, { target: { value: '123' } });
      });
      act(() => {
        fireEvent.change(userPasswordInput, { target: { value: '123' } });
      });
      expect(inputButton).not.toBeDisabled();
    });

    // TODO implement this test : 'Alerts, when user Name or Password are not valid'
  });
});
