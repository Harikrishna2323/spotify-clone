"use client";

import { Song } from "@/types";
import { SongItem } from "./song-item";

interface PageContentProps {
  songs: Song[];
}

export const PageContent = ({ songs }: PageContentProps) => {
  if (songs?.length === 0) {
    return <div className="mt-4">No songs available</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4 ml-4">
      {songs.map((song) => (
        <SongItem key={song.id} data={song} onClick={() => {}} />
      ))}
    </div>
  );
};
