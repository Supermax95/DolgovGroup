import { FC, useEffect, useState } from 'react';

interface SearchProps {
  onFilter: (searchText: string) => void;
}

const Search: FC<SearchProps> = ({ onFilter }) => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    onFilter(searchText);
  }, [searchText, onFilter]);

  return (
    <div className='w-full'>
      <form className="relative mx-auto flex w-full max-w-2xl items-center justify-between rounded-md border shadow-lg ">
        <svg
          className="absolute left-2 block h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="name"
          name="search"
          className="h-10 w-full rounded-md py-4 pr-4 pl-12 outline-none focus:ring-2"
          placeholder="Поиск"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </form>
    </div>
  );
};

export default Search;
