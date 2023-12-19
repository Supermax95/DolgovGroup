import { FC, useEffect, useState } from 'react';
import Table from '../../../ui/Table';
import Wrapper from '../../../ui/Wrapper';
import Sidebar from '../../../ui/Sidebar';
import Pagination from '../../../ui/Paggination';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import getClients from '../../../Redux/thunks/Users/getClients.api';
import editClients from '../../../Redux/thunks/Users/editClients.api';
import Search from '../../../ui/Search';
import UsersModal from './ClientsModal';
import { unwrapResult } from '@reduxjs/toolkit';

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

const Clients: FC = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector<User[]>((state) => state.usersSlice.data);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null | undefined>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [axiosError, setAxiosError] = useState<string | null>(null);

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
    dispatch(getClients());
  }, [dispatch]);


  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  
  const itemsPerPage = 50;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filterUsers = () => {
    let filtered = users;

    if (selectedStatus !== null) {
      filtered = filtered.filter((user) =>
        selectedStatus === 'Активные' ? user.isActivated : !user.isActivated
      );
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

  const filteredUsersPag = filterUsers()
  const totalMatches = filteredUsersPag.length;
  const displayedUsers = filterUsers().slice(startIndex, endIndex);

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setModalOpen(true);

  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setEditedUser(null);
    setModalOpen(false);

  };

  const handleSaveEdit = async (editedUser: User) => {
    try {
      if (selectedUser) {
        const resultAction = await dispatch(
          editClients({
            clientId: selectedUser.id,
            newInfo: editedUser,
          })
        );
        const result = unwrapResult(resultAction);
        // console.log('Результат выполнения диспетчера:', result);
        setAxiosError(null);
        closeEditModal();
      }
    } catch (error) {
      console.error('Произошла ошибка при редактировании:', error);
      setAxiosError(error as string | null);
    }
  };

  const totalPages = Math.ceil(totalMatches/ itemsPerPage);
  const uniqueStatus = ['Активные', 'Неактивные'];

  return (
    <Wrapper>
      <div>
        <div className="flex">
          <Sidebar
            items={uniqueStatus}
            onItemSelect={setSelectedStatus}
            title="Клиенты"
            setCurrentPage={setCurrentPage}
            displayKey={(status) => status}
          />
          <div className="p-4">
            <Table
              title="Список покупателей"
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
            {isModalOpen && selectedUser && (
              <UsersModal
                isOpen={isModalOpen}
                user={selectedUser}
                onSaveEdit={handleSaveEdit}
                onCloseEditModal={closeEditModal}
                editedUser={editedUser}
                setEditedUser={setEditedUser}
                axiosError={axiosError}
              />
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Clients;
