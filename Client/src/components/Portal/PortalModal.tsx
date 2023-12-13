import React, { FC } from 'react';
import Modal from '../../ui/Modal';
import InputModal from '../../ui/InputModal';

interface IEmail {
  email: string;
}

interface EmailModalProps {
  isOpen: boolean;
  email: string | null;
  sendOneTimePassword: (enterEmail: IEmail) => void;
  enterEmail: IEmail | null | undefined;
  setEnterEmail: React.Dispatch<
    React.SetStateAction<IEmail | null | undefined>
  >;
  showError: React.ReactNode;
}

const PortalModal: FC<EmailModalProps> = ({
  isOpen,
  sendOneTimePassword,
  enterEmail,
  setEnterEmail,
  showError,
}) => {
  const modalTitle = 'Сброс пароля';

  const enterEmailForm = enterEmail || {
    email: '',
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      sendOneTimePassword(enterEmailForm);
    } catch (error) {
      console.error('Произошла ошибка при сохранении:', error);
    }
  };

  if (!isOpen || !enterEmail) {
    return null;
  }

  const inputFieldsDate = [
    {
      id: 'email',
      name: 'email',
      type: 'email',
      value: enterEmail.email,
      placeholder: '',
      autoComplete: 'off',
      title: 'Email',
      htmlFor: 'email',
      onChange: (value: string | boolean | number | Date) => {
        if (typeof value === 'string') {
          setEnterEmail({
            ...enterEmail,
            email: value,
          });
        }
      },
      required: true,
    },
  ];

  const handleCancel = () => {
    setEnterEmail(undefined);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <Modal modalTitle={modalTitle} onCancellick={handleCancel}>
          {showError}
          <InputModal inputFields={inputFieldsDate} />
        </Modal>
      </form>
    </>
  );
};

export default PortalModal;
