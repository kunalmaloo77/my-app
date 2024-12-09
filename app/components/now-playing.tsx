"use client";
import Image from "next/image";
import { usePlayer } from "../utils/context/player-context";
import { FaPause, FaPlay } from "react-icons/fa6";
import {
  FaRandom,
  FaRedo,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";

export const NowPlaying = () => {
  const {
    currentSong,
    isPlaying,
    pauseSong,
    resumeSong,
    nextSong,
    prevSong,
    progress,
    duration,
    resetSong,
    seek,
  } = usePlayer();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  if (!currentSong) {
    return <div className="text-white p-4">No song is playing</div>;
  }

  const progressPercentage = (progress / duration) * 100;

  const handleProgressClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    const newProgress = (clickX / rect.width) * duration;

    seek(newProgress);
  };

  return (
    <div className="bg-[#800000] text-white rounded-lg p-4 shadow-lg">
      {/* Header */}
      <h3 className="text-lg font-semibold mb-4 text-center">Now Playing</h3>
      <Image
        src={currentSong.image}
        alt={currentSong.title}
        layout="responsive"
        width={16}
        height={9}
        className="hidden lg:flex rounded-lg" // Aspect ratio 16:9
      />

      {/* Song Details */}
      <div className="text-center mb-4">
        <p className="text-xl font-bold">{currentSong.title}</p>
        <p className="text-sm text-gray-300">{currentSong.artist}</p>
      </div>

      {/* Progress Bar */}
      <div>
        <div
          className="relative w-full h-1 bg-gray-500 rounded-full"
          onClick={handleProgressClick}
          onMouseDown={() => {}}
          onMouseMove={() => {}}
          onMouseUp={() => {}}
          onMouseLeave={() => {}}
        >
          <div
            className="absolute top-0 left-0 h-full bg-white rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-300 mt-2">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between text-lg">
        <button className="hover:text-gray-200" onClick={resetSong}>
          <FaRedo />
        </button>
        <button className="hover:text-gray-200">
          <FaStepBackward onClick={prevSong} />
        </button>
        <button
          className="bg-[#E50914] p-4 rounded-full hover:scale-110 transition-transform"
          onClick={isPlaying ? pauseSong : resumeSong}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="hover:text-gray-200">
          <FaStepForward onClick={nextSong} />
        </button>
        <button className="hover:text-gray-200" disabled={true}>
          <FaRandom />
        </button>
      </div>
    </div>
  );
};
