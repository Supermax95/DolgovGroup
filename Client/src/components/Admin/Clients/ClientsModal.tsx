import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../Redux/hooks';
import Wrapper from '../../../ui/Wrapper';
import InputModal, { InputField } from '../../../ui/InputModal';
import ModalUser from '../../../ui/ModalUser';
import nodemailerActivationSend from '../../../Redux/thunks/Nodemailer/nodemailerActivation.api';
import nodemailerCodeSend from '../../../Redux/thunks/Nodemailer/nodemailerCodeSend.api';

interface IUser {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  barcode: string;
  userStatus: string;
  birthDate?: Date;
  bonusProgram: string;
  balance: number;
  isActivated: boolean;
}

interface UsersModalProps {
  isOpen: boolean;
  user: IUser | null;
  onSaveEdit: (editedUser: IUser) => void;
  onCloseEditModal: () => void;
  editedUser: IUser | null | undefined;
  setEditedUser: React.Dispatch<React.SetStateAction<IUser | null | undefined>>;
  axiosError: string | null;
}

const ClientsModal: React.FC<UsersModalProps> = ({
  isOpen,
  user,
  onSaveEdit,
  onCloseEditModal,
  editedUser,
  setEditedUser,
  axiosError,
}) => {
  const dispatch = useAppDispatch();

  const userToSave = editedUser || {
    id: 0,
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    barcode: '',
    userStatus: '',
    birthDate: undefined,
    bonusProgram: '',
    balance: 0,
    isActivated: false,
  };

  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
    }
  }, [user, setEditedUser]);

  const modalTitle = 'Редактирование анкеты клиента';

  const handleCancel = () => {
    setEditedUser(undefined);
    onCloseEditModal();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isConfirmed = window.confirm(
      'Вы уверены, что хотите внести изменения?'
    );
    if (isConfirmed) {
      onSaveEdit(userToSave);
    }
    setTimeout(() => {
      onCloseEditModal();
    }, 50);
  };

  if (!isOpen || !editedUser) {
    return null;
  }

  const inputFieldsDate: InputField[] = [
    {
      id: 'lastName',
      name: 'lastName',
      type: 'text',
      value: editedUser.lastName,
      placeholder: '',
      autoComplete: 'off',
      title: 'Фамилия',
      htmlFor: 'lastName',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedUser({
            ...editedUser,
            lastName: value,
          });
        }
      },
      required: true,
    },
    {
      id: 'barcode',
      name: 'barcode',
      type: 'text',
      value: editedUser.barcode,
      placeholder: '',
      autoComplete: 'off',
      title: 'Номер карты',
      htmlFor: 'barcode',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedUser({
            ...editedUser,
            barcode: value,
          });
        }
      },
      required: true,
      disabled: true,
    },
    {
      id: 'firstName',
      name: 'firstName',
      type: 'text',
      value: editedUser.firstName,
      placeholder: '',
      autoComplete: 'off',
      title: 'Имя',
      htmlFor: 'firstName',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedUser({
            ...editedUser,
            firstName: value,
          });
        }
      },
      required: true,
    },
    {
      id: 'balance',
      name: 'balance',
      type: 'number',
      value: editedUser.balance.toString(),
      placeholder: '',
      autoComplete: 'off',
      title: 'Баланс',
      htmlFor: 'balance',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedUser({
            ...editedUser,
            balance: parseFloat(value),
          });
        }
      },
      disabled: true,
    },
    {
      id: 'middleName',
      name: 'middleName',
      type: 'text',
      value: editedUser.middleName,
      placeholder: '',
      autoComplete: 'off',
      title: 'Отчество',
      htmlFor: 'middleName',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedUser({
            ...editedUser,
            middleName: value,
          });
        }
      },
      required: true,
    },
    {
      id: 'birthdate',
      name: 'birthdate',
      type: 'date',
      value: editedUser.birthDate,
      placeholder: '',
      autoComplete: 'off',
      title: 'Дата рождения',
      htmlFor: 'birthdate',
      onChange: (value: string | boolean | number | Date) => {
        if (value instanceof Date) {
          setEditedUser({
            ...editedUser,
            birthDate: value,
          });
        }
      },
      disabled: true,
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      value: editedUser.email,
      placeholder: '',
      autoComplete: 'off',
      title: 'Email',
      htmlFor: 'email',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedUser({
            ...editedUser,
            email: value,
          });
        }
      },
      required: true,
    },

    {
      id: 'bonusProgram',
      name: 'bonusProgram',
      type: 'text',
      value: editedUser.bonusProgram,
      placeholder: '',
      autoComplete: 'off',
      title: 'Бонусная программа',
      htmlFor: 'bonusProgram',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedUser({
            ...editedUser,
            bonusProgram: value,
          });
        }
      },
      disabled: true,
    },
    {
      id: 'userStatus',
      name: 'userStatus',
      type: 'text',
      value: editedUser.userStatus,
      placeholder: '',
      autoComplete: 'off',
      title: 'Статус пользователя',
      htmlFor: 'userStatus',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedUser({
            ...editedUser,
            userStatus: value,
          });
        }
      },
      options: [
        { value: 'Клиент', label: 'Клиент' },
        { value: 'Сотрудник', label: 'Сотрудник' },
        // { value: 'Новый сотрудник', label: 'Новый сотрудник' },
      ],
      required: true,
    },
    {
      id: 'isActivated',
      value: editedUser.isActivated,
    },
  ];

  const allInputFields = [...inputFieldsDate];
  return (
    <Wrapper>
      <form onSubmit={handleFormSubmit}>
        <ModalUser modalTitle={modalTitle} onCancelСlick={handleCancel}>
          {axiosError && (
            <div className="text-sm text-rose-400 text-center mt-2">
              {axiosError}
            </div>
          )}
          <InputModal
            containerClassName={
              'py-8 grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'
            }
            inputFields={allInputFields}
            modalTitle={modalTitle}
            codeSend={() =>
              editedUser && dispatch(nodemailerCodeSend(editedUser))
            }
            activationSend={() =>
              editedUser && dispatch(nodemailerActivationSend(editedUser))
            }
          />
        </ModalUser>
      </form>
    </Wrapper>
  );
};

export default ClientsModal;
