"use client";

import { PlayButton } from "@/components/play-button";
import { useLoadImage } from "@/hooks/use-load-image";
import { Song } from "@/types";
import Image from "next/image";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

export const SongItem = ({ data, onClick }: SongItemProps) => {
  const imagePath = useLoadImage(data);

  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative group flex flex-col 
      items-center justify-center rounded-md 
      overflow-hidden gap-x-4 cursor-pointer transition p-3
       bg-neutral-400/5 hover:bg-neutral-400/10"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden ">
        <Image
          src={imagePath!}
          className="object-cover"
          alt="song-image"
          fill
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-sm dark:text-neutral-400 pb-4 truncate">
          By {data.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};
