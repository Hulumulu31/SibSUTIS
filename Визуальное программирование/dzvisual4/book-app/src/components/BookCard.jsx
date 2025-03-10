import React from "react";

const BookCard = ({ book }) => {
  const { volumeInfo } = book;
  return (
    <div className="book-card">
      <img src={volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"} alt={volumeInfo.title} />
      <h3>{volumeInfo.title}</h3>
      <p>{volumeInfo.authors?.join(", ") || "Автор неизвестен"}</p>
    </div>
  );
};

export default BookCard;
