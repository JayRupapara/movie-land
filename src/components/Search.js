import React from "react";
import "./Search.css";




function Search({ searchInput, search }) {
	return (
		<div className="search-bar">
		<i className="fas fa-search"></i>
		<input
		  type="text"
		  placeholder="Search for a movie..."
 		  className="search"
		  onChange={searchInput}
		  onKeyPress={search}
		/>
	  </div>
	);
}

export default Search;
