import { FC, useEffect, useState } from 'react';
import Table from '../../../ui/Table';
import Wrapper from '../../../ui/Wrapper';
import Sidebar from '../../../ui/Sidebar';
import Pagination from '../../../ui/Paggination';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import getClients from '../../../Redux/thunks/Users/getClients.api';
import editClients from '../../../Redux/thunks/Users/editClients.api';

// import UsersModal from './UsersModal';

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

const Clients: FC = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector<User[]>((state) => state.usersSlice.data);
  const [currentPage, setCurrentPage] = useState(1);
  // const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null | undefined>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
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

  const itemsPerPage = 50;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredUsers =
    selectedStatus === null
      ? users
      : users.filter((user) =>
          selectedStatus === 'Активные' ? user.isActivated : !user.isActivated
        );

  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

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

  const handleSave = async (editedUser: User) => {
    try {
      if (selectedUser) {
        await dispatch(
          editClients({
            clientId: selectedUser.id,
            newInfo: editedUser,
          })
        );
        closeEditModal();
      }
    } catch (error) {
      console.error('Произошла ошибка при редактировании:', error);
    }
  };

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
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
              title="Список клиентов"
              columnsDefaultName={columnsDefaultName}
              data={displayedUsers}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              columnsListDb={columnsListDb}
              onEditClick={openEditModal}
              onAddClick={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            {/* {isModalOpen && selectedUser && (
              // <UsersModal
              <UsersModal
                isOpen={isModalOpen}
                user={selectedUser}
                onSave={handleSave}
                onClose={closeEditModal}
                editedUser={editedUser}
                setEditedUser={setEditedUser}
              /> */}
            {/* )} */}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Clients;
