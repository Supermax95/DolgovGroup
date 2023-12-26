import { FC, useEffect, useState } from 'react';
import Table from '../../../../ui/Table';
import { useAppDispatch, useAppSelector } from '../../../../Redux/hooks';
import getManager from '../../../../Redux/thunks/Manager/Management/getManager.api';
import ManagementModal from './ManagementModal';
import addManager from '../../../../Redux/thunks/Manager/Management/addManager.api';
import editManager from '../../../../Redux/thunks/Manager/Management/editManager.api';
import sendOneTimePassword from '../../../../Redux/thunks/Manager/Management/sendOneTimePassword.api';
import Wrapper from '../../../../ui/Wrapper';
import RoleSidebar from '../../../RoleSidebar/RoleSidebar';
import { unwrapResult } from '@reduxjs/toolkit';
import { Toaster } from 'sonner';
import PopUpNotification from '../../../../ui/PopUpNotification';

interface IManager {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
  email: string;
}

interface IColumnsDefaultName {
  name: string;
}

type IColumnsListDb =
  | 'id'
  | 'lastName'
  | 'firstName'
  | 'middleName'
  | 'phone'
  | 'email'
  | 'isAdmin';

const Management: FC = () => {
  const dispatch = useAppDispatch();

  const managers = useAppSelector<IManager[]>(
    (state) => state.managerSlice.data
  );
  //console.log('managers', managers);

  //* для уведомления при добавлении
  // //! ПОЧЕМУ-ТО ТЕПЕРЬ НЕ ЗАЛЕТАЕТ ОТВЕТ С БЭКА
  const managerIdForBellAdd = useAppSelector(
    (state) => state.managerSlice.addedManagerData
  );

  //* для уведомления при редактировании
  const managerIdForBellEdit = useAppSelector(
    (state) => state.managerSlice.updatedManager
  );

  //* для уведомления отправке кода на почту
  const managerIdForBellOneTimePass = useAppSelector(
    (state) => state.managerSlice.resultPass
  );

  const [isModalOpen, setModalOpen] = useState(true);
  const [isAddingMode, setAddingMode] = useState(false);
  const [selectedManager, setSelectedManager] = useState<IManager | null>(null);

  const [editedManager, setEditedManager] = useState<
    IManager | null | undefined
  >(null);

  const [showNotificationAdd, setShowNotificationAdd] = useState(false);
  const [showNotificationEdit, setShowNotificationEdit] = useState(false);
  const [showNotificationOnePass, setShowNotificationOnePass] = useState(false);

  const [modalError, setModalError] = useState<string | null>(null);

  const columnsDefaultName: IColumnsDefaultName[] = [
    { name: 'Фамилия' },
    { name: 'Имя' },
    { name: 'Отчество' },
    { name: 'Телефон' },
    { name: 'Email' },
    { name: 'Новый пароль' },
  ];

  const columnsListDb: IColumnsListDb[] = [
    'id',
    'lastName',
    'firstName',
    'middleName',
    'phone',
    'email',
  ];

  const displayedManagers = managers;

  useEffect(() => {
    dispatch(getManager());
  }, [dispatch]);

  const openAddModal = (): void => {
    setAddingMode(true);
    setEditedManager({
      id: 0,
      lastName: '',
      firstName: '',
      middleName: '',
      phone: '',
      email: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (manager: IManager): void => {
    setSelectedManager(manager);
    setEditedManager({ ...manager });
    setAddingMode(false);
    setModalOpen(true);
  };

  const closeAddModal = (): void => {
    setSelectedManager(null);
    setEditedManager(null);
    setModalOpen(false);
    setModalError(null);
  };

  const closeEditModal = (): void => {
    setSelectedManager(null);
    setEditedManager(null);
    setModalOpen(false);
  };

  //* добавление менеджера
  const handleSaveAdd = async (): Promise<void> => {
    console.log('editedManager при добавлении:', editedManager);
    try {
      if (editedManager) {
        const resultAdd = await dispatch(
          addManager({
            newManager: editedManager,
          })
        );
        unwrapResult(resultAdd);
        setModalError(null);
        closeAddModal();
        setShowNotificationAdd(true);
        // <PopUpNotification email={editedManager.email} />;
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
      setModalError(error as string | null);
      setTimeout(() => {
        setModalError(null);
      }, 3000);
    }
  };

  //* редактирование менеджера
  const handleSaveEdit = async (editedManager: IManager): Promise<void> => {
    try {
      if (selectedManager) {
        const resultEdit = await dispatch(
          editManager({
            managerId: selectedManager.id,
            updateManager: editedManager,
          })
        );

        unwrapResult(resultEdit);
        setModalError(null);
        closeEditModal();
        setShowNotificationEdit(true);
      }
    } catch (error) {
      console.error('Произошла ошибка при редактировании:', error);
      setModalError(error as string | null);
      setTimeout(() => {
        setModalError(null);
      }, 3000);
    }
  };

  //* отправка временного пароля на почту
  const handleOneTimePassword = async (managerId: number): Promise<void> => {
    try {
      const result = await dispatch(
        sendOneTimePassword({
          managerId: managerId,
        })
      );

      if (sendOneTimePassword.fulfilled.match(result)) {
        if (managerIdForBellOneTimePass) {
          setShowNotificationOnePass(true);
        } else {
          console.error('Ошибка. Пользователь не найден.');
        }
      }
    } catch (error) {
      console.error('Произошла ошибка при отправке:', error);
    }
  };

  useEffect(() => {
    if (
      showNotificationAdd ||
      showNotificationEdit ||
      showNotificationOnePass
    ) {
      const timeoutId = setTimeout(() => {
        setShowNotificationAdd(false);
        setShowNotificationEdit(false);
        setShowNotificationOnePass(false);
      });

      return () => clearTimeout(timeoutId);
    }
  }, [showNotificationAdd, showNotificationEdit, showNotificationOnePass]);

  return (
    <>
      <Wrapper>
        <Toaster position="bottom-left" expand={true} />
        {showNotificationAdd && (
          <PopUpNotification
            titleText={'Личный кабинет менеджера создан'}
            bodyText={'Временный пароль выслан на почту'}
            email={managerIdForBellAdd.email}
          />
        )}
        {showNotificationEdit && (
          <PopUpNotification
            titleText={' Данные менеджера успешно обновлены'}
            bodyText={
              'Для обновления пароля менеджера отправьте новый пароль на почту'
            }
            email={managerIdForBellEdit.email}
          />
        )}
        {showNotificationOnePass && (
          <PopUpNotification
            titleText={'Временный пароль выслан на почту'}
            email={managerIdForBellOneTimePass.email}
          />
        )}

        {/* <button
            onClick={() =>
              toast.custom(
                (t) => (
                  <div className="flex flex-col p-4 bg-slate-50 shadow-md hover:shadow-lg rounded-lg border border-slate-200 w-full">
                    <div className="flex flex-col justify-start">
                      <p className="font-medium text-xs text-slate-800">
                        Личный кабинет менеджера создан
                        {managerIdForBellAdd.firstName}
                        {managerIdForBellAdd.lastName}
                      </p>
                      <p className="text-xs font-normal text-slate-600 mt-2">
                        Временный пароль выслан на почту{' '}
                        <span className="text-slate-800 ext-xs">
                          ribrbrty0@g,ao.
                          {managerIdForBellAdd.email}
                        </span>
                      </p>
                      <button
                        className="absolute py-1 right-1 top-2"
                        onClick={() => toast.dismiss(t)}
                      >
                        <XMarkIcon className="cursor-pointer w-4 h-4 text-slate-400 hover:text-slate-600 mx-1" />
                      </button>
                    </div>
                  </div>
                ),
                { duration: Infinity }
              )
            }
          >
            Give me a toast
          </button> */}

        <RoleSidebar />

        <div className="p-4">
          <Table
            title="Список менеджеров"
            data={displayedManagers}
            columnsDefaultName={columnsDefaultName}
            columnsListDb={columnsListDb}
            onAddClick={openAddModal}
            onEditClick={openEditModal}
            onOneTimePassword={(id) => handleOneTimePassword(id)}
          />
        </div>
        {isModalOpen && (selectedManager || isAddingMode) && (
          <ManagementModal
            isOpen={isModalOpen}
            manager={selectedManager}
            onSaveEdit={handleSaveEdit}
            onSaveAdd={handleSaveAdd}
            onCloseAddModal={closeAddModal}
            onCloseEditModal={closeEditModal}
            isAddingMode={isAddingMode}
            editedManager={editedManager}
            setEditedManager={setEditedManager}
            showError={modalError}
          />
        )}
      </Wrapper>
    </>
  );
};

export default Management;
