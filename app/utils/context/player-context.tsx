"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Howl } from "howler";

interface Song {
  id: number;
  title: string;
  plays: string;
  time: string;
  album: string;
  image: string;
  src: string;
  artist: string;
}

interface PlayerContextProps {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  playSong: (song: Song) => void;
  pauseSong: () => void;
  resumeSong: () => void;
  songs: Song[];
  nextSong: () => void;
  prevSong: () => void;
  seek: (position: number) => void;
  resetSong: () => void;
  updateSongList: (newSongList: Song[]) => void;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const songs = [
    {
      id: 0,
      title: "Billie Jean",
      plays: "1,040,811,084",
      time: "4:53",
      album: "Thriller",
      image: "/images/billy-jean.jpg",
      src: "music/01-Billie Jean.mp3",
      artist: "Michael Jackson",
    },
    {
      id: 1,
      title: "Beat It",
      plays: "643,786,045",
      time: "4:58",
      album: "Thriller",
      image: "/images/beat-it.jpeg",
      src: "/music/Michael_Jackson_-_Beat_It.mp3",
      artist: "Michael Jackson",
    },
    {
      id: 2,
      title: "Smooth Criminal",
      plays: "407,234,004",
      time: "4:17",
      album: "Bad",
      image: "/images/smooth-criminal.jpeg",
      src: "/music/Michael Jackson - Smooth Criminal Lyrics.mp3",
      artist: "Michael Jackson",
    },
    {
      id: 3,
      title: "Rock with you",
      plays: "604,402,934",
      time: "4:13",
      album: "Bad",
      image: "/images/rock with you.jpeg",
      src: "/music/Michael Jackson - Rock With You (44.1kHz 16-bit).mp3",
      artist: "Michael Jackson",
    },
  ];

  const howlRef = useRef<Howl | null>(null);
  const currentSongRef = useRef<Song | null>(null);
  const [songList, setSongList] = useState<Song[]>(songs);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const updateProgress = () => {
    const currentHowl = howlRef.current;
    if (currentHowl && currentHowl.playing()) {
      setProgress(currentHowl.seek() as number);
      setDuration(currentHowl.duration());
    }
  };

  const playSong = (song: Song) => {
    if (howlRef.current) {
      howlRef.current.stop();
      clearInterval(progressInterval.current!);
    }

    const newHowl = new Howl({
      src: [song.src],
      html5: true,
    });

    setProgress(0);
    setDuration(0);
    currentSongRef.current = song;

    newHowl.on("load", () => {
      setDuration(newHowl.duration());
    });

    newHowl.on("play", () => {
      setIsPlaying(true);
      progressInterval.current = setInterval(updateProgress, 500);
    });

    newHowl.on("end", () => {
      console.log("Current song ended");
      setIsPlaying(false);
      setProgress(0);
      clearInterval(progressInterval.current!);
      const currentIndex = songList.findIndex(
        (song) => song.src === currentSongRef.current?.src
      );
      const nextIndex = (currentIndex + 1) % songs.length;
      playSong(songList[nextIndex]);
    });

    newHowl.on("playerror", (error) => {
      console.error("Error during playback:", error);
    });

    howlRef.current = newHowl;

    newHowl.play();
  };

  const pauseSong = () => {
    const currentHowl = howlRef.current;
    if (currentHowl) {
      currentHowl.pause();
      setIsPlaying(false);
      clearInterval(progressInterval.current!);
    }
  };

  const resumeSong = () => {
    const currentHowl = howlRef.current;
    if (currentHowl) {
      currentHowl.play();
      setIsPlaying(true);
      progressInterval.current = setInterval(updateProgress, 500);
    }
  };

  const seek = (position: number) => {
    const currentHowl = howlRef.current;
    if (currentHowl) {
      currentHowl.seek(position);
      setProgress(position);
    }
  };

  const nextSong = () => {
    if (currentSongRef.current) {
      const currentIndex = songList.findIndex(
        (song) => song.src === currentSongRef.current?.src
      );
      const nextIndex = (currentIndex + 1) % songList.length;
      playSong(songList[nextIndex]);
    }
  };

  const prevSong = () => {
    if (currentSongRef.current) {
      const currentIndex = songList.findIndex(
        (song) => song.src === currentSongRef.current?.src
      );
      const prevIndex = (currentIndex - 1 + songList.length) % songList.length;
      playSong(songList[prevIndex]);
    }
  };

  const updateSongList = (newSongList: Song[]) => {
    setSongList(newSongList);
  };

  const resetSong = () => {
    const currentHowl = howlRef.current;
    if (currentHowl) {
      currentHowl.seek(0);
      setProgress(0);
      currentHowl.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        currentSong: currentSongRef.current,
        isPlaying,
        playSong,
        pauseSong,
        resumeSong,
        songs,
        nextSong,
        prevSong,
        progress,
        duration,
        seek,
        updateSongList,
        resetSong,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
