import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../Redux/hooks';
import Wrapper from '../../../ui/Wrapper';
import InputModal, { InputField } from '../../../ui/InputModal';
import ModalUser from '../../../ui/ModalUser';
import nodemailerActivationSend from '../../../Redux/thunks/Nodemailer/nodemailerActivation.api';
import { unwrapResult } from '@reduxjs/toolkit';
import PopUpErrorNotification from '../../../ui/PopUpErrorNotification';
import PopUpNotification from '../../../ui/PopUpNotification';

interface IUser {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  barcode: string;
  userStatus: string;
  birthDate: Date | undefined;
  bonusProgram: string;
  balance: number;
  isActivated: boolean;
  phoneNumber: string;
}

interface UsersModalProps {
  isOpen: boolean;
  user: IUser | null;
  onSaveEdit: (editedUser: IUser) => void;
  onCloseEditModal: () => void;
  editedUser: IUser | null | undefined;
  setEditedUser: React.Dispatch<React.SetStateAction<IUser | null | undefined>>;
}

const EmployeesModal: FC<UsersModalProps> = ({
  isOpen,
  user,
  onSaveEdit,
  onCloseEditModal,
  editedUser,
  setEditedUser,
}) => {
  const dispatch = useAppDispatch();

  const [showNotificationActivationSend, setShowNotificationActivationSend] =
    useState<boolean>(false);

  const [errorNotification, setErrorNotification] = useState<string | null>(
    null
  );

  //* удаление
  const [showNotificationDelUser, setShowNotificationDelUser] =
    useState<boolean>(false);

  const [
    showErrorNotificationActivationSend,
    setShowErrorNotificationActivationSend,
  ] = useState<boolean>(false);

  useEffect(() => {
    if (
      showNotificationActivationSend ||
      showErrorNotificationActivationSend ||
      showNotificationDelUser
    ) {
      const timeoutId = setTimeout(() => {
        setShowNotificationActivationSend(false);
        setShowErrorNotificationActivationSend(false);
        setShowNotificationDelUser(false);
      });

      return () => clearTimeout(timeoutId);
    }
  }, [
    showNotificationActivationSend,
    showErrorNotificationActivationSend,
    showNotificationDelUser,
  ]);

  const userToSave = editedUser || {
    id: 0,
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    barcode: '',
    userStatus: '',
    phoneNumber: '',
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

  const modalTitle = 'Редактирование анкеты';

  const handleCancel = (): void => {
    setEditedUser(undefined);
    onCloseEditModal();
  };

  const handleFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const isConfirmed = window.confirm(
      'Вы уверены, что хотите внести изменения?'
    );
    if (isConfirmed) {
      onSaveEdit(userToSave);
    }
  };

  const handleActivationSend = async (): Promise<void> => {
    try {
      if (editedUser) {
        const result = await dispatch(nodemailerActivationSend(editedUser));
        unwrapResult(result);
        setShowNotificationActivationSend(true);
      }
    } catch (error) {
      console.error('Произошла ошибка при отправке:', error);
      setErrorNotification(error as string | null);
      setShowErrorNotificationActivationSend(true);
    }
  };

  const handleDelete = (): void => {
    const isConfirmed = window.confirm(
      'Вы уверены, что хотите удалить данного пользователя?'
    );
    if (isConfirmed && editedUser && editedUser.id) {
      const userId = editedUser.id;

      try {
        // dispatch(deleteManager({ managerId }));
        setShowNotificationDelUser(true);
        //* позволяет вывести уведолмление после закрытия модального окна
        setTimeout(() => {
          onCloseEditModal();
        }, 50);
      } catch (error) {
        console.error('Произошла ошибка при отправке:', error);
      }
    }
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
      id: 'phone',
      name: 'phone',
      type: 'tel',
      value: editedUser.phoneNumber,
      placeholder: '',
      autoComplete: 'off',
      title: 'Телефон',
      htmlFor: 'phone',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEditedUser({
            ...editedUser,
            phoneNumber: value,
          });
        }
      },
      required: true,
      pattern: '\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}',
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
      options:
        editedUser.userStatus === 'Сотрудник'
          ? [
              { value: 'Сотрудник', label: 'Сотрудник' },
              { value: 'Клиент', label: 'Клиент' },
            ]
          : [
              { value: 'Новый сотрудник', label: 'Новый сотрудник' },
              { value: 'Сотрудник', label: 'Сотрудник' },
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
    <>
      {showNotificationActivationSend && (
        <PopUpNotification
          titleText={'Ссылка для активации аккаунта выслана на почту:'}
          email={editedUser.email}
        />
      )}

      {showNotificationDelUser && (
        <PopUpNotification
          titleText={'Аккаунт пользователя удалён'}
          name={`${editedUser.lastName} ${editedUser.firstName}  ${editedUser.middleName}`}
        />
      )}

      {/* //!уведомления об ошибках */}
      {showErrorNotificationActivationSend && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}
      <Wrapper>
        <form onSubmit={handleFormSubmit}>
          <ModalUser
            modalTitle={modalTitle}
            onCancelСlick={handleCancel}
            onDeleteClick={handleDelete}
          >
            <InputModal
              containerClassName={
                'py-8 grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'
              }
              inputFields={inputFieldsDate}
              // codeSend={() =>
              //   editedUser && dispatch(nodemailerCodeSend(editedUser))
              // }
              activationSend={handleActivationSend}
            />
          </ModalUser>
        </form>
      </Wrapper>
    </>
  );
};

export default EmployeesModal;
