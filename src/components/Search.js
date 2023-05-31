import React, { useContext, useState, useEffect, useRef } from "react";
import ThemeContext from "../context/ThemeContext";
import { searchSymbol } from "../utils/api/stock-api";
import SearchResults from "./SearchResults";
import { SearchIcon, XIcon } from "@heroicons/react/solid";

const Search = () => {
  const { darkMode } = useContext(ThemeContext);

  const [input, setInput] = useState(""); // State for the input value
  const [bestMatches, setBestMatches] = useState([]); // State for the search results
  const [selectedSymbol, setSelectedSymbol] = useState(null); // State for the selected symbol
  const dropdownRef = useRef(null); // Reference to the dropdown element

  useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener("click", handleOutsideClick);
    return () => {
      // Clean up event listener when component unmounts
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    // Automatically select exact match if found
    if (selectedSymbol && bestMatches.length > 0) {
      const exactMatch = bestMatches.find(
        (match) => match.symbol === selectedSymbol
      );
      if (exactMatch) {
        setInput(exactMatch.symbol);
      }
    }
  }, [selectedSymbol, bestMatches]);

  const handleOutsideClick = (event) => {
    // Handle click outside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      clear(); // Clear input and best matches to close the dropdown
    }
  };

  const updateBestMatches = async () => {
    try {
      if (input) {
        const searchResults = await searchSymbol(input);
        const result = searchResults.result.slice(0, 5); // Get only the top 5 results
        setBestMatches(result);
        setSelectedSymbol(null); // Reset selected symbol
      }
    } catch (error) {
      setBestMatches([]);
      console.log(error);
    }
  };

  const clear = () => {
    setInput(""); // Clear the input value
    setBestMatches([]); // Clear the search results
    setSelectedSymbol(null); // Reset selected symbol
  };

  const handleSelectSymbol = (symbol) => {
    setSelectedSymbol(symbol);
  };

  return (
    <div
      className={`flex items-center my-4 border-2 rounded-md relative z-50 w-96 ${
        darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"
      }`}
      ref={dropdownRef} // Assign the reference to the dropdown element
    >
      <input
        type="text"
        value={input}
        className={`w-full px-4 py-2 focus:outline-none rounded-md ${
          darkMode ? "bg-gray-900" : null
        }`}
        placeholder="Search stock..."
        onChange={(event) => setInput(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            updateBestMatches();
          }
        }}
      />
      {input && (
        <button onClick={clear} className="m-1">
          <XIcon className="h-4 w-4 fill-gray-500" />
        </button>
      )}
      <button
        onClick={updateBestMatches}
        className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 transition duration-300 hover:ring-2 ring-indigo-400"
      >
        <SearchIcon className="h-4 w-4 fill-gray-100" />
      </button>
      {input && bestMatches.length > 0 ? (
        <SearchResults
          results={bestMatches}
          onSelectSymbol={handleSelectSymbol}
        />
      ) : null}
    </div>
  );
};

export default Search;
