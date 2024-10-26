import { useState, useEffect } from "react";
import { Settings, Heart, MoreHorizontal, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import SearchButton from "./SearchButton"; // Import the SearchButton component
import MusicPlayer from "./SingleMusic"; // Import the MusicPlayer component
import SearchComponent from "./SearchComponent";
import honeysignh from "../assets/honey singh.jpeg";
import arrehman from "../assets/ar rehman.jpeg";
import pritam from "../assets/pritam.jpeg";
import nehakakkar from "../assets/nehakakkar.jpeg";
import nusrat from "../assets/nusrat.jpeg";
import b1 from "../assets/b1.jpeg";
import b2 from "../assets/b2.jpeg";
import b3 from "../assets/b3.jpeg";
import b4 from "../assets/b4.jpeg";
import b5 from "../assets/b5.jpeg";

export default function Home() {
  const [activeTab, setActiveTab] = useState("quick-picks");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSong, setCurrentSong] = useState({}); // Current song details

  const quickPicks = [
    { title: "Millionaire", artist: "Honey Singh", image: honeysignh },
    { title: "Naina(Dangal)", artist: "Pritam", image: pritam },
    { title: "Gaadi Kaali Song", artist: "Neha Kakkar", image: nehakakkar },
    { title: "Kun faya Kun", artist: "AR Rahman", image: arrehman },
    { title: "Yeh Jo Halka Halka", artist: "Nusrat Fateh Ali Khan", image: nusrat },
  ];

  const relatedAlbums = [
    { title: "Swatantrya V...", year: "2024", image: b1 },
    { title: "Oye Mamu!", year: "2021", image: b2 },
    { title: "Oye Mamu!", year: "2021", image: b3 },
    { title: "Oye Mamu!", year: "2021", image: b4 },
    { title: "Oye Mamu!", year: "2021", image: b5 },
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const truncateTitle = (title) => {
    return title && title.length > 8 ? title.slice(0, 8) + "..." : title || "No Title"; // Updated function
  };

  const handleSelectSong = (song) => {
    setCurrentSong(song); // Set the selected song
    setShowPlayer(true);
    setIsPlaying(true);
    setProgress(0); // Reset progress when a new song is played
  };
  useEffect(() => {
    // Retrieve the song from local storage when the component mounts
    const storedSong = localStorage.getItem("selectedSong");
    // console.log(storedSong);
    
    if (storedSong) {
      setCurrentSong(JSON.parse(storedSong)); // Set current song from local storage
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 100 : prev + 1)); // Simulate progress increment
      }, 100); // Increment progress every 100ms
    }
    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [isPlaying]);

  return (
    <div className="bg-black text-white min-h-screen font-sans relative">
      <header className="flex justify-between items-center p-4">
        <Settings className="w-6 h-6" />
        <h1 className="text-2xl font-bold">MUSIz</h1>
      </header>

      <main className="p-4 pt-20">
        <div className="flex space-x-2 mb-6">
          <button onClick={() => setActiveTab("quick-picks")} className={`text-xs px-4 py-2 rounded ${activeTab === "quick-picks" ? "bg-gray-700" : "bg-transparent"}`}>
            Quick Picks
          </button>
          <button onClick={() => setActiveTab("songs")} className={`text-xs px-4 py-2 rounded ${activeTab === "songs" ? "bg-gray-700" : "bg-transparent"}`}>
            Songs
          </button>
          <button onClick={() => setActiveTab("playlists")} className={`text-xs px-4 py-2 rounded ${activeTab === "playlists" ? "bg-gray-700" : "bg-transparent"}`}>
            Playlists
          </button>
        </div>

        {activeTab === "quick-picks" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Quick Picks</h2>
            <div className="overflow-y-auto h-80">
              {quickPicks.map((pick, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4 cursor-pointer" onClick={() => handleSelectSong(pick)}>
                  <img src={pick.image} alt={pick.title} className="w-12 h-12 object-cover" />
                  <div>
                    <p className="font-semibold">{pick.title}</p>
                    <p className="text-sm text-gray-400">{pick.artist}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">#Rank 1 Today</h2>
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

      <SearchButton onClick={() => setShowSearch(true)} />

      {/* Seek bar above bottom navigation */}
      <div className="fixed bottom-16 left-0 right-0 bg-gray-800">
        <div className="h-3 bg-green-500 rounded" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 flex justify-between items-center" onClick={() => setShowPlayer(prev => !prev)}>
        <div className="flex items-center">
          {currentSong.image && (
            <img src={currentSong.image} alt="Song thumbnail" className="w-10 h-10 rounded mr-3" />
          )}
          <div>
            <p className="font-semibold">{truncateTitle(currentSong.title) || "No song selected"}</p>
            <p className="text-xs text-gray-400">{currentSong.artist || "Unknown Artist"}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-white" onClick={() => {/* Handle previous song */}}>
            <SkipBack className="w-6 h-6" />
          </button>
          <button className="text-white" onClick={togglePlay}>
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button className="text-white" onClick={() => {/* Handle next song */}}>
            <SkipForward className="w-6 h-6" />
          </button>
          <button className="text-white">
            <Heart className="w-6 h-6 text-red-500" />
          </button>
          <button className="text-white">
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Music Player */}
      <MusicPlayer isVisible={showPlayer} onClose={() => setShowPlayer(false)} currentSong={currentSong} />
      <SearchComponent isVisible={showSearch} onClose={() => setShowSearch(false)} onSelectSong={handleSelectSong} />
    </div>
  );
}
