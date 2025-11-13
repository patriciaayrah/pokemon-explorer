import React from 'react';
import '../style/SearchBar.css';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-bar"> {/* Added wrapper div for styling */}
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;