"use client";

import { MediaItem } from "@/app/_components/media-item";
import { Song } from "@/types";
import { LikeButton } from "./like-button";
import { useOnPlay } from "@/hooks/use-onplay";

interface SearchContentProps {
  songs: Song[];
}

export const SearchContent = ({ songs }: SearchContentProps) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 dark:text-neutral-400">
        No songs found
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full px-5">
      {songs.map((song) => {
        return (
          <div key={song.id} className="flex items-center gap-x-4 w-full">
            <div className="flex-1">
              <MediaItem data={song} onClick={(id: string) => onPlay(id)} />
            </div>
            <LikeButton songId={song.id} />
          </div>
        );
      })}
    </div>
  );
};
