// src/components/SearchComponent.jsx
import React, { useState, useEffect } from "react";
import { fetchMusicData } from "../services/youtubeService"; // Import the service

const SearchComponent = ({ isVisible, onClose }) => {
  const [isActive, setIsActive] = useState(false); // State to manage active input
  const [query, setQuery] = useState(''); // State for the search query
  const [results, setResults] = useState([]); // State for search results

  const handleSearch = async () => {
    if (query) {
      const data = await fetchMusicData(query); // Fetch data based on the query
      setResults(data);
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch(); // Fetch results when the query changes
    }
  }, [query]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-40 transition-transform duration-300 
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="bg-gray-900 p-6 rounded-lg w-full h-full flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-xl"
        >
          &times; {/* Close icon */}
        </button>
        <h2 className="text-3xl font-bold mb-4">Search Music</h2>
        <input
          type="text"
          placeholder="Search for songs, artists, albums..."
          onFocus={() => setIsActive(true)} // Set active on focus
          onBlur={() => setIsActive(false)} // Reset active on blur
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query
          className={`w-full p-3 mb-4 bg-transparent border border-transparent text-white placeholder-gray-400 rounded focus:outline-none 
            ${isActive ? "text-2xl font-bold" : "text-lg"}`} // Change font size and weight when active
          style={{ caretColor: 'white' }} // Set caret color to white for visibility
        />
        <div className="mt-4">
          {/* Display search results */}
          {results.map((item) => (
            <p key={item.id.videoId} className="text-white">
              {item.snippet.title}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
