import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { FC, useEffect, useState } from 'react';

interface SearchProps {
  onFilter: (searchText: string) => void;
}

const Search: FC<SearchProps> = ({ onFilter }) => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    onFilter(searchText);
  }, [searchText, onFilter]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onFilter(searchText);
  };

  return (
    <div className="w-full main flex flex-col ">
      <form
        onSubmit={handleSearch}
        className="relative justify-between flex items-center text-slate-600 text-sm font-normal  cursor-pointer shadow-full"
      >
        <MagnifyingGlassIcon className="absolute left-5 block h-5 w-5 text-slate-400" />
        <input
          type="name"
          name="search"
          className="h-10 w-full border rounded-full overflow-hidden select-none py-4 pr-4 pl-12 outline-none focus:ring-1 focus:ring-orange-300"
          placeholder="Поиск"
          value={searchText}
          autoComplete="off"
          onChange={(event) => setSearchText(event.target.value)}
        />
      </form>
    </div>
  );
};

export default Search;
