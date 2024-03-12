import IBookData from "../types/Book";
import axios from "axios";

export const http = axios.create({
  baseURL: `${process.env.REACT_APP_BE_BASE_URL}`,
  headers: {
    "Content-type": "application/json"
  }
});

const getAll = () => {
  return http.get<Array<IBookData>>("/books");
};

const create = (data: IBookData) => {
  return http.post<IBookData>("/book", data);
};

const update = (data: IBookData) => {
  return http.put<any>(`/book`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/book/${id}`);
};

const BookService = {
  getAll,
  create,
  update,
  remove,
};

export default BookService;
