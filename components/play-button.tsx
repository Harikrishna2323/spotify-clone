import { Play } from "lucide-react";
import { Button } from "./ui/button";

export const PlayButton = () => {
  return (
    <div>
      <Button variant="ghost" size="sm">
        <div
          className="transition opacity-0 rounded-full flex items-center
         bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 
         group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110"
        >
          <Play />
        </div>
      </Button>
    </div>
  );
};
