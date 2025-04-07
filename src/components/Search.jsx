import React, { useContext, useRef, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import { MdRestaurantMenu } from "react-icons/md";
import { StoreContext } from "../context/StoreContext.jsx";
import { useLocation } from "react-router-dom";

const Search = () => {
	const inputRef = useRef(null);
	const location = useLocation(); // Get current route
	const isHome = location.pathname === "/"; // Check if the route is "/"

	const { search, setSearch, searchMode, setSearchMode } = useContext(StoreContext);

	const handleSearch = () => {
		if (isHome) {
			setSearchMode(true);
			inputRef.current?.focus();
		}
	};

	const handleCancel = () => {
		inputRef.current?.blur();
		setSearchMode(false);
		setSearch("");
	};

	// Automatically close the search bar when navigating away from "/"
	useEffect(() => {
		if (!isHome) {
			setSearchMode(false);
			setSearch("");
		}
	}, [isHome, setSearchMode, setSearch]);

	return (
		<div className={`flex justify-between items-center border-2 w-full overflow-hidden ${searchMode ? 'bg-green-800 transition-all duration-300 delay-100 border-b-yellow-400 border-r-yellow-400 border-t-yellow-200 border-l-yellow-200' : 'border-transparent bg-transparent transition-all duration-100'} rounded-lg gap-1`}>
			<input
				ref={inputRef}
				onChange={(e) => setSearch(e.target.value)}
				value={search}
				type="text"
				className={`focus:outline-none text-base ${searchMode ? 'p-1 w-5/6 h-max transition-all duration-300 delay-100' : 'p-0 w-0 h-max transition-all duration-200'} bg-green-700`}
			/>
			<div className="text-3xl">
				{!searchMode ? (
					<IoSearch onClick={handleSearch} className={`${isHome ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`} />
				) : (
					<MdRestaurantMenu onClick={handleCancel} />
				)}
			</div>
		</div>
	);
};

export default Search;
