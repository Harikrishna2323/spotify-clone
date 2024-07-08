import Image from "next/image";
import { Header } from "../_components/header";
import { useRouter } from "next/navigation";
import { ListItem } from "../_components/list-item";
import { getSongs } from "@/actions/getSongs";
import { PageContent } from "./_components/page-content";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  return (
    <div className=" bg-neutral-200 dark:bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow -y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-primary dark:text-white text-3xl font-semibold">
            Welcome back
          </h1>
          <div className="bg-none border-none">
            <ListItem image="/liked.jpg" name="Liked Songs" href="/liked" />
          </div>
        </div>
      </Header>

      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className=" text-2xl font-semibold">Newest songs</h1>
        </div>
      </div>
      <PageContent songs={songs} />
    </div>
  );
}
