import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../Redux/hooks';
import Wrapper from '../../../ui/Wrapper';
import InputModal, { InputField } from '../../../ui/InputModal';
import Modal from '../../../ui/Modal';
import codeSend from '../../../Redux/thunks/Nodemailer/nodemailerCode.api';

interface User {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  barcode: string;
  userStatus: string;
  birthdate: Date;
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

const UsersModal: React.FC<UsersModalProps> = ({
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
      dispatch(
        codeSend({
          userId: editedUser.id,
          firstName: editedUser.firstName,
          middleName: editedUser.middleName,
          email: editedUser.email,
          userStatus: editedUser.userStatus,
        })
      );

      onClose();
    }
  };

  if (!isOpen || !editedUser) {
    return null;
  }

  const inputFields: InputField[] = [
    {
      id: 'lastName',
      type: 'text',
      value: editedUser.lastName,
      placeholder: '',
      autoCapitalize: 'words',
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
      id: 'firstName',
      type: 'text',
      value: editedUser.firstName,
      placeholder: '',
      autoCapitalize: 'words',
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
      id: 'middleName',
      type: 'text',
      value: editedUser.middleName,
      placeholder: '',
      autoCapitalize: 'words',
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
      id: 'barcode',
      type: 'text',
      value: editedUser.barcode,
      placeholder: '',
      autoComplete: 'off',
      title: 'Штрих-код',
      htmlFor: 'barcode',
      onChange: (value: string) =>
        setEditedUser({
          ...editedUser,
          barcode: value,
        }),
    },
    {
      id: 'userStatus',
      type: 'text',
      value: editedUser.userStatus,
      placeholder: '',
      autoCapitalize: 'words',
      autoComplete: 'off',
      title: 'Статус пользователя',
      htmlFor: 'userStatus',
      onChange: (value: string) =>
        setEditedUser({
          ...editedUser,
          userStatus: value,
        }),
    },
    {
      id: 'isActivated',
      type: 'checkbox',
      checked: editedUser.isActivated,
      title: 'Активирован',
      htmlFor: 'isActivated',
      onChange: (value: boolean) =>
        setEditedUser({
          ...editedUser,
          isActivated: value,
        }),
    },
    {
      id: 'birthdate',
      type: 'date',
      value: editedUser.birthdate,
      placeholder: '',
      autoComplete: 'off',
      title: 'Дата рождения',
      htmlFor: 'birthdate',
      onChange: (value: string) =>
        setEditedUser({
          ...editedUser,
          birthdate: new Date(value),
        }),
    },
    {
      id: 'bonusProgram',
      type: 'text',
      value: editedUser.bonusProgram,
      placeholder: '',
      autoCapitalize: 'words',
      autoComplete: 'off',
      title: 'Бонусная программа',
      htmlFor: 'bonusProgram',
      onChange: (value: string) =>
        setEditedUser({
          ...editedUser,
          bonusProgram: value,
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
    },
  ];

  return (
    <Wrapper>
      <Modal
        modalTitle={modalTitle}
        onCancellick={handleCancel}
        onSaveClick={handleSave}
      >
        <InputModal inputFields={inputFields} />
      </Modal>
    </Wrapper>
  );
};

export default UsersModal;
