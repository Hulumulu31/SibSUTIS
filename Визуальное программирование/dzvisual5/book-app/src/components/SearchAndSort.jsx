import React from "react";

const SearchAndSort = ({ searchTerm, setSearchTerm, sortBy, setSortBy, sortOrder, setSortOrder }) => {
  return (
    <div className="search-sort">
      <input
        type="text"
        placeholder="🔍 Найти книгу..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="sort-controls">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
          <option value="title">По названию</option>
          <option value="authors">По автору</option>
        </select>

        <button className="sort-button" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          {sortOrder === "asc" ? "🔼" : "🔽"}
        </button>
      </div>
    </div>
  );
};

export default SearchAndSort;
