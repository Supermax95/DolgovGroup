import { FC, useEffect, useState } from 'react';
import Wrapper from '../../../ui/Wrapper';
import Sidebar from '../../../ui/Sidebar';
import Pagination from '../../../ui/Paggination';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import getEmployees from '../../../Redux/thunks/Users/getEmployee.api';
import Table from '../../../ui/Table';

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
  const [selectedActivated, setSelectedActivated] = useState<boolean | null>(
    null
  );
  const columnsDefaultName: IColumnsDefaultName[] = [
    { name: 'Фамилия' },
    { name: 'Имя' },
    { name: 'Отчество' },
    { name: 'email' },
    { name: 'Карта' },
    { name: 'Пользователь' },
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

  const filteredUsers = selectedStatus
    ? users.filter((user) => user.userStatus === selectedStatus)
    : users;

    const filteredActive = selectedActivated === null
    ? users
    : users.filter((user) => {
        if (selectedStatus === 'Активные') {
          return user.isActivated === selectedActivated;
        } else {
          return !user.isActivated === selectedActivated;
        }
      });


  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const uniqueEmployeeStatuses = [
    ...new Set(users.map((user) => user.userStatus)),
  ];
  // const uniqueActivationStatuses = [true, false];

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
              columnsDefaultName={columnsDefaultName}
              data={displayedUsers}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              columnsListDb={columnsListDb}
              // filtredExtra={filteredActive}
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
