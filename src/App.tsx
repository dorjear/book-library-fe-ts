import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Routes, Route, Link } from "react-router-dom";

import AddBook from "./components/AddBook";
import BooksList from "./components/BookList";

function App() {
  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/books" className="navbar-brand">
            Book Library
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/books"} className="nav-link">
                Books
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<BooksList/>} />
            <Route path="/books" element={<BooksList/>} />
            <Route path="/add" element={<AddBook/>} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
