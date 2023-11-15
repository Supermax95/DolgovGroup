import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../Redux/hooks';
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

  const handleSave = () => {
    if (editedManager) {
      onSaveEdit(editedManager);
      onCloseEditModal();
    }
  };

  const handleAdd = () => {
    if (editedManager) {
      onSaveAdd(editedManager);
      onCloseAddModal();
    }
  };

  if (!isOpen || !editedManager) {
    return null;
  }

  const inputFieldsDate: InputField[] = [
    {
      id: 'lastName',
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

  const allInputFields = [...inputFieldsDate];

  return (
    <>
      <Wrapper>
        <Modal
          modalTitle={modalTitle}
          isAddingMode={isAddingMode}
          onAddClick={handleAdd}
          onSaveClick={handleSave}
          onCancellick={handleCancel}
        >
          <InputModal inputFields={allInputFields} />
        </Modal>
      </Wrapper>
    </>
  );
};

export default ManagementModal;
