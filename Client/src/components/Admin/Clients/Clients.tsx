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
import PopUpNotification from '../../../ui/PopUpNotification';
import PopUpErrorNotification from '../../../ui/PopUpErrorNotification';
import LoadingAnimation from '../../Loading/Loading';

export interface IUserTable {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  barcode: string;
  userStatus: string;
  isActivated: boolean;
  birthDate: Date | undefined;
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

const Clients: FC = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector<IUserTable[]>((state) => state.usersSlice.data);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<IUserTable | null>(null);
  const [editedUser, setEditedUser] = useState<IUserTable | null | undefined>(
    null
  );
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingClients, setLoadingClients] = useState(true);

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
    const fetchData = async () => {
      try {
        await dispatch(getClients());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoadingClients(false);
    };
    fetchData();
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

  const filteredUsersPag = filterUsers();
  const totalMatches = filteredUsersPag.length;
  const displayedUsers = filterUsers().slice(startIndex, endIndex);

  const openEditModal = (user: IUserTable) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setEditedUser(null);
    setModalOpen(false);
  };

  const handleSaveEdit = async (editedUser: IUserTable) => {
    try {
      setLoading(true);
      if (selectedUser) {
        const resultAction = await dispatch(
          editClients({
            clientId: selectedUser.id,
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

  const totalPages = Math.ceil(totalMatches / itemsPerPage);
  const uniqueStatus = ['Активные', 'Неактивные'];

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

      {isLoadingClients ? (
        <div className="flex items-center justify-center h-full">
          <div className="relative h-16 w-16">
            <div className="absolute top-24 left-0 w-full h-full bg-transparent border-4 border-gray-300 rounded-full animate-spin"></div>
            <div className="absolute top-24 left-0 w-full h-full bg-transparent border-t-4 border-green-500 rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <>
          <Sidebar
            items={uniqueStatus}
            onItemSelect={setSelectedStatus}
            title="Клиенты"
            setCurrentPage={setCurrentPage}
            displayKey={(status) => status}
          />
          <div className="p-4">
            <Table
              // title="Список покупателей"
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
              <div className="bg-white p-1 rounded-sm z-10 py-20 bg-opacity-70 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center ">
                <LoadingAnimation />
              </div>
            </div>
          )}
          {isModalOpen && selectedUser && (
            <UsersModal
              isOpen={isModalOpen}
              user={selectedUser}
              onSaveEdit={handleSaveEdit}
              onCloseEditModal={closeEditModal}
              editedUser={editedUser}
              setEditedUser={setEditedUser}
            />
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Clients;
