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
  console.log('Managers:', managers);

  const [isAddingMode, setAddingMode] = useState(false);
  const [selectedManager, setSelectedManager] = useState<IManager | null>(null);
  const [editedManager, setEditedManager] = useState<
    IManager | null | undefined
  >(null);

  const [isModalOpen, setModalOpen] = useState(false);
  console.log(setModalOpen);

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

  const openEditModal = (manager: IManager) => {
    setSelectedManager(manager);
    setEditedManager({ ...manager });
    setModalOpen(true);
  };

  const openAddModal = () => {
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
