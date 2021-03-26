import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import NavBar from './NavBar.component';
import DarThemeProvider from '../../providers/DarkMode';
import AuthProvider from '../../providers/Auth';

import { storage } from '../../utils/storage';

import { DARK_MODE_KEY } from '../../utils/constants';

jest.mock('../../utils/storage');

describe('Testing NavBar.component', () => {
  test('toggleDarkmode when click toggle button', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <DarThemeProvider>
          <NavBar />
        </DarThemeProvider>
      </AuthProvider>
    );

    const darkModeToggle = getByTestId('toggleTheme-button');
    fireEvent.click(darkModeToggle);

    expect(storage.set).toHaveBeenNthCalledWith(1, DARK_MODE_KEY, false);
    fireEvent.click(darkModeToggle);
    expect(storage.set).toHaveBeenNthCalledWith(2, DARK_MODE_KEY, true);
  });

  test('Search value should change when input', () => {
    render(
      <AuthProvider>
        <DarThemeProvider>
          <NavBar />
        </DarThemeProvider>
      </AuthProvider>
    );

    const input = screen.getByPlaceholderText(/Search/i);
    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: '23' } });
    expect(input.value).toBe('23');
  });
});
