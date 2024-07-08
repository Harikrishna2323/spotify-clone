"use client";

import { useRouter } from "next/navigation";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";

import { Auth } from "@supabase/auth-ui-react";

import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useTheme } from "next-themes";
import { useAuthModal } from "@/hooks/use-auth-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";

export const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const session = useSessionContext();
  const { resolvedTheme } = useTheme();
  const authModal = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      authModal.onClose();
    }
  }, [session, router]);

  // CLOSE MODAL AFTER SUCCESS

  return (
    <Dialog open={authModal.isOpen} onOpenChange={authModal.onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome ro Lyricz</DialogTitle>
          <DialogDescription>Liten to your favourite songs.</DialogDescription>
        </DialogHeader>

        <Auth
          supabaseClient={supabaseClient}
          magicLink
          theme={resolvedTheme === "dark" ? "dark" : "light"}
          providers={["google"]}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#404040",
                  brandAccent: "#22c55e",
                },
              },
            },
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
