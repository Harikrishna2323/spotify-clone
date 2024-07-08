"use client";

import * as React from "react";
import { Moon, MoonIcon, Sun, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";

export function ModeToggle() {
  const { setTheme } = useTheme();

  const [isMounted, setIsMounted] = React.useState(false);

  const { resolvedTheme } = useTheme();

  console.log({ resolvedTheme });

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <ModeToggle.Skeleton />;

  return (
    <div className="flex items-center space-x-2" role="button">
      <Switch
        checked={resolvedTheme === "dark"}
        onClick={() => {
          resolvedTheme === "dark" ? setTheme("light") : setTheme("dark");
        }}
        id="theme"
      />
      <Label>{resolvedTheme === "dark" ? <MoonIcon /> : <SunIcon />}</Label>
    </div>
  );
}

ModeToggle.Skeleton = function ModeToggleSkeleton() {
  return (
    <div className="w-full h-6 flex items-center space-x-4">
      <Skeleton className="h-auto w-8 rounded-md" />
      <Skeleton className="w-4 rounded-full" />
    </div>
  );
};

// const ClassicModeToggle = () => {
//   const { setTheme } = useTheme();
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="icon">
//           <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//           <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme("light")}>
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")}>
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };
