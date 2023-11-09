import { FC, ChangeEvent, useEffect, useState } from 'react';

interface SearchProps {
  users: User[];
  onFilter: (filteredUsers: User[]) => void;
}

const Search: FC<SearchProps> = ({ users, onFilter }) => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const filtered = users.filter((user) => {
      const fullName = `${user.lastName} ${user.firstName} ${user.middleName}`;
      const reversedFullName = `${user.firstName} ${user.lastName} ${user.middleName}`;
      const reversedFullName1 = `${user.middleName} ${user.lastName} ${user.firstName}`;
      const reversedFullName2 = `${user.middleName} ${user.firstName} ${user.lastName}`;
      return (
        searchText === '' ||
        fullName.toLowerCase().includes(searchText.toLowerCase()) ||
        reversedFullName.toLowerCase().includes(searchText.toLowerCase()) ||
        reversedFullName1
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        reversedFullName2.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    onFilter(filtered);
  }, [searchText, users, onFilter]);

  return (
    <div>
      <input
        type="text"
        className="rounded-lg text-sm px-2 py-1.5 w-full mb-4"
        placeholder="Поиск по фамилии, имени или отчеству"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
    </div>
  );
};

export default Search;
