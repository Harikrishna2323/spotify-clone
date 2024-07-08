"use client";
import useSound from "use-sound";
import { Song } from "@/types";
import { MediaItem } from "./media-item";
import { LikeButton } from "../search/_components/like-button";
import {
  Pause,
  Play,
  StepBack,
  StepForward,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/hooks/use-player";
import { useEffect, useState } from "react";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

export const PlayerContent = ({ song, songUrl }: PlayerContentProps) => {
  const player = usePlayer();

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([1]);

  const icon = isPlaying ? (
    <Pause size={30} className="text-black" fill="black" />
  ) : (
    <Play size={30} className="text-black" fill="black" />
  );

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);

    const nextSong = player.ids[currentIndex + 1];

    // FUNC : {RESET}  v/s STOP PLAYING ?
    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrev = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);

    const prevSong = player.ids[currentIndex - 1];

    // Ply the last song
    if (!prevSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(prevSong);
  };

  {
    /* <Speaker /> */
  }

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume[0],
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onPause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
      setIsPlaying(true);
    } else {
      pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (volume[0] === 0) {
      setVolume([20]);
    } else {
      setVolume([0]);
    }
  };

  const volumeIcon =
    volume[0] === 0 ? (
      <VolumeX onClick={toggleMute} />
    ) : volume[0] < 50 ? (
      <Volume1 onClick={toggleMute} />
    ) : (
      <Volume2 onClick={toggleMute} />
    );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} onClick={() => {}} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className=" h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          {icon}
        </div>
      </div>

      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <StepBack
          onClick={onPlayPrev}
          size={30}
          className="dark:text-neutral-400 cursor-pointer dark:hover:text-white hover:text-neutral-400 transition"
        />

        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-[60px] w-[60px] rounded-full bg-white p-1 cursor-pointer"
        >
          {icon}
        </div>
        <StepForward
          onClick={onPlayNext}
          size={30}
          className="dark:text-neutral-400 cursor-pointer dark:hover:text-white hover:text-neutral-400 transition"
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]" onClick={() => {}}>
          {volumeIcon}
          <Slider
            //   ref={sliderRef} ??
            value={volume}
            onValueChange={(value) => {
              console.log({ value });
              setVolume(value);
            }}
            step={0.1}
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
};
