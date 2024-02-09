import { FC, useEffect, useState } from 'react';
import Wrapper from '../../../ui/Wrapper';
import Sidebar from '../../../ui/Sidebar';
import Pagination from '../../../ui/Paggination';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import getEmployees from '../../../Redux/thunks/Users/getEmployee.api';
import Table from '../../../ui/Table';
import Search from '../../../ui/Search';
import EmployeesModal from './EmployeesModal';
import editEmployees from '../../../Redux/thunks/Users/editEmployee.api';
import { unwrapResult } from '@reduxjs/toolkit';
import PopUpNotification from '../../../ui/PopUpNotification';
import PopUpErrorNotification from '../../../ui/PopUpErrorNotification';
import LoadingAnimation from '../Laws/Loading';

interface User {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  barcode: string;
  userStatus: string;
  isActivated: boolean;
  bonusProgram: string;
  balance: number;
  phoneNumber: string;
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

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null | undefined>(null);
  const [isLoading, setLoading] = useState(false);
  //* уведомления
  const [showNotificationEditUser, setShowNotificationEditUser] =
    useState<boolean>(false);

  const [errorNotification, setErrorNotification] = useState<string | null>(
    null
  );

  const [showErrorNotificationEditUser, setShowErrorNotificationEditUser] =
    useState<boolean>(false);

  useEffect(() => {
    if (showNotificationEditUser || showErrorNotificationEditUser) {
      const timeoutId = setTimeout(() => {
        setShowNotificationEditUser(false);
        setShowErrorNotificationEditUser(false);
      });

      return () => clearTimeout(timeoutId);
    }
  }, [showNotificationEditUser, showErrorNotificationEditUser]);

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
    setCurrentPage(1);
  }, [searchText]);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const itemsPerPage = 50;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filterUsers = () => {
    let filtered = users;

    if (selectedStatus !== null) {
      filtered = filtered.filter((user) => user.userStatus === selectedStatus);
    }
    if (searchText !== '') {
      filtered = filtered.filter((user) => {
        const userFields = [
          user.lastName,
          user.firstName,
          user.middleName,
          user.email,
          user.barcode,
        ];

        const searchTerms = searchText.toLowerCase().split(' ');

        return searchTerms.every((term) =>
          userFields.some((field) => field.toLowerCase().includes(term))
        );
      });
    }

    return filtered;
  };

  const filteredUsersPag = filterUsers();
  const totalMatches = filteredUsersPag.length;
  const displayedUsers = filterUsers().slice(startIndex, endIndex);

  const uniqueEmployeeStatuses = [
    ...new Set(users.map((user) => user.userStatus)),
  ];

  const totalPages = Math.ceil(totalMatches / itemsPerPage);

  const openEditModal = (user: User): void => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setModalOpen(true);
  };

  const closeEditModal = (): void => {
    setSelectedUser(null);
    setEditedUser(null);
    setModalOpen(true);
  };

  const handleSaveEdit = async (editedUser: User): Promise<void> => {
    try {
      setLoading(true);
      if (selectedUser) {
        const resultAction = await dispatch(
          editEmployees({
            employeeId: selectedUser.id,
            newInfo: editedUser,
          })
        );
        unwrapResult(resultAction);
        setErrorNotification(null);
        setShowNotificationEditUser(true);
      }
      setTimeout(() => {
        closeEditModal();
      }, 50);
      setLoading(false);
    } catch (error) {
      console.error('Произошла ошибка при редактировании:', error);
      setErrorNotification(error as string | null);
      setShowErrorNotificationEditUser(true);
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      {showNotificationEditUser && (
        <PopUpNotification
          titleText={'Внесены изменения в карточку клиента'}
          bodyText={
            <>
              {`${editedUser?.lastName} ${editedUser?.firstName} ${editedUser?.middleName}`}
              <br />
            </>
          }
          name={editedUser?.email}
        />
      )}
      {/* //!уведомления об ошибках */}
      {showErrorNotificationEditUser && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}
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
              // title="Список сотрудников"
              childrenSearch={<Search onFilter={setSearchText} />}
              columnsDefaultName={columnsDefaultName}
              data={displayedUsers}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              columnsListDb={columnsListDb}
              onEditClick={openEditModal}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
          {isLoading && (
              <div className="fixed inset-0 z-20 backdrop-blur-lg flex items-center justify-center ">
                {/* <div className="bg-white p-1 rounded-sm shadow-xs  "> */}
                <div className="bg-white p-1 rounded-sm z-10 py-20 bg-opacity-70 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center ">
                  <LoadingAnimation />
                </div>
              </div>
            )}
          {isModalOpen && selectedUser && (
            <EmployeesModal
              isOpen={isModalOpen}
              user={selectedUser}
              onSaveEdit={handleSaveEdit}
              onCloseEditModal={closeEditModal}
              editedUser={editedUser}
              setEditedUser={setEditedUser}
            />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Employees;
