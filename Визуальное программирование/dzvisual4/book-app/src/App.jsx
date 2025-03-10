import React, { useEffect, useState } from "react";
import BookCard from "./components/BookCard";
import "./main.css";

const API_URL = "https://www.googleapis.com/books/v1/volumes?q=inauthor:Stephen+King";

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setBooks(data.items || []))
      .catch((error) => console.error("Ошибка загрузки книг:", error));
  }, []);

  return (
    <div className="container">
      <h1>Книги Стивена Кинга 🔪</h1>
      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <p>Загрузка книг...</p>
        )}
      </div>
    </div>
  );
};

export default App;
