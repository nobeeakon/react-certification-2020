import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import NavBar from './NavBar.component';
import DarThemeProvider from '../../providers/DarkMode';
import AuthProvider from '../../providers/Auth';
import { storage } from '../../utils/storage';

jest.mock('../../utils/storage');

describe('Testing NavBar.component', () => {
  test('toggleDarkmode when click toggle button', () => {
    const { container } = render(
      <AuthProvider>
        <DarThemeProvider>
          <NavBar />
        </DarThemeProvider>
      </AuthProvider>
    );

    const darkModeToggle = container.querySelector('#toggleTheme');
    fireEvent.click(darkModeToggle);

    expect(storage.set).toHaveBeenCalledTimes(1);
    fireEvent.click(darkModeToggle);
    expect(storage.set).toHaveBeenCalledTimes(2);
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
