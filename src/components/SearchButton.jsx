// src/components/SearchButton.jsx
import { Search } from "lucide-react";

const SearchButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-16 right-4 bg-gray-800 p-2 rounded-lg z-10 mb-6" // Positioned above the controls bar
    >
      <Search className="w-12 h-7 text-white" />
    </button>
  );
};

export default SearchButton;
