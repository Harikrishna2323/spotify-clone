"use client";

import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { useAuth, UserButton, UserProfile } from "@clerk/nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import {
  Home,
  LucideCircleArrowLeft,
  LucideCircleArrowRight,
  Search,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const Header = ({ children, className }: HeaderProps) => {
  const router = useRouter();
  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // RESET any playing songs in future
    router.refresh();

    if (error) {
      toast.error(error.message);
      console.log("logout error : ", error);
    }

    toast.success("Logged Out");
  };

  return (
    <div className={cn("h-fit bg-gradient-to-b from-emerald-800 p-6")}>
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <Button size="sm" variant="ghost" onClick={() => router.back()}>
            <LucideCircleArrowLeft
              size={35}
              className="hover:text-primary text-white"
            />
          </Button>

          <Button size="sm" variant="ghost" onClick={() => router.forward()}>
            <LucideCircleArrowRight
              size={35}
              className="hover:text-primary text-white"
            />
          </Button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <Button variant={"ghost"} className="hover:opacity-75 transition">
            <Home className="" size={20} />
          </Button>

          <Button variant={"ghost"} className="hover:opacity-75 transition">
            <Search className="" size={20} />
          </Button>
        </div>

        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} variant={"default"}>
                Logout
              </Button>

              <Button onClick={() => router.push}>
                <User />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button size="lg" variant={"ghost"} onClick={authModal.onOpen}>
                  <p className="font-semibold">Sign Up</p>
                </Button>
                <Button
                  size="lg"
                  variant={"default"}
                  className="rounded-full"
                  onClick={authModal.onOpen}
                >
                  <p className="font-semibold">Log In</p>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
