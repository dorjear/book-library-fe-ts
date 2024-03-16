import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from './App'; // Adjust the import path to where your App component is located

describe('App Component', () => {
  test('navigates to the books list when "Books" is clicked', async () => {
    render(
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    );
    // Click on the "Books" link
    await userEvent.click(screen.getByText(/books/i));

    // Check if the URL changed to "/books"
    expect(window.location.pathname).toBe('/books');
  });

  test('navigates to the add book page when "Add" is clicked', async () => {
    render(
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    );
    await userEvent.click(screen.getByText(/add/i));

    // Check if the URL changed to "/add"
    expect(window.location.pathname).toBe('/add');
  });
});
