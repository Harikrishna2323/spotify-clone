"use client";

import { useAuthModal } from "@/hooks/use-auth-modal";
import { useUploadModal } from "@/hooks/use-upload-modal";
import { useUser } from "@/hooks/use-user";
import { Song } from "@/types";
import { ListMusic, LucidePlusCircle } from "lucide-react";
import { MediaItem } from "./media-item";

interface LibraryProps {
  songs: Song[];
}
export const Library = ({ songs }: LibraryProps) => {
  const { user } = useUser();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    // Check for subscription
    return uploadModal.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <ListMusic />
          <p className="font-medium text-md">Your Library</p>
        </div>

        <LucidePlusCircle
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>

      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((song) => {
          return <MediaItem key={song.id} data={song} onClick={() => {}} />;
        })}
      </div>
    </div>
  );
};
