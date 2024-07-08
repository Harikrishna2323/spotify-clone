import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { SideBar } from "./_components/sidebar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import SupabaseProvider from "@/components/providers/SupabaseProvider";
import UserProvider from "@/components/providers/user-provider";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/providers/modal-provider";
import { getSongsByUserId } from "@/actions/getSongsByUserId";
import { Player } from "./_components/player";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen To music!",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider />
              <SideBar songs={userSongs}>{children}</SideBar>
              <Player />
            </UserProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
