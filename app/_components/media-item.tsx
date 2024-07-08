import { useLoadImage } from "@/hooks/use-load-image";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
  data: Song;
  onClick: (id: string) => void;
}

export const MediaItem = ({ data, onClick }: MediaItemProps) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    // TODO :default turn on player
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer 
        w-full p-2 rounded-md dark:hover:bg-neutral-800/50 hover:bg-gray-500/50"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image fill src={imageUrl!} alt="media item" className="object-cover" />
      </div>

      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="truncate">{data.title}</p>
        <p className="dark:text-neutral-400 text-primary text-sm truncate">
          {data.author}
        </p>
      </div>
    </div>
  );
};
