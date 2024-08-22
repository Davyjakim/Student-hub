import React, { useState, useRef } from "react";

import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
const AudioPlayer = ({ src, timestap, isAudSent, duration, isReviewing }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSliderChange = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="h-full w-full">
      <div
        className={`w-full rounded-none p-1.5 bg-gray-800 text-white ${
          isReviewing && "rounded-none h-full"
        }  ${
          !isAudSent&&!isReviewing
            && "rounded-r-2xl h-max rounded-t-2xl  shadow "
        } 
        ${isAudSent&&!isReviewing&&"rounded-t-2xl rounded-l-2xl shadow"} shadow-md`}
      >
        <audio ref={audioRef} src={src} onTimeUpdate={onTimeUpdate}></audio>
        <div className="flex items-center justify-between ">
          <button
            onClick={togglePlayPause}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
          >
            {isPlaying ? (
              <FaPauseCircle className="min-w-3 font-extrabold min-h-5" />
            ) : (
              <FaPlayCircle className="min-w-3 min-h-5" />
            )}
          </button>
          <div className="flex-grow mx-4">
            <input
              type="range"
              min="0"
              max={Math.round(duration)}
              value={currentTime}
              onChange={handleSliderChange}
              className="w-full h-1 bg-blue-500 rounded-full cursor-pointer"
            />
            <div className="text-xs text-gray-400 flex justify-between">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
      {!isReviewing && <div className={` sm:text-[10px] md:text-sm  ${!isAudSent?"text-start":"text-end"}`}>{timestap}</div>}
    </div>
  );
};

export default AudioPlayer;
