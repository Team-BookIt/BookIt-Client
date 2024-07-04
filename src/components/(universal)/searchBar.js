import React from "react";
import { MdSearch } from "react-icons/md";


const SearchBar = () => {
    return (
        <div className="search-bar">
            <input
                placeholder="Search events by name, location, category... "
                type="text"
            />
            <MdSearch size={25}/>
        </div>
    )
}

export default SearchBar;