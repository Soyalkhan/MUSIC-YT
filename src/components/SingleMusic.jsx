// src/components/MusicPlayer.jsx
import React from "react";
import { FaHeart, FaBackward, FaPlay, FaForward, FaInfinity } from "react-icons/fa";

const MusicPlayer = ({ isVisible, onClose }) => {
  return (
    <div
      className={`bg-gray-900 text-white p-6 flex flex-col items-center transition-transform duration-300 ${
        isVisible ? "translate-x-0" : "-translate-x-full" // Slide out to the left when not visible
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
      {/* Close Button */}
      <button
        onClick={onClose} // Call the onClose function passed from the parent
        className="absolute top-4 right-4 text-white text-xl"
      >
        &times; {/* Close icon */}
      </button>

      {/* Album Cover */}
      <div className="mb-4 w-full mt-16">
        <img
          src="https://via.placeholder.com/150" // Replace with your image URL
          alt="Kabhi Khushi Kabhi Gham"
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Song Information */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold mt-16">Suraj Hua Maddham</h1>
        <p className="text-lg text-gray-400 mt-4">Sandesh Shandilya</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-600 mb-2 mt-8">
        <div className="bg-white h-1 w-1/4"></div> {/* Progress */}
      </div>

      {/* Time */}
      <div className="flex justify-between w-full text-sm text-gray-400 mb-4 mt-4">
        <span>0:00</span>
        <span>7:07</span>
      </div>

      {/* Player Controls */}
      <div className="flex justify-center items-center space-x-10 mt-14">
        <button className="text-2xl">
          <FaHeart className="text-red-600" />
        </button>
        <button className="text-2xl">
          <FaBackward />
        </button>
        <button className="text-white h-800 p-3 rounded-full">
          <FaPlay className="text-xl" />
        </button>
        <button className="text-2xl">
          <FaForward />
        </button>
        <button className="text-2xl">
          <FaInfinity />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
