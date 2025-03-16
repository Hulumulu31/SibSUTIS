import React from "react";

const BookCard = ({ title, authors, cover }) => {
  return (
    <div className="book-card">
      <img src={cover || "https://via.placeholder.com/150"} alt={title} className="book-cover" />
      <div className="book-info">
        <h3>{title}</h3>
        <p>{authors.length > 0 ? authors.join(", ") : "Автор неизвестен"}</p>
      </div>
    </div>
  );
};

export default BookCard;
