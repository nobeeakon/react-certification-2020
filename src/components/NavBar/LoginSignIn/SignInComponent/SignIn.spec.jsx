import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import SignIn from './SignIn.component';

import GlobalContextProvider from '../../../../providers/Global';
import ThemesProvider from '../../../../providers/Theme';

const LoginProviders = ({ children }) => {
  return (
    <GlobalContextProvider>
      <ThemesProvider>{children}</ThemesProvider>
    </GlobalContextProvider>
  );
};

const customRenderLogin = (ui, options) =>
  render(ui, { wrapper: LoginProviders, ...options });

const mockedSetButtonMessage = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe('Testing LogIn component', () => {
  test('Initial render', () => {
    const { getByLabelText, getAllByLabelText, getByRole } = customRenderLogin(
      <SignIn setButtonMessage={mockedSetButtonMessage} />
    );

    const userEmail = getByLabelText(/email/i);
    const userPassword = getAllByLabelText(/Password/i);
    const inputButton = getByRole('button', { name: /Sign-in/i });

    expect(userEmail).toBeInTheDocument();
    expect(userEmail.value).toBe('');
    expect(userPassword.length).toBe(2);

    expect(inputButton).toBeInTheDocument();
    expect(inputButton).toBeDisabled();
  });

  test('User Name input', () => {
    const { getByLabelText } = customRenderLogin(
      <SignIn setButtonMessage={mockedSetButtonMessage} />
    );

    const userEmailInput = getByLabelText(/email/i);
    act(() => {
      fireEvent.change(userEmailInput, { target: { value: '23' } });
    });
    expect(userEmailInput.value).toBe('23');
  });

  describe('Submit button disabled behavior and alerts', () => {
    test('Button is Disabled, unless the three fields are filled and paswords are same', () => {
      const {
        getByLabelText,
        getAllByLabelText,
        getByRole,
        getByText,
        queryByText,
      } = customRenderLogin(<SignIn setButtonMessage={mockedSetButtonMessage} />);

      const userEmailInput = getByLabelText(/email/i);
      const userPasswordsInput = getAllByLabelText(/Password/i);
      const inputButton = getByRole('button', { name: /Sign-in/i });

      // initial alert
      expect(getByText(/least 7 characters/i)).toBeInTheDocument();

      expect(inputButton).toBeDisabled();
      act(() => {
        fireEvent.change(userEmailInput, { target: { value: '' } });
        fireEvent.change(userPasswordsInput[0], { target: { value: '123123123' } });
        fireEvent.change(userPasswordsInput[1], { target: { value: '123123123' } });
      });
      expect(inputButton).toBeDisabled();

      act(() => {
        fireEvent.change(userEmailInput, { target: { value: 'aaaa@aaa.com' } });
        fireEvent.change(userPasswordsInput[0], { target: { value: '' } });
        fireEvent.change(userPasswordsInput[1], { target: { value: '' } });
      });
      expect(inputButton).toBeDisabled();

      act(() => {
        fireEvent.change(userEmailInput, { target: { value: 'aaaa@aaa.com' } });
        fireEvent.change(userPasswordsInput[0], { target: { value: '123123123' } });
        fireEvent.change(userPasswordsInput[1], { target: { value: '987987987' } });
      });
      expect(inputButton).toBeDisabled();

      expect(queryByText(/least 7 characters/i)).not.toBeInTheDocument();
      expect(getByText(/Passwords are not equal/i)).toBeInTheDocument();

      act(() => {
        fireEvent.change(userEmailInput, { target: { value: 'aaaa@aaa.com' } });
        fireEvent.change(userPasswordsInput[0], { target: { value: '123123123' } });
        fireEvent.change(userPasswordsInput[1], { target: { value: '123123123' } });
      });
      expect(inputButton).not.toBeDisabled();
      expect(queryByText(/Passwords are not equal/i)).not.toBeInTheDocument();
    });
  });
});
