"use client";

import { useGetSongById } from "@/hooks/use-get-song-by-id";
import { useLoadSongUrl } from "@/hooks/use-load-song-url";
import { usePlayer } from "@/hooks/use-player";
import { PlayerContent } from "./player-content";
import { Slider } from "@/components/ui/slider";

export const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-primary dark:bg-black w-full py-2 h-[80px] px-4">
      {/* PRO Functionality to seek music */}
      {/*<Slider /> */}
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};
