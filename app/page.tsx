"use client";
import { ArtistBanner } from "./components/artist-banner";
import { SongList } from "./components/songlist";
import { usePlayer } from "./utils/context/player-context";

const HomePage = () => {
  // Example mock data
  const artist = {
    name: "Michael Jackson",
    image: "/images/michael-jackson.png",
    monthlyListeners: "27,852,501",
  };
  const { songs } = usePlayer();

  return (
    <div>
      {/* Artist Banner */}
      <div className="rounded-3xl">
        <ArtistBanner artist={artist} />
      </div>

      {/* Song List */}
      <div className="mt-6">
        <SongList songs={songs} />
      </div>
    </div>
  );
};

export default HomePage;
