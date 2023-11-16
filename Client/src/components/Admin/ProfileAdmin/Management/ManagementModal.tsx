import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '../../../../Redux/hooks';
import Wrapper from '../../../../ui/Wrapper';
import InputModal, { InputField } from '../../../../ui/InputModal';
import Modal from '../../../../ui/Modal';

interface IManager {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
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
}

const ManagementModal: FC<ManagersModalProps> = ({
  isOpen,
  manager,
  onSaveEdit,
  onSaveAdd,
  onCloseEditModal,
  onCloseAddModal,
  isAddingMode,
  editedManager,
  setEditedManager,
}) => {
  const dispatch = useAppDispatch();

  manager || {
    id: 0,
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
  };

  useEffect(() => {
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
    if (isAddingMode) {
      onSaveAdd(editedManager);
      onCloseAddModal();
    } else {
      onSaveEdit(editedManager);
      onCloseEditModal();
    }
  };

  const handleDelete = () => {
    if (editedManager && editedManager.id) {
      const managerId = editedManager.id;
      // dispatch(deleteLocation(managerId));
      onCloseEditModal();
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
      onChange: (value: string) =>
        setEditedManager({
          ...editedManager,
          lastName: value,
        }),
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
      onChange: (value: string) =>
        setEditedManager({
          ...editedManager,
          firstName: value,
        }),
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
      onChange: (value: string) =>
        setEditedManager({
          ...editedManager,
          middleName: value,
        }),
      required: true,
    },

    {
      id: 'email',
      name: 'email',
      type: 'email',
      value: editedManager.email,
      placeholder: '',
      autoComplete: 'off',
      title: 'Email',
      htmlFor: 'email',
      onChange: (value: string) =>
        setEditedManager({
          ...editedManager,
          email: value,
        }),
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
            <InputModal inputFields={inputFieldsDate} />
          </Modal>
        </form>
      </Wrapper>
    </>
  );
};

export default ManagementModal;
