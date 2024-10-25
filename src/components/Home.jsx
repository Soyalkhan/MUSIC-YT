// src/components/Home.jsx
import { useState } from "react";
import { Settings, Heart, MoreHorizontal, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import SearchButton from "./SearchButton"; // Import the SearchButton component
import MusicPlayer from "./SingleMusic"; // Import the MusicPlayer component
import SearchComponent from "./SearchComponent";
export default function Home() {
  // Tab state for managing active tabs
  const [activeTab, setActiveTab] = useState("quick-picks");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false); // State to control MusicPlayer visibility
  const [showSearch, setShowSearch] = useState(false);

  // Sample data
  const quickPicks = [
    { title: "Suraj Hua Maddham", artist: "Sandesh Shandilya", image: "/placeholder.svg" },
    { title: "Chalte Chalte (Part-2)", artist: "Shweta Pandit", image: "/placeholder.svg" },
  ];

  const relatedAlbums = [
    { title: "Swatantrya V...", year: "2024", image: "/placeholder.svg" },
    { title: "Oye Mamu!", year: "2021", image: "/placeholder.svg" },
  ];

  const currentSong = {
    title: "Suraj Hua Maddham",
    artist: "Sandesh Shandilya",
    thumbnail: "/placeholder.svg", // Update with actual thumbnail path
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  const handleSearchClick = () => {
    setShowSearch(true); // Show the SearchComponent
  };

  const handleCloseSearch = () => {
    setShowSearch(false); // Hide the SearchComponent
  };

  const handleTogglePlayer = () => {
    setShowPlayer((prev) => !prev); // Toggle MusicPlayer visibility
  };
  
  return (
    <div className="bg-black text-white min-h-screen font-sans relative">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <Settings className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Music App</h1>
      </header>

      {/* Main content */}
      <main className="p-4 pt-20"> {/* Added pt-20 to prevent content from being hidden */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab("quick-picks")}
            className={`text-xs px-4 py-2 rounded ${activeTab === "quick-picks" ? "bg-gray-700" : "bg-transparent"}`}
          >
            Quick Picks
          </button>
          <button
            onClick={() => setActiveTab("songs")}
            className={`text-xs px-4 py-2 rounded ${activeTab === "songs" ? "bg-gray-700" : "bg-transparent"}`}
          >
            Songs
          </button>
          <button
            onClick={() => setActiveTab("playlists")}
            className={`text-xs px-4 py-2 rounded ${activeTab === "playlists" ? "bg-gray-700" : "bg-transparent"}`}
          >
            Playlists
          </button>
        </div>

        {/* Tab content */}
        {activeTab === "quick-picks" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Quick Picks</h2>
            <div className="overflow-y-auto h-80">
              {quickPicks.map((pick, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4">
                  <img src={pick.image} alt={pick.title} className="w-12 h-12 object-cover" />
                  <div>
                    <p className="font-semibold">{pick.title}</p>
                    <p className="text-sm text-gray-400">{pick.artist}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Related Albums</h2>
            <div className="grid grid-cols-2 gap-4">
              {relatedAlbums.map((album, index) => (
                <div key={index} className="text-center">
                  <img src={album.image} alt={album.title} className="w-full object-cover rounded-md mb-2" />
                  <p className="font-semibold text-sm">{album.title}</p>
                  <p className="text-xs text-gray-400">{album.year}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "songs" && <p>Songs content</p>}
        {activeTab === "playlists" && <p>Playlists content</p>}
      </main>

      {/* Search Button */}
      <SearchButton onClick={handleSearchClick} />

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 flex justify-between items-center" onClick={handleTogglePlayer}>
        <div className="flex items-center">
          <img src={currentSong.thumbnail} alt="Song thumbnail" className="w-10 h-10 rounded mr-3" />
          <div>
            <p className="font-semibold">{currentSong.title}</p>
            <p className="text-xs text-gray-400">{currentSong.artist}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-white" onClick={() => {/* Handle previous song */}}>
            <SkipBack className="w-6 h-6" /> {/* Previous icon */}
          </button>
          <button className="text-white" onClick={togglePlay}>
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />} {/* Play/Pause button */}
          </button>
          <button className="text-white" onClick={() => {/* Handle next song */}}>
            <SkipForward className="w-6 h-6" /> {/* Next icon */}
          </button>
          <button className="text-white">
            <Heart className="w-6 h-6 text-red-500" /> {/* Heart icon for favorites */}
          </button>
          <button className="text-white">
            <MoreHorizontal className="w-6 h-6" /> {/* More options icon */}
          </button>
        </div>
      </nav>

      {/* Music Player */}
      <MusicPlayer isVisible={showPlayer} onClose={() => setShowPlayer(false)} />

       <SearchButton onClick={handleSearchClick} />
      <SearchComponent isVisible={showSearch} onClose={handleCloseSearch} />
      {/* Other components can go here */}
    </div>
  );
}
