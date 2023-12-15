import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '../../../../Redux/hooks';
import Wrapper from '../../../../ui/Wrapper';
import InputModal, { InputField } from '../../../../ui/InputModal';
import Modal from '../../../../ui/Modal';
import deleteManager from '../../../../Redux/thunks/Manager/Management/deleteManager.api';

interface IManager {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
  email: string;
}

interface ManagersModalProps {
  isOpen: boolean;
  manager: IManager | null;
  onSaveAdd: (editedManager: IManager) => void;
  onSaveEdit: (editedManager: IManager) => void;

  onCloseAddModal: () => void;
  onCloseEditModal: () => void;

  isAddingMode: boolean;
  editedManager: IManager | null | undefined;
  setEditedManager: React.Dispatch<
    React.SetStateAction<IManager | null | undefined>
  >;

  showError: React.ReactNode;
}

const ManagementModal: FC<ManagersModalProps> = ({
  isOpen,
  manager,
  onSaveEdit,
  onSaveAdd,
  onCloseAddModal,
  onCloseEditModal,
  isAddingMode,
  editedManager,
  setEditedManager,
  showError,
}) => {
  const dispatch = useAppDispatch();

  const managerToSave: IManager = editedManager
    ? editedManager
    : {
        id: 0,
        lastName: '',
        firstName: '',
        middleName: '',
        email: '',
        phone: '',
      };

  useEffect(() => {
    console.log('Данные менеджера:', editedManager);
    if (manager) {
      setEditedManager({ ...manager });
    }
  }, [manager, isAddingMode, setEditedManager]);

  const modalTitle = isAddingMode
    ? 'Регистрация нового менеджера'
    : 'Редактирование данных менеджера';

  const handleCancel = () => {
    setEditedManager(undefined);
    onCloseEditModal();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      'Вы уверены, что хотите внести изменения?'
    );
    if (isConfirmed) {
      try {
        if (isAddingMode) {
          onSaveAdd(managerToSave);
        } else {
          onSaveEdit(managerToSave);
        }
      } catch (error) {
        console.error('Произошла ошибка при сохранении:', error);
      }
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      'Вы уверены, что хотите удалить данного менеджера?'
    );
    if (isConfirmed && editedManager && editedManager.id) {
      const managerId = editedManager.id;

      try {
        await dispatch(deleteManager({ managerId }));
        // Если операция удаления успешна, закройте модальное окно
        onCloseEditModal();
      } catch (error) {
        console.error('Произошла ошибка при удалении:', error);
      }
    }
  };

  if (!isOpen || !editedManager) {
    return null;
  }

  const inputFieldsDate: InputField[] = [
    {
      id: 'lastName',
      name: 'lastName',
      type: 'text',
      value: editedManager.lastName,
      placeholder: '',
      autoComplete: 'off',
      title: 'Фамилия',
      htmlFor: 'lastName',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedManager({
            ...editedManager,
            lastName: value,
          });
        }
      },
      required: true,
    },
    {
      id: 'firstName',
      name: 'firstName',
      type: 'text',
      value: editedManager.firstName,
      placeholder: '',
      autoComplete: 'off',
      title: 'Имя',
      htmlFor: 'firstName',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedManager({
            ...editedManager,
            firstName: value,
          });
        }
      },
      required: true,
    },

    {
      id: 'middleName',
      name: 'middleName',
      type: 'text',
      value: editedManager.middleName,
      placeholder: '',
      autoComplete: 'off',
      title: 'Отчество',
      htmlFor: 'middleName',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedManager({
            ...editedManager,
            middleName: value,
          });
        }
      },
      required: true,
    },
    {
      id: 'phone',
      name: 'phone',
      type: 'tel',
      value: editedManager.phone,
      placeholder: '',
      autoComplete: 'off',
      title: 'Телефон',
      htmlFor: 'phone',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedManager({
            ...editedManager,
            phone: value,
          });
        }
      },
      required: true,
      pattern: '\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}',
    },
    /**
     * 
  Если вы хотите, чтобы регулярное выражение разрешало только числа, то вот соответствующее изменение:

  \\+7 - символ "+" и цифра 7
  \\( - открывающая скобка
  \\d{3} - три цифры (для кода города)
  \\) - закрывающая скобка
  \\d{3} - три цифры (первые три цифры номера телефона)
  - - дефис
  \\d{2} - две цифры (следующие две цифры номера телефона)
  - - дефис
  \\d{2} - две цифры (последние две цифры номера телефона)
  Таким образом, паттерн будет соответствовать строке в формате: "+7 (XXX) YYY-YY-YY", где X - цифры кода города, а Y - цифры номера телефона.
     */
    {
      id: 'email',
      name: 'email',
      type: 'email',
      value: editedManager.email,
      placeholder: '',
      autoComplete: 'off',
      title: 'Email',
      htmlFor: 'email',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedManager({
            ...editedManager,
            email: value,
          });
        }
      },
      required: true,
    },
  ];

  return (
    <>
      <Wrapper>
        <form onSubmit={handleFormSubmit}>
          <Modal
            modalTitle={modalTitle}
            isAddingMode={isAddingMode}
            onCancellick={handleCancel}
            onDeleteClick={handleDelete}
          >
            {showError && (
              <div className="text-sm text-rose-400 text-center mt-2">
                {showError}
              </div>
            )}
            <InputModal inputFields={inputFieldsDate} />
          </Modal>
        </form>
      </Wrapper>
    </>
  );
};

export default ManagementModal;
