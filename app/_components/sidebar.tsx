"use client";

import { usePathname } from "next/navigation";
import { Suspense, useMemo } from "react";
import { Home, Search } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { Box } from "./box";
import { ModeToggle } from "@/components/toggle-theme";
import { Library } from "./library";
import { Song } from "@/types";
import { usePlayer } from "@/hooks/use-player";
import { cn } from "@/lib/utils";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

export const SideBar = ({ children, songs }: SidebarProps) => {
  const pathname = usePathname();
  const player = usePlayer();

  const routes = useMemo(
    () => [
      {
        label: "Home",
        active: pathname !== "/search",
        href: "/",
        icon: <Home className="mr-2" />,
      },
      {
        label: "Search",
        active: pathname === "/search",
        href: "/search",
        icon: <Search className="mr-2" />,
      },
    ],
    [pathname]
  );

  return (
    <div
      className={cn(`flex h-full`, player.activeId && "h-[calc(100%-80px)]")}
    >
      <div className="hidden md:flex flex-col gap-y-2  h-full w-[300px] p-2">
        <div className="mx-auto ">
          <Suspense fallback={<ModeToggle.Skeleton />}>
            <ModeToggle />
          </Suspense>
        </div>

        <Box>
          <div className="flex flex-col gap-y-3 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>

        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};
