import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddBook from './AddBook';
import BookDataService from '../services/BookService';
import IBookData, { BookStatus} from '../types/Book';

jest.mock('../services/BookService');
const mockedBookDataService = BookDataService as jest.Mocked<typeof BookDataService>;

describe('AddBook', () => {
    const mockBook: IBookData = {
        id: 1,
        name: 'New Book',
        author: 'New Author',
        status: BookStatus.Available,
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the form correctly', () => {
        render(<AddBook />);

        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Author')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('updates the book state correctly', () => {
        render(<AddBook />);

        const nameInput = screen.getByLabelText('Name');
        const authorInput = screen.getByLabelText('Author');

        fireEvent.change(nameInput, { target: { value: 'New Book Name' } });
        fireEvent.change(authorInput, { target: { value: 'New Book Author' } });

        expect(nameInput).toHaveValue('New Book Name');
        expect(authorInput).toHaveValue('New Book Author');
    });

    it('creates a new book successfully', async () => {
        const createMock = jest.fn().mockResolvedValue({ data: mockBook });
        mockedBookDataService.create.mockImplementation(createMock);

        render(<AddBook />);

        const nameInput = screen.getByLabelText('Name');
        const authorInput = screen.getByLabelText('Author');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(nameInput, { target: { value: 'New Book' } });
        fireEvent.change(authorInput, { target: { value: 'New Author' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(createMock).toHaveBeenCalledWith({
                name: 'New Book',
                author: 'New Author',
                status: BookStatus.Available,
            });
        });

        await waitFor(() => {
            expect(screen.getByText('You submitted successfully!')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
        });

    });

    it('resets the form after successful submission', async () => {
        const createMock = jest.fn().mockResolvedValue({ data: mockBook });
        mockedBookDataService.create.mockImplementation(createMock);

        render(<AddBook />);

        const nameInput = screen.getByLabelText('Name');
        const authorInput = screen.getByLabelText('Author');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(nameInput, { target: { value: 'New Book' } });
        fireEvent.change(authorInput, { target: { value: 'New Author' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('You submitted successfully!')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(createMock).toHaveBeenCalledWith({
                name: 'New Book',
                author: 'New Author',
                status: BookStatus.Available,
            });
        });

        await waitFor(() => {
            const addButton = screen.getByRole('button', { name: 'Add' });
            fireEvent.click(addButton);
        });

        const nameInputAgain = screen.getByLabelText('Name');
        const authorInputAgain = screen.getByLabelText('Author');
        expect(nameInputAgain).toHaveValue('');
        expect(authorInputAgain).toHaveValue('');
        expect(screen.queryByText('You submitted successfully!')).not.toBeInTheDocument();
    });
});
