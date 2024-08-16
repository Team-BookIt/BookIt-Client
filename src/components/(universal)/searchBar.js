import React, { useState } from "react";
import { MdSearch } from "react-icons/md";


const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    }

    return (
        <div className="search-bar">
            <input
                placeholder="Search events by name, location, category... "
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <MdSearch size={25}/>
        </div>
    )
}

export default SearchBar;