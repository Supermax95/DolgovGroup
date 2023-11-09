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
    <input
      type="text"
      className="rounded-lg text-sm px-2 py-1.5 w-full mb-4"
      placeholder="Поиск"
      value={searchText}
      onChange={(event) => setSearchText(event.target.value)}
    />
  );
};

export default Search;
