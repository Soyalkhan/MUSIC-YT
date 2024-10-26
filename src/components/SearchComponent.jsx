// src/components/SearchComponent.jsx
import React, { useState, useEffect } from "react";
import { fetchMusicData } from "../services/jioSaavnService"; // Import the service

const SearchComponent = ({ isVisible, onClose }) => {
  const [query, setQuery] = useState(''); // State for the search query
  const [results, setResults] = useState([]); // State for search results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 const handleSearch = async () => {
    if (query) {
        setLoading(true);
        try {
            const data = await fetchMusicData(query, 30); // Fetch up to 30 results
            setResults(data);
        } catch (err) {
            setError('Error fetching music data'); // Set error state
        } finally {
            setLoading(false);
        }
    } else {
        setResults([]);
    }
};

  useEffect(() => {
    const debounceTimeout = setTimeout(() => handleSearch(), 300); // Debounce for better UX
    return () => clearTimeout(debounceTimeout); // Cleanup timeout on unmount
  }, [query]);

  const handleSelectSong = (song) => {
    localStorage.setItem('selectedSong', JSON.stringify(song)); // Save the selected song in local storage
    console.log("Saved song:", song); // Log the saved song (optional)
    // Optionally, you can also call onClose here to close the search when a song is selected
    onClose(); 
  };
 
{error && <p className="text-red-500">{error}</p>}

  return (
   // In the return statement
// {loading && <p>Loading...</p>}
// {error && <p className="text-red-500">{error}</p>}
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
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query
          className="w-full p-3 mb-4 bg-transparent border border-transparent text-white placeholder-gray-400 rounded focus:outline-none"
          style={{ caretColor: 'white' }} // Set caret color to white for visibility
        />
        <div className="mt-4 overflow-y-auto max-h-[80vh]"> {/* Enable scrolling if there are many results */}
          {/* Display search results */}
          {results.length > 0 ? (
            results.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center mb-4 text-white cursor-pointer" 
                onClick={() => handleSelectSong(item)} // Handle song selection
              >
                <img src={item.image} alt={item.title} className="w-16 h-16 mr-4 rounded" /> {/* Thumbnail image */}
                <div>
                  <p className="font-bold">{item.title}</p> {/* Song title */}
                  <p className="text-gray-400">{item.more_info.singers}</p> {/* Artist name */}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No results found.</p> // Message when no results
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
