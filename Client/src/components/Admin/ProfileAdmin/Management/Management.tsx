import { FC, useEffect, useState } from 'react';
import Table from '../../../../ui/Table';
import { useAppDispatch, useAppSelector } from '../../../../Redux/hooks';
import getManager from '../../../../Redux/thunks/Manager/Management/getManager.api';
import ManagementModal from './ManagementModal';
import addManager from '../../../../Redux/thunks/Manager/Management/addManager.api';
import editManager from '../../../../Redux/thunks/Manager/Management/editManager.api';
import sendOneTimePassword from '../../../../Redux/thunks/Manager/Management/sendOneTimePassword.api';
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
  | 'email';

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
  //console.log(managerIdForBellAdd);

  //* для уведомления при редактировании
  const managerIdForBellEdit = useAppSelector(
    (state) => state.managerSlice.updatedManager
  );
  console.log(managerIdForBellEdit);

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

  const closeEditModal = (): void => {
    setSelectedManager(null);
    setEditedManager(null);
    setModalOpen(false);
  };

  const closeAddModal = (): void => {
    setSelectedManager(null);
    setEditedManager(null);
    setModalOpen(false);
  };

  //* добавление менеджера
  const handleSaveAdd = async (): Promise<void> => {
    if (editedManager) {
      try {
        const resultAdd = await dispatch(
          addManager({
            newManager: editedManager,
          })
        );

        if (addManager.fulfilled.match(resultAdd)) {
          if (managerIdForBellAdd) {
            console.log('addedManager', managerIdForBellAdd);
            setShowNotificationAdd(true);
          } else {
            console.error('Ошибка. Пользователь не найден.');
          }

          closeEditModal();
        }

        if (addManager.rejected.match(resultAdd)) {
          if (resultAdd.error && resultAdd.error?.message?.includes('409')) {
            setModalError('Пользователь с такой почтой уже существует');
            //* пока уведомление об ошибке исчезает через 3 секунды
            setTimeout(() => {
              setModalError(null);
            }, 3000);
          } else {
            setModalError('Ошибка. Не удалось обновить данные.');
          }
        }
      } catch (error) {
        console.error('Произошла ошибка при добавлении:', error);
      }
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

        if (editManager.fulfilled.match(resultEdit)) {
          //managerIdForBellEdit
          if (managerIdForBellEdit) {
            console.log(
              'managerIdForBellEditHandl------>',
              managerIdForBellEdit
            );

            setShowNotificationEdit(true);
          } else {
            console.error('Ошибка. Пользователь не найден.');
          }
          closeEditModal();
        }

        if (editManager.rejected.match(resultEdit)) {
          if (resultEdit.error && resultEdit.error?.message?.includes('409')) {
            setModalError('Пользователь с такой почтой уже существует');
            //* пока уведомление об ошибке исчезает через 3 секунды
            setTimeout(() => {
              setModalError(null);
            }, 3000);
          } else {
            // Обработка других ошибок
            setModalError('Ошибка. Не удалось обновить данные.');
          }
        }
        //
      }
    } catch (error) {
      console.error('Произошла ошибка при редактировании:', error);
    }
  };

  //* отправка временного пароля на почту
  const handleOneTimePassword = async (managerId: number): Promise<void> => {
    try {
      await dispatch(
        sendOneTimePassword({
          managerId: managerId,
        })
      );
      setShowNotificationOnePass(true);
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
    <div>
      {showNotificationAdd && managerIdForBellAdd && (
        <div className="flex flex-col p-8 bg-slate-100 shadow-md hover:shadow-lg rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex flex-col ml-3">
                <div
                  className="font-medium leading-none"
                  //! мб, нужно как-то склонять имена
                >
                  Личный кабинет менеджера {managerIdForBellAdd.firstName}{' '}
                  {managerIdForBellAdd.lastName} создан
                </div>
                <p className="text-sm text-slate-600 leading-none mt-2">
                  Временный пароль выслан на почту {managerIdForBellAdd.email}
                </p>
              </div>
            </div>
            <button
              onClick={removeNotificationAdd}
              className="flex-no-shrink bg-gradient-to-b from-orange-300 to-orange-400 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider text-white rounded-full"
            >
              Скрыть
            </button>
          </div>
        </div>
      )}
      {showNotificationEdit && (
        <div className="flex flex-col p-8 bg-slate-100 shadow-md hover:shadow-lg rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex flex-col ml-3">
                <div className="font-medium leading-none">
                  Данные менеджера успешно обновлены{' '}
                  {managerIdForBellEdit.firstName}{' '}
                  {managerIdForBellEdit.lastName}
                </div>
                <p className="text-sm text-slate-600 leading-none mt-2">
                  Для обновления пароля менеджера отправьте новый пароль на
                  почту {managerIdForBellEdit.email}
                </p>
              </div>
            </div>
            <button
              onClick={removeNotificationEdit}
              className="flex-no-shrink bg-gradient-to-b from-orange-300 to-orange-400 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider text-white rounded-full"
            >
              Скрыть
            </button>
          </div>
        </div>
      )}
      {showNotificationOnePass && (
        <div className="flex flex-col p-8 bg-slate-100 shadow-md hover:shadow-lg rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex flex-col ml-3">
                <div className="font-medium leading-none">
                  Временный пароль выслан на почту
                </div>
                {/* <p className="text-sm text-slate-600 leading-none mt-2">
                  Временный пароль выслан на почту ???????
                </p> */}
              </div>
            </div>
            <button
              onClick={removeNotificationOnePass}
              className="flex-no-shrink bg-gradient-to-b from-orange-300 to-orange-400 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider text-white rounded-full"
            >
              Скрыть
            </button>
          </div>
        </div>
      )}
      <Table
        title="Список менеджеров"
        data={displayedManagers}
        columnsDefaultName={columnsDefaultName}
        columnsListDb={columnsListDb}
        onAddClick={openAddModal}
        onEditClick={openEditModal}
        onOneTimePassword={(id) => handleOneTimePassword(id)}
      />
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
          showError={
            modalError && (
              <div className="text-sm text-rose-400 text-center mt-2">
                {modalError}
              </div>
            )
          }
        />
      )}
    </div>
  );
};

export default Management;
