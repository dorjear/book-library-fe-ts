import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import BookList from './BookList';
import BookDataService from '../services/BookService';
import {AxiosResponse} from 'axios';
import IBookData, {BookStatus} from '../types/Book';
import {BrowserRouter} from "react-router-dom";

jest.mock('../services/BookService');

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

const mockedBookDataService = BookDataService as jest.Mocked<typeof BookDataService>;

describe('BookList', () => {
  const mockBooks: IBookData[] = [
    {id: 1, name: 'Book 1', author: 'Author 1', status: BookStatus.Available},
    {id: 2, name: 'Book 2', author: 'Author 2', status: BookStatus.Borrowed},
  ];

  beforeEach(() => {
    const mockResponse: AxiosResponse<IBookData[]> = {
      data: mockBooks,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockedNavigate.mockClear();
    mockedBookDataService.getAll.mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders book list correctly', async () => {
    render(
      <BrowserRouter>
        <BookList/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Book 1')).toBeInTheDocument();
      expect(screen.getByText('Author 1')).toBeInTheDocument();
      expect(screen.getByText(BookStatus.Available)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Book 2')).toBeInTheDocument();
      expect(screen.getByText('Author 2')).toBeInTheDocument();
      expect(screen.getByText(BookStatus.Borrowed)).toBeInTheDocument();
    });
  });

  it('updates book status correctly', async () => {
    const updateMock = jest.fn().mockResolvedValue({});
    mockedBookDataService.update.mockImplementation(updateMock);

    render(
      <BrowserRouter>
        <BookList/>
      </BrowserRouter>
    );

    await waitFor(() => {
      const borrowButton = screen.getByText('Mark borrowed');
      fireEvent.click(borrowButton);
    });

    expect(updateMock).toHaveBeenCalledWith({...mockBooks[0], status: BookStatus.Borrowed});
  });

  it('updates book status error', async () => {
    // const updateMock = jest.fn().mockResolvedValue({});
    const updateMock = jest.fn().mockRejectedValue(new Error('Update error'));
    mockedBookDataService.update.mockImplementation(updateMock);
    // mockedBookDataService.update.mockRejectedValue(new Error('Update error'));
    // (BookDataService.update as jest.Mock).mockRejectedValue(new Error('Update error'));
    // (BookDataService.update as jest.Mock).mockRejectedValue(new Error('Update error'));

    render(
      <BrowserRouter>
        <BookList/>
      </BrowserRouter>
    );

    await waitFor(() => {
      const borrowButton = screen.getAllByText('Mark available');
      fireEvent.click(borrowButton[0]);
    });

    expect(updateMock).toHaveBeenCalledWith({...mockBooks[0], status: BookStatus.Available});
    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/error'));
  });

  it('deletes a book correctly', async () => {
    const removeMock = jest.fn().mockResolvedValue({});
    mockedBookDataService.remove.mockImplementation(removeMock);

    render(
      <BrowserRouter>
        <BookList/>
      </BrowserRouter>
    );

    await waitFor(() => {
      const deleteButton = screen.getAllByText('Delete')[0];
      fireEvent.click(deleteButton);
    });

    expect(removeMock).toHaveBeenCalledWith(mockBooks[0].id);
  });

  it('deletes a book error', async () => {
    const removeMock = jest.fn().mockRejectedValue(new Error('Update error'));
    mockedBookDataService.remove.mockImplementation(removeMock);

    render(
      <BrowserRouter>
        <BookList/>
      </BrowserRouter>
    );

    await waitFor(() => {
      const deleteButton = screen.getAllByText('Delete')[0];
      fireEvent.click(deleteButton);
    });

    expect(removeMock).toHaveBeenCalledWith(mockBooks[0].id);
    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/error'));
  });

  test('navigates to error page on error', async () => {
    (BookDataService.getAll as jest.Mock).mockRejectedValue(new Error('Network error'));

    render(
      <BrowserRouter>
        <BookList/>
      </BrowserRouter>
    );
    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/error'));
  });

});
