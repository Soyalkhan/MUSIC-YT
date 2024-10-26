// src/components/MusicPlayer.jsx
import React, { useState, useEffect , useRef} from "react";
import { FaHeart, FaBackward, FaPlay, FaForward, FaInfinity } from "react-icons/fa";

const MusicPlayer = ({ isVisible, onClose }) => {
    const [isPlaying, setIsPlaying] = useState(false); // State to manage play/pause
    const [currentSong, setCurrentSong] = useState(null); // State to store current song
    const [currentTime, setCurrentTime] = useState(0); // Current playback time
    const [duration, setDuration] = useState(0); // Duration of the song



    const audioRef = useRef(null); // Create a ref for the audio element

useEffect(() => {
    if (currentSong) {
        audioRef.current.src = currentSong.more_info.vlink; // Assuming your song object has an audio URL
        audioRef.current.play(); // Play the song when selected
    }
}, [currentSong]);

useEffect(() => {
    if (isPlaying) {
        audioRef.current.play(); // Play audio when isPlaying is true
    } else {
        audioRef.current.pause(); // Pause audio when isPlaying is false
    }
}, [isPlaying]);


    useEffect(() => {
        const storedSong = JSON.parse(localStorage.getItem('selectedSong')); // Get the selected song from local storage
        if (storedSong) {
            setCurrentSong(storedSong); // Set current song if available
            setDuration(700); // Set a fixed duration for demonstration (7:07 = 427 seconds)
        }
    }, [isVisible]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying); // Toggle play/pause
    };

    useEffect(() => {
        let timer;
        if (isPlaying) {
            timer = setInterval(() => {
                setCurrentTime((prevTime) => Math.min(prevTime + 1, duration)); // Increment current time
            }, 1000); // Update every second
        }
        return () => clearInterval(timer); // Cleanup timer on unmount or pause
    }, [isPlaying, duration]);

    return (
        <div
            className={`bg-gray-900 text-white p-6 flex flex-col items-center transition-transform duration-300 ${isVisible ? "translate-y-0" : "translate-y-full"
                }`}
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
                zIndex: 50,
            }}
        >
            <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-4 right-4 text-white text-xl">&times;</button>

            {/* Album Cover */}
            {currentSong && (
                <div className="mb-4 w-full mt-16">
                    <img
                        src={currentSong.image} // Use image URL from the selected song
                        alt={currentSong.title} // Use title from the selected song for accessibility
                        className="w-full h-auto rounded-lg"
                    />
                </div>
            )}

            {/* Song Information */}
            {currentSong && (
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-bold mt-16">{currentSong.title}</h1>
                    <p className="text-lg text-gray-400 mt-4">{currentSong.more_info.singers}</p>
                </div>
            )}

            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-600 mb-2 mt-8">
                <div className="bg-white h-1" style={{ width: `${(currentTime / duration) * 100}%` }}></div> {/* Progress */}
            </div>

            {/* Time */}
            <div className="flex justify-between w-full text-sm text-gray-400 mb-4 mt-4">
                <span>{`${Math.floor(currentTime / 60)}:${String(currentTime % 60).padStart(2, '0')}`}</span>
                <span>{`${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}`}</span>
            </div>

            {/* Player Controls */}
            <div className="flex justify-center items-center space-x-10 mt-14">
              
                <button className="text-2xl">
                    <FaBackward />
                </button>
                <button className="text-white h-800 p-3 rounded-full" onClick={handlePlayPause}>
                    {isPlaying ? <FaInfinity className="text-xl" /> : <FaPlay className="text-xl" />}
                </button>
                <button className="text-2xl">
                    <FaForward />
                </button>
            </div>

            {/* Playlist Icon */}
            {/* <div className="mt-4">
                <FaList className="text-lg" />
            </div> */}
        </div>
    );
};

export default MusicPlayer;
