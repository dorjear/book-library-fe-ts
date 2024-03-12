import React, {ChangeEvent, useState} from "react";
import BookDataService from "../services/BookService";
import IBookData, {BookStatus} from '../types/Book';

const AddBook: React.FC = () => {
  const initialBookState: IBookData = {
    id: null,
    name: "",
    author: "",
    status: BookStatus.Available
  };
  const [book, setBook] = useState<IBookData>(initialBookState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const saveBook = () => {
    const data = {
      name: book.name,
      author: book.author,
      status: BookStatus.Available
    };

    BookDataService.create(data)
      .then((response: any) => {
        setBook({
          id: response.data.id,
          name: response.data.name,
          author: response.data.author,
          status: response.data.status
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newBook = () => {
    setBook(initialBookState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newBook}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={book.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              className="form-control"
              id="author"
              required
              value={book.author}
              onChange={handleInputChange}
              name="author"
            />
          </div>

          <button onClick={saveBook} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBook;
