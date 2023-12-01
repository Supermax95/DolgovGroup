import React, { FC, useEffect } from 'react';
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

const EmployeesModal: FC<UsersModalProps> = ({
  isOpen,
  user,
  onSaveEdit,
  onCloseEditModal,
  editedUser,
  setEditedUser,
  axiosError,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
    }
  }, [user, setEditedUser]);

  const modalTitle = 'Редактирование анкеты';

  const handleCancel = () => {
    setEditedUser(undefined);
    onCloseEditModal();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveEdit(editedUser);
    // onCloseEditModal();
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
      onChange: (value: string) =>
        setEditedUser({
          ...editedUser,
          lastName: value,
        }),
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
      onChange: (value: string) =>
        setEditedUser({
          ...editedUser,
          barcode: value,
        }),
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
      onChange: (value: string) =>
        setEditedUser({
          ...editedUser,
          firstName: value,
        }),
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
      onChange: (value: string) =>
        setEditedUser({
          ...editedUser,
          balance: parseFloat(value),
        }),
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
      onChange: (value: string) =>
        setEditedUser({
          ...editedUser,
          middleName: value,
        }),
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
      onChange: (value: string) =>
        setEditedUser({
          ...editedUser,
          birthDate: new Date(value),
        }),
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
      onChange: (value: string) =>
        setEditedUser({
          ...editedUser,
          email: value,
        }),
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
      onChange: (value: string) =>
        setEditedUser({
          ...editedUser,
          bonusProgram: value,
        }),
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
      onChange: (value: string) =>
        setEditedUser({
          ...editedUser,
          userStatus: value,
        }),
      options: [
        { value: 'Сотрудник', label: 'Сотрудник' },
        { value: 'Новый сотрудник', label: 'Новый сотрудник' },
        { value: 'Клиент', label: 'Клиент' },
      ],
      required: true,
    },
    {
      id: 'isActivated',
      value: editedUser.isActivated,
    },
  ];

  return (
    <Wrapper>
      <form onSubmit={handleFormSubmit}>
        <ModalUser modalTitle={modalTitle} onCancellick={handleCancel}>
        {axiosError && (
            <div className="text-sm text-rose-400 text-center mt-2">
              {axiosError}
            </div>
              )}
          <InputModal
            containerClassName={
              'py-8 grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'
            }
            inputFields={inputFieldsDate}
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

export default EmployeesModal;
