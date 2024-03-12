import React, {useState, useEffect, useRef} from "react";
import BookDataService from "../services/BookService";
import IBookData, {BookStatus} from '../types/Book';

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Array<IBookData>>([]);
    const booksRef = useRef<Array<IBookData>>(books);
    booksRef.current = books;

    useEffect(() => {
        console.log("Books useEffect")
        retrieveBooks();
    }, []);

    const retrieveBooks = () => {
        BookDataService.getAll()
            .then((response: any) => {
                setBooks(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteBook = (rowIndex: number, id: number) => {
        BookDataService.remove(id)
            .then((response) => {
                let newBooks = [...booksRef.current];
                newBooks.splice(rowIndex, 1);
                setBooks(newBooks);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const updateStatus = (book: IBookData, status: BookStatus) => {
        book.status = status;
        BookDataService.update(book)
            .then((response: any) => {
                let newBooks = [...books];
                setBooks(newBooks);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <div className="list row">
            <div className="container">
                <h2>Book List</h2>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books &&
                    books.map((book, index) => (
                        <tr>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                            <td>{book.status}</td>
                            <td>
                                <div>
                                    {book.status === BookStatus.Available ? (
                                        <button
                                            className="badge badge-primary mr-2"
                                            onClick={() => updateStatus(book, BookStatus.Borrowed)}
                                        >
                                            Mark borrowed
                                        </button>
                                    ) : (
                                        <button
                                            className="badge badge-success mr-2"
                                            onClick={() => updateStatus(book, BookStatus.Available)}
                                        >
                                            Mark available
                                        </button>
                                    )}

                                    <button className="badge badge-danger mr-2"
                                            onClick={() => deleteBook(index, book.id)}>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookList;
