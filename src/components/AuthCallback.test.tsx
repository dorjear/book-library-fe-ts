import React from 'react';
import {render, waitFor} from '@testing-library/react';
import {BrowserRouter, useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import AuthCallback from './AuthCallback';

jest.mock('axios');

// Mock the useLocation and useNavigate hooks from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('AuthCallback', () => {
  const mockNavigate = jest.fn();
  const mockLocation = {
    search: '?code=test_code',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
  });

  test('redirects to /books on successful authentication', async () => {
    const tokenResponse = {
      data: {
        access_token: 'test_access_token',
      },
    };
    (axios.get as jest.Mock).mockResolvedValueOnce(tokenResponse);

    render(
      <BrowserRouter>
        <AuthCallback/>
      </BrowserRouter>
    );

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/books'));
    expect(localStorage.getItem('token')).toBe('test_access_token');
  });

  test('handles error during authentication', async () => {
    const errorMessage = 'Authentication failed';
    const error = new Error(errorMessage);
    (axios.get as jest.Mock).mockRejectedValueOnce(error);
    console.error = jest.fn();

    render(
      <BrowserRouter>
        <AuthCallback/>
      </BrowserRouter>
    );

    await waitFor(() => expect(console.error).toHaveBeenCalledWith('Error during authentication:', error));
  });

  test('handles missing authorization code', async () => {
    const locationWithoutCode = {
      search: '',
    };
    (useLocation as jest.Mock).mockReturnValue(locationWithoutCode);
    console.error = jest.fn();

    render(
      <BrowserRouter>
        <AuthCallback/>
      </BrowserRouter>
    );

    await waitFor(() => expect(console.error).toHaveBeenCalledWith('Authorization code not found in the URL'));
  });
});
