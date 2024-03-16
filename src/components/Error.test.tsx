import React from 'react';
import {render, screen} from '@testing-library/react';
import Error from './Error';

describe('Error component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('removes token from localStorage', () => {
    // Set a token in localStorage before rendering the component
    localStorage.setItem('token', 'test_token');

    render(<Error/>);

    const errorText = screen.getByText('Error page');
    expect(errorText).toBeInTheDocument();

    // Check that the token is removed from localStorage
    const token = localStorage.getItem('token');
    expect(token).toBeNull();
  });
});
