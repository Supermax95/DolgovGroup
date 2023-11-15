import { FC, useEffect, useState } from 'react';
import Table from '../../../../ui/Table';
import { useAppDispatch, useAppSelector } from '../../../../Redux/hooks';
import getManager from '../../../../Redux/thunks/Manager/Management/getManager.api';
import ManagementModal from './ManagementModal';

interface IManager {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
}

interface IColumnsDefaultName {
  name: string;
}

type IColumnsListDb = 'id' | 'lastName' | 'firstName' | 'middleName' | 'email';

const Management: FC = () => {
  const dispatch = useAppDispatch();

  const managers = useAppSelector<IManager[]>(
    (state) => state.managerSlice.data
  );

  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddingMode, setAddingMode] = useState(false);
  const [selectedManager, setSelectedManager] = useState<IManager | null>(null);
  const [editedManager, setEditedManager] = useState<
    IManager | null | undefined
  >(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  const columnsDefaultName: IColumnsDefaultName[] = [
    { name: 'Фамилия' },
    { name: 'Имя' },
    { name: 'Отчество' },
    { name: 'Email' },
  ];

  const columnsListDb: IColumnsListDb[] = [
    'id',
    'lastName',
    'firstName',
    'middleName',
    'email',
  ];

  const displayedManagers = managers;

  useEffect(() => {
    dispatch(getManager());
  }, [dispatch]);

  //!

  // const itemsPerPage = 50;
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;

  // const filterUsers = () => {
  //   let filtered = managers;

  //   if (searchText !== '') {
  //     filtered = filtered.filter((user) => {
  //       const userFields = [
  //         user.lastName,
  //         user.firstName,
  //         user.middleName,
  //         user.email,
  //       ];

  //       const searchTerms = searchText.toLowerCase().split(' ');

  //       return searchTerms.every((term) =>
  //         userFields.some((field) => field.toLowerCase().includes(term))
  //       );
  //     });
  //   }

  //   return filtered;
  // };

  // const displayedManagers = filterUsers().slice(startIndex, endIndex);

  // const totalPages = Math.ceil(filterUsers.length / itemsPerPage);

  //!

  const openAddModal = () => {
    console.log('Открываю модальное окно ');
    setAddingMode(true);
    setEditedManager({
      id: 0,
      lastName: '',
      firstName: '',
      middleName: '',
      email: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (manager: IManager) => {
    console.log('Открываю модальное окно для редактирования');
    setSelectedManager(manager);
    setEditedManager({ ...manager });
    setAddingMode(false);
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedManager(null);
    setEditedManager(null);
    setModalOpen(false);
  };

  const handleSave = async (editedManager: IManager) => {
    try {
      if (selectedManager) {
        //await dispatch(
        //   editEmployees({
        //     employeeId: selectedManager.id,
        //     newInfo: editedManager,
        //   })
        // );
        closeEditModal();
      }
    } catch (error) {
      console.error('Произошла ошибка при редактировании:', error);
    }
  };

  return (
    <div>
      <Table
        title="Список менеджеров"
        data={displayedManagers}
        columnsDefaultName={columnsDefaultName}
        columnsListDb={columnsListDb}
        onAddClick={openAddModal}
        onEditClick={openEditModal}
      />
      {isModalOpen && (selectedManager || isAddingMode) && (
        <ManagementModal
          isOpen={isModalOpen}
          manager={selectedManager}
          onSave={handleSave}
          onClose={closeEditModal}
          isAddingMode={isAddingMode}
          editedManager={editedManager}
          setEditedManager={setEditedManager}
        />
      )}
    </div>
  );
};

export default Management;
