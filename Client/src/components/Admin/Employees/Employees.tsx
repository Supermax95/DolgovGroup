
import { FC, useEffect, useState } from 'react';
import Wrapper from '../../../ui/Wrapper';
import Sidebar from '../../../ui/Sidebar';
import Pagination from '../../../ui/Paggination';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import getEmployees from '../../../Redux/thunks/Users/getEmployee.api';
import Table from '../../../ui/Table';
import Search from '../../../ui/Search';

interface User {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  barcode: string;
  userStatus: string;
  isActivated: boolean;
}

interface IColumnsDefaultName {
  name: string;
}

type IColumnsListDb =
  | 'id'
  | 'lastName'
  | 'firstName'
  | 'middleName'
  | 'email'
  | 'barcode'
  | 'userStatus'
  | 'isActivated';

const Employees: FC = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector<User[]>((state) => state.usersSlice.data);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  const columnsDefaultName: IColumnsDefaultName[] = [
    { name: 'Фамилия' },
    { name: 'Имя' },
    { name: 'Отчество' },
    { name: 'Email' },
    { name: 'Номер карты' },
    { name: 'Статус' },
    { name: 'Активен' },
  ];

  const columnsListDb: IColumnsListDb[] = [
    'id',
    'lastName',
    'firstName',
    'middleName',
    'email',
    'barcode',
    'userStatus',
    'isActivated',
  ];

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const itemsPerPage = 50;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  const filterUsers = () => {
    let filtered = users;

    if (selectedStatus !== null) {
      filtered = filtered.filter((user) =>
        user.userStatus === selectedStatus
      );
    }
    if (searchText !== '') {
      filtered = filtered.filter((user) => {
        const fullName = `${user.lastName} ${user.firstName} ${user.middleName}`;
        const reversedFullName = `${user.firstName} ${user.lastName} ${user.middleName}`;
        const reversedFullName1 = `${user.middleName} ${user.lastName} ${user.firstName}`;
        const reversedFullName2 = `${user.middleName} ${user.firstName} ${user.lastName}`;
  
        return (
          fullName.toLowerCase().includes(searchText.toLowerCase()) ||
          reversedFullName.toLowerCase().includes(searchText.toLowerCase()) ||
          reversedFullName1.toLowerCase().includes(searchText.toLowerCase()) ||
          reversedFullName2.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    }
  
    return filtered;
  };
  

  const displayedUsers = filterUsers().slice(startIndex, endIndex);

  const uniqueEmployeeStatuses = [
    ...new Set(users.map((user) => user.userStatus)),
  ];

  const totalPages = Math.ceil(filterUsers.length / itemsPerPage);



  return (
    <Wrapper>
      <div>
        <div className="flex">
          <Sidebar
            items={uniqueEmployeeStatuses}
            onItemSelect={setSelectedStatus}
            title="Сотрудники"
            setCurrentPage={setCurrentPage}
            displayKey={(status) => status}
          />
          <div className="p-4">
            <Table
              title="Список сотрудников"
              childrenSearch={<Search onFilter={setSearchText} />}
              columnsDefaultName={columnsDefaultName}
              data={displayedUsers}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              columnsListDb={columnsListDb}
         
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Employees;
