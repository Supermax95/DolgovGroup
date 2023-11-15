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

interface IDate {
  newLastName: string;
  newFirstName: string;
  newMiddleName: string;
  newEmail: string;
}

interface ManagersModalProps {
  isOpen: boolean;
  manager: IManager | null;
  onSave: (editedManager: IManager) => void;
  onClose: () => void;
  isAddingMode: boolean;
  editedManager: IManager | null | undefined;
  setEditedManager: React.Dispatch<
    React.SetStateAction<IManager | null | undefined>
  >;
}

const ManagementModal: FC<ManagersModalProps> = ({
  isOpen,
  manager,
  onSave,
  onClose,
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
    ? 'Добавление менеджера'
    : 'Редактирование данных менеджера';

  const handleCancel = () => {
    setEditedManager(undefined);
    onClose();
  };

  const handleSave = () => {
    if (editedManager) {
      onSave(editedManager);
      onClose();
    }
  };

  const handleAdd = async () => {
    if (editedManager) {
      try {
        //await dispatch(
        // addManager({
        //   newManager: editedManager,
        // })
        onClose();
      } catch (error) {
        console.error('Произошла ошибка при добавлении:', error);
      }
    } else {
      alert('Заполните все поля перед добавлением.');
    }
  };

  if (!isOpen || !editedManager) {
    return null;
  }

  // const handleFieldChangeProfileManager = (
  //   field: keyof IDate,
  //   value: string
  // ): void => {
  //   setData((prevDate) => ({ ...prevDate, [field]: value }));
  // };

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
    },
  ];

  const allInputFields = [...inputFieldsDate];
  return (
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
  );
};

export default ManagementModal;
