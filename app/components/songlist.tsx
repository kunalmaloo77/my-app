"use client";

import Image from "next/image";
import { usePlayer } from "../utils/context/player-context";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import { FaMusic } from "react-icons/fa6"; // Import CSS module for animations

type Song = {
  id: number;
  title: string;
  plays: string;
  time: string;
  album: string;
  image: string;
  src: string;
  artist: string;
};

interface DraggableSongProps {
  song: Song;
  index: number;
  moveSong: (from: number, to: number) => void;
  handleSongClick: (song: Song) => void;
  isPlaying: boolean;
  currentSong: Song | null;
}

const DraggableSong = ({
  song,
  index,
  moveSong,
  handleSongClick,
  currentSong,
}: DraggableSongProps) => {
  const [, dragRef] = useDrag({
    type: "SONG",
    item: { index },
  });

  const [, dropRef] = useDrop({
    accept: "SONG",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveSong(draggedItem.index, index);
        draggedItem.index = index; // Update index after moving
      }
    },
  });

  return (
    <tr
      ref={(node) => {
        if (node) {
          dragRef(dropRef(node));
        }
      }}
      className={`draggableRow hover:bg-[#330000] ${
        currentSong?.src === song.src ? "bg-[#520000]" : ""
      }`}
    >
      <td className="p-4">
        <button onClick={() => handleSongClick(song)}>
          {currentSong?.src === song.src ? <FaMusic /> : index + 1}
        </button>
      </td>
      <td>
        <Image src={song.image} alt="song-image" height={40} width={40} />
      </td>
      <td>{song.title}</td>
      <td>{song.plays}</td>
      <td>{song.time}</td>
      <td>{song.album}</td>
    </tr>
  );
};

export const SongList = ({ songs }: { songs: Song[] }) => {
  const { currentSong, isPlaying, playSong, pauseSong, updateSongList } =
    usePlayer();
  const [songList, setSongList] = useState(songs);

  const handleSongClick = (song: Song) => {
    if (currentSong?.src === song.src && isPlaying) {
      pauseSong();
    } else {
      playSong(song);
    }
  };

  const moveSong = (from: number, to: number) => {
    const updatedSongs = [...songList];
    const [movedSong] = updatedSongs.splice(from, 1);
    updatedSongs.splice(to, 0, movedSong);
    setSongList(updatedSongs);
    updateSongList(updatedSongs);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {/* Wrapper for scrollable table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left rounded min-w-[600px]">
          <thead>
            <tr>
              <th className="p-4">#</th>
              <th></th>
              <th>Title</th>
              <th>Plays</th>
              <th>Time</th>
              <th>Album</th>
            </tr>
          </thead>
          <tbody>
            {songList.map((song, index) => (
              <DraggableSong
                key={song.id}
                song={song}
                index={index}
                moveSong={moveSong}
                handleSongClick={handleSongClick}
                isPlaying={isPlaying}
                currentSong={currentSong}
              />
            ))}
          </tbody>
        </table>
      </div>
    </DndProvider>
  );
};
