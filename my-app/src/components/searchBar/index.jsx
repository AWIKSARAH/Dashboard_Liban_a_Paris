import { useState } from "react";
import { Search } from "@mui/icons-material";
import "./searchBar.css";

function SearchBar({onSearchClick}) {
  const [searchTerm, setSearchTerm] = useState("");



  return (
    <div className="wrap">
    <div className="search">
      <input type="text" className="searchTerm" placeholder="What are you looking for?" onChange={(e)=>setSearchTerm(e.target.value)}/>
      <button type="button" className="searchButton" onClick={(e)=>onSearchClick(searchTerm)}>
        <Search/>
      </button>
    </div>
  </div>
  );
}

export default SearchBar;
