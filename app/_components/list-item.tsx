"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle, Plus, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

export const ListItem = ({ image, name, href }: ListItemProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center  bg-trasparent rounded-md  gap-x-4 hover:bg-neutral-200/20 transition"
    >
      <div className="relative min-h-[200px] min-w-[200px] rounded-md">
        <Image
          src={image}
          className="object-cover p-4"
          alt="liked"
          width={200}
          height={200}
        />
        <div className="flex items-start flex-col gap-y-1 px-4">
          <p className="font-semibold ml-1 pb-2">{name}</p>
          <div className="absolute right-6 transition-all opacity-0 rounded-full bg-green-500 flex items-center p-2 drop-shadow-md bottom-12 group-hover:opacity-100 group-hover:bottom-14 hover:scale-110 ease-in-out duretion-500">
            <PlayCircle className="text-black" size={30} />
          </div>
        </div>
      </div>
    </button>
  );
};
