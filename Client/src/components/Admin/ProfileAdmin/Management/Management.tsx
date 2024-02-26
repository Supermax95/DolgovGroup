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
import PopUpNotification from '../../../../ui/PopUpNotification';
import PopUpErrorNotification from '../../../../ui/PopUpErrorNotification';

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

  const [showNotificationAdd, setShowNotificationAdd] =
    useState<boolean>(false);
  const [showNotificationEdit, setShowNotificationEdit] =
    useState<boolean>(false);
  const [showNotificationOnePass, setShowNotificationOnePass] =
    useState<boolean>(false);

  const [errorNotification, setErrorNotification] = useState<string | null>(
    null
  );
  const [showErrorNotificationAdd, setShowErrorNotificationAdd] =
    useState<boolean>(false);
  const [showErrorNotificationEdit, setShowErrorNotificationEdit] =
    useState<boolean>(false);
  const [showErrorNotificationOnePass, setShowErrorNotificationOnePass] =
    useState<boolean>(false);

  useEffect(() => {
    if (
      showNotificationAdd ||
      showNotificationEdit ||
      showNotificationOnePass ||
      showErrorNotificationAdd ||
      showErrorNotificationEdit ||
      showErrorNotificationOnePass
    ) {
      const timeoutId = setTimeout(() => {
        setShowNotificationAdd(false);
        setShowNotificationEdit(false);
        setShowNotificationOnePass(false);
        setShowErrorNotificationAdd(false);
        setShowErrorNotificationEdit(false);
        setShowErrorNotificationOnePass(false);
      });

      return () => clearTimeout(timeoutId);
    }
  }, [
    showNotificationAdd,
    showNotificationEdit,
    showNotificationOnePass,
    showErrorNotificationAdd,
    showErrorNotificationEdit,
    showErrorNotificationOnePass,
  ]);

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
  };

  const closeEditModal = (): void => {
    setSelectedManager(null);
    setEditedManager(null);
    setModalOpen(false);
  };

  // //* добавление менеджера
  // const handleSaveAdd = async (): Promise<void> => {
  //   try {
  //     if (editedManager) {
  //       const resultAdd = await dispatch(
  //         addManager({
  //           newManager: editedManager,
  //         })
  //       );
  //       unwrapResult(resultAdd);
  //       setShowNotificationAdd(true);
  //       setTimeout(() => {
  //         closeEditModal();
  //       }, 50);
  //     }
  //   } catch (error) {
  //     console.error('Произошла ошибка при добавлении:', error);
  //     setErrorNotification(error as string | null);
  //     setShowErrorNotificationAdd(true);
  //   }
  // };

  // //* редактирование менеджера
  // const handleSaveEdit = async (editedManager: IManager): Promise<void> => {
  //   try {
  //     if (selectedManager) {
  //       const resultEdit = await dispatch(
  //         editManager({
  //           managerId: selectedManager.id,
  //           updateManager: editedManager,
  //         })
  //       );

  //       unwrapResult(resultEdit);
  //       setShowNotificationEdit(true);
  //       setTimeout(() => {
  //         closeEditModal();
  //       }, 50);
  //     }
  //   } catch (error) {
  //     console.error('Произошла ошибка при редактировании:', error);
  //     setErrorNotification(error as string | null);
  //     setShowErrorNotificationEdit(true);
  //   }
  // };

  const handleSaveAdd = async (): Promise<void> => {
    
    try {
      if (editedManager) {
        const cyrillicRegex = /^[А-Яа-яЁё\s-]+$/;

        if (
          cyrillicRegex.test(editedManager.lastName) &&
          cyrillicRegex.test(editedManager.firstName) &&
          cyrillicRegex.test(editedManager.middleName)
        ) {
          const resultAdd = await dispatch(
            addManager({
              newManager: editedManager,
            })
          );
          unwrapResult(resultAdd);
          setShowNotificationAdd(true);
          setTimeout(() => {
            closeEditModal();
          }, 50);
        } else {
          setErrorNotification(
            'ФИО должны содержать только кириллические символы, пробелы и дефисы'
          );
          setShowErrorNotificationAdd(true);
        }
      }
    } catch (error) {
      console.error('Произошла ошибка при добавлении:', error);
      setErrorNotification(error as string | null);
      setShowErrorNotificationAdd(true);
    }
  };

  const handleSaveEdit = async (editedManager: IManager): Promise<void> => {
    try {
      if (selectedManager) {
        const cyrillicRegex = /^[А-Яа-яЁё\s-]+$/;

        if (
          cyrillicRegex.test(editedManager.lastName) &&
          cyrillicRegex.test(editedManager.firstName) &&
          cyrillicRegex.test(editedManager.middleName)
        ) {
          const resultEdit = await dispatch(
            editManager({
              managerId: selectedManager.id,
              updateManager: editedManager,
            })
          );

          unwrapResult(resultEdit);
          setShowNotificationEdit(true);
          setTimeout(() => {
            closeEditModal();
          }, 50);
        } else {
          setErrorNotification(
            'ФИО должны содержать только кириллические символы, пробелы и дефисы'
          );
          setShowErrorNotificationEdit(true);
        }
      }
    } catch (error) {
      console.error('Произошла ошибка при редактировании:', error);
      setErrorNotification(error as string | null);
      setShowErrorNotificationEdit(true);
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
      unwrapResult(result);
      setShowNotificationOnePass(true);
    } catch (error) {
      console.error('Произошла ошибка при отправке:', error);
      setErrorNotification(error as string | null);
      setShowErrorNotificationOnePass(true);
    }
  };

  return (
    <>
      <Wrapper>
        {showNotificationAdd && (
          <PopUpNotification
            titleText={'Личный кабинет менеджера создан'}
            bodyText={'Временный пароль выслан на почту:'}
            email={editedManager?.email}
          />
        )}
        {showNotificationEdit && (
          <PopUpNotification
            titleText={' Данные менеджера успешно обновлены'}
            bodyText={
              'Для обновления пароля менеджера отправьте новый пароль на почту:'
            }
            email={editedManager?.email}
          />
        )}
        {showNotificationOnePass && (
          <PopUpNotification
            titleText={'Временный пароль выслан на почту:'}
            email={managerIdForBellOneTimePass?.email}
          />
        )}

        {/* //!уведомления об ошибках */}
        {showErrorNotificationAdd && (
          <PopUpErrorNotification
            titleText={'Ошибка'}
            bodyText={errorNotification}
          />
        )}
        {showErrorNotificationEdit && (
          <PopUpErrorNotification
            titleText={'Ошибка'}
            bodyText={errorNotification}
          />
        )}
        {showErrorNotificationOnePass && (
          <PopUpErrorNotification
            titleText={'Ошибка'}
            bodyText={errorNotification}
          />
        )}

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
          />
        )}
      </Wrapper>
    </>
  );
};

export default Management;
