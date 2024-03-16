import React from 'react';
import {render, screen} from '@testing-library/react';
import {BrowserRouter, useLocation} from 'react-router-dom';
import AuthCheck from './AuthCheck';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('AuthCheck', () => {
  const MockChild = () => <div>Child Component</div>;

  beforeEach(() => {
    jest.clearAllMocks();
    // delete window.location;
    Object.defineProperty(window, 'location', {
      value: {href: ''},
      writable: true,
    });
    window.location = {href: ''} as any;
  });

  test('renders children when token is present', () => {
    const mockLocation = {
      pathname: '/books',
    };
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
    localStorage.setItem('token', 'test_token');

    render(
      <BrowserRouter>
        <AuthCheck>
          <MockChild/>
        </AuthCheck>
      </BrowserRouter>
    );

    const childComponent = screen.getByText('Child Component');
    expect(childComponent).toBeInTheDocument();
  });

  test('redirects to auth server when token is not present', () => {
    const mockLocation = {
      pathname: '/books',
    };
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
    localStorage.removeItem('token');

    const authUrl = `${process.env.REACT_APP_AUTH_URL}`;

    render(
      <BrowserRouter>
        <AuthCheck>
          <MockChild/>
        </AuthCheck>
      </BrowserRouter>
    );

    expect(window.location.href).toBe(authUrl);
    expect(screen.queryByText('Child Component')).toBeNull();
  });

  test('renders children on /auth and /error routes', () => {
    const mockLocation = {
      pathname: '/auth',
    };
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
    localStorage.removeItem('token');

    render(
      <BrowserRouter>
        <AuthCheck>
          <MockChild/>
        </AuthCheck>
      </BrowserRouter>
    );

    const childComponent = screen.getByText('Child Component');
    expect(childComponent).toBeInTheDocument();
  });
});
