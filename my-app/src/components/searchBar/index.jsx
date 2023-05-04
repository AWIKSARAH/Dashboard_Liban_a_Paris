import { useState } from "react";
import { Search } from "@mui/icons-material";
import "./searchBar.css";

function SearchBar({ onSearchClick }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearchClick(searchTerm);
  };
  return (
    <div className="wrap">
        <form onSubmit={handleSearchSubmit}>
      <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="What are you looking for?"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="searchButton">
            <Search />
          </button>
      </div>
        </form>
    </div>
  );
}

export default SearchBar;
