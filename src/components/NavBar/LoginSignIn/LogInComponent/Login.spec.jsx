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

const setButtonMessage = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe('Testing LogIn component', () => {
  test('Initial render', () => {
    const closeModal = jest.fn();
    const { getByLabelText, getByRole } = customRenderLogin(
      <Login closeModal={closeModal} setButtonMessage={setButtonMessage} />
    );

    const userEmail = getByLabelText(/email/i);
    const userPassword = getByLabelText(/Password/i);
    const inputButton = getByRole('button', { name: /Log-in/i });

    expect(userEmail).toBeInTheDocument();
    expect(userEmail.value).toBe('');
    expect(userPassword).toBeInTheDocument();
    expect(userPassword.value).toBe('');
    expect(inputButton).toBeInTheDocument();
    expect(inputButton).toBeDisabled();
  });

  test('User Email input', () => {
    const closeModal = jest.fn();

    const { getByLabelText } = customRenderLogin(
      <Login closeModal={closeModal} setButtonMessage={setButtonMessage} />
    );

    const userEmailInput = getByLabelText(/email/i);
    act(() => {
      fireEvent.change(userEmailInput, { target: { value: '23' } });
    });
    expect(userEmailInput.value).toBe('23');
  });

  describe('Submit button disabled behavior', () => {
    it('Disabled, unless both fields are filled', () => {
      const closeModal = jest.fn();
      const { getByLabelText, getByRole } = customRenderLogin(
        <Login closeModal={closeModal} setButtonMessage={setButtonMessage} />
      );

      const userEmailInput = getByLabelText(/email/i);
      const userPasswordInput = getByLabelText(/Password/i);
      const inputButton = getByRole('button', { name: /Log-in/i });

      expect(inputButton).toBeDisabled();
      act(() => {
        fireEvent.change(userEmailInput, { target: { value: '' } });
        fireEvent.change(userPasswordInput, { target: { value: '123' } });
      });
      expect(inputButton).toBeDisabled();

      act(() => {
        fireEvent.change(userEmailInput, { target: { value: '123' } });
        fireEvent.change(userPasswordInput, { target: { value: '' } });
      });
      expect(inputButton).toBeDisabled();

      act(() => {
        fireEvent.change(userEmailInput, { target: { value: '123' } });
        fireEvent.change(userPasswordInput, { target: { value: '123' } });
      });
      expect(inputButton).not.toBeDisabled();
    });
  });

  describe('Both fields (name, password) are filled', () => {
    it('Button is not disabled, only when both fields have been filled', () => {
      const closeModal = jest.fn();
      const { getByLabelText, getByRole, queryByText } = customRenderLogin(
        <Login closeModal={closeModal} setButtonMessage={setButtonMessage} />
      );

      const userEmailInput = getByLabelText(/email/i);
      const userPasswordInput = getByLabelText(/Password/i);
      const inputButton = getByRole('button', { name: /Log-in/i });

      expect(queryByText(/Please fill your name/i)).not.toBeInTheDocument();

      expect(inputButton).toBeDisabled();
      expect(loginApi).toBeCalledTimes(0);

      act(() => {
        fireEvent.change(userEmailInput, { target: { value: '123' } });
      });
      act(() => {
        fireEvent.change(userPasswordInput, { target: { value: '123' } });
      });
      expect(inputButton).not.toBeDisabled();
    });

    // TODO implement this test : 'Alerts, when user Name or Password are not valid'
  });
});
