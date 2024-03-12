import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookList from './BookList';
import BookDataService from '../services/BookService';
import { AxiosResponse } from 'axios';
import IBookData, { BookStatus} from '../types/Book';

jest.mock('../services/BookService');
const mockedBookDataService = BookDataService as jest.Mocked<typeof BookDataService>;

describe('BookList', () => {
    const mockBooks: IBookData[] = [
        { id: 1, name: 'Book 1', author: 'Author 1', status: BookStatus.Available },
        { id: 2, name: 'Book 2', author: 'Author 2', status: BookStatus.Borrowed },
    ];

    beforeEach(() => {
        const mockResponse: AxiosResponse<IBookData[]> = {
            data: mockBooks,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };
        mockedBookDataService.getAll.mockResolvedValue(mockResponse);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders book list correctly', async () => {
        render(<BookList />);

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

        render(<BookList />);

        await waitFor(() => {
            const borrowButton = screen.getByText('Mark borrowed');
            fireEvent.click(borrowButton);
        });

        expect(updateMock).toHaveBeenCalledWith({ ...mockBooks[0], status: BookStatus.Borrowed });
    });

    it('deletes a book correctly', async () => {
        const removeMock = jest.fn().mockResolvedValue({});
        mockedBookDataService.remove.mockImplementation(removeMock);

        render(<BookList />);

        await waitFor(() => {
            const deleteButton = screen.getAllByText('Delete')[0];
            fireEvent.click(deleteButton);
        });

        expect(removeMock).toHaveBeenCalledWith(mockBooks[0].id);
    });
});
