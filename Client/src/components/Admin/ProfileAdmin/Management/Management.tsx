import { FC, useEffect, useState } from 'react';
import Table from '../../../../ui/Table';
import { useAppDispatch, useAppSelector } from '../../../../Redux/hooks';
import getManager from '../../../../Redux/thunks/Manager/Management/getManager.api';
import ManagementModal from './ManagementModal';
import addManager from '../../../../Redux/thunks/Manager/Management/addManager.api';
import editManager from '../../../../Redux/thunks/Manager/Management/editManager.api';
import sendOneTimePassword from '../../../../Redux/thunks/Manager/Management/sendOneTimePassword.api';
import Wrapper from '../../../../ui/Wrapper';
import AccountNotification from '../../../../ui/AccountNotification';
import RoleSidebar from '../../../RoleSidebar/RoleSidebar';
import { unwrapResult } from '@reduxjs/toolkit';

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

  // useEffect(() => {
  //   if (showNotification) {
  //     const notificationTimeout = setTimeout(() => {
  //       setShowNotification(false);
  //     }, 5000);

  //     return () => clearTimeout(notificationTimeout);
  //   }
  // }, [showNotification]);

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
          console.log(
            'managerIdForBellOneTimePass------>',
            managerIdForBellOneTimePass
          );

          setShowNotificationOnePass(true);
        } else {
          console.error('Ошибка. Пользователь не найден.');
        }
      }
    } catch (error) {
      console.error('Произошла ошибка при отправке:', error);
    }
  };

  //* скрытие всплывающего окна
  const removeNotificationAdd = (): void => {
    setShowNotificationAdd(false);
  };

  const removeNotificationEdit = (): void => {
    setShowNotificationEdit(false);
  };

  const removeNotificationOnePass = (): void => {
    setShowNotificationOnePass(false);
  };

  return (
    <Wrapper>
      <AccountNotification
        //! нюанс: если несколько делать действий с разными аккаунтами, то уведомление всегда высвечивает только последнего юзера, а прошлые затираются
        showNotification={showNotificationAdd}
        onClickClose={removeNotificationAdd}
        titleText={`Личный кабинет менеджера создан ${managerIdForBellAdd.firstName} ${managerIdForBellAdd.lastName}`}
        bodyText={`Временный пароль выслан на почту ${managerIdForBellAdd.email}`}
      />

      <AccountNotification
        showNotification={showNotificationEdit}
        onClickClose={removeNotificationEdit}
        titleText={` Данные менеджера успешно обновлены ${managerIdForBellEdit.firstName} ${managerIdForBellEdit.lastName}`}
        bodyText={` Для обновления пароля менеджера отправьте новый пароль на почту ${managerIdForBellEdit.email}`}
      />

      <AccountNotification
        showNotification={showNotificationOnePass}
        onClickClose={removeNotificationOnePass}
        titleText={`Временный пароль выслан на почту ${managerIdForBellOneTimePass.email}`}
      />

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
  );
};

export default Management;
