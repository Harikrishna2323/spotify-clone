import { getSongsByTitle } from "@/actions/getSongsByTitle";
import { Header } from "../_components/header";
import { SearchInput } from "./_components/search-input";
import { SearchContent } from "./_components/search-content";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div className="dark:bg-neutral-900 bg-neutral-200 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb2 flex flex-col gap-y-6">
          <h1 className="dark:text-white text-3xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;
