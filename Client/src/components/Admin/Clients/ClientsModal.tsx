import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../Redux/hooks';
import Wrapper from '../../../ui/Wrapper';
import InputModal, { InputField } from '../../../ui/InputModal';
import ModalUser from '../../../ui/ModalUser';
import nodemailerActivationSend from '../../../Redux/thunks/Nodemailer/nodemailerActivation.api';
import nodemailerCodeSend from '../../../Redux/thunks/Nodemailer/nodemailerCodeSend.api';
interface User {
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
  user: User | null;
  onSave: (editedUser: User) => void;
  onClose: () => void;
  editedUser: User | null | undefined;
  setEditedUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
}

const ClientsModal: React.FC<UsersModalProps> = ({
  isOpen,
  user,
  onSave,
  onClose,
  editedUser,
  setEditedUser,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
    }
  }, [user, setEditedUser]);

  const modalTitle = 'Редактирование анкеты клиента';

  const handleCancel = () => {
    setEditedUser(undefined);
    onClose();
  };

  const handleSave = () => {
    if (editedUser) {
      onSave(editedUser);
      onClose();
    }
  };

  if (!isOpen || !editedUser) {
    return null;
  }

  const inputFieldsDate: InputField[] = [
    {
      id: 'lastName',
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
    },
    {
      id: 'barcode',
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
    },
    {
      id: 'balance',
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
    },
    {
      id: 'birthdate',
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
    },

    {
      id: 'bonusProgram',
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
    },
    // {
    //   id: 'balance',
    //   type: 'number',
    //   value: editedUser.balance.toString(),
    //   placeholder: '',
    //   autoComplete: 'off',
    //   title: 'Баланс',
    //   htmlFor: 'balance',
    //   onChange: (value: string) =>
    //     setEditedUser({
    //       ...editedUser,
    //       balance: parseFloat(value),
    //     }),
    //   disabled: true,
    // },

    // {
    //   id: '',
    //   type: 'checkbox',
    //   value: 'что-то',
    //   htmlFor: '',
    //   // onChange: (value: boolean) =>
    //   //   setEditedUser({
    //   //     ...editedUser,
    //   //     isActivated: value,
    //   //   }),
    // },
    {
      id: 'userStatus',
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
    },
    {
      id: 'isActivated',
      type: 'text',
      value: editedUser.isActivated,
      htmlFor: 'isActivated',
      onChange: (value: boolean) =>
        setEditedUser({
          ...editedUser,
          isActivated: value,
        }),
    },
  ];

  const allInputFields = [...inputFieldsDate];
  return (
    <Wrapper>
      <ModalUser
        modalTitle={modalTitle}
        onCancellick={handleCancel}
        onSaveClick={handleSave}
      >
        <InputModal
          containerClassName={'py-8 grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'}
          inputFields={allInputFields}
          codeSend={() =>
            editedUser && dispatch(nodemailerCodeSend(editedUser))
          }
          activationSend={() =>
            editedUser && dispatch(nodemailerActivationSend(editedUser))
          }
        />
      </ModalUser>
    </Wrapper>
  );
};

export default ClientsModal;
