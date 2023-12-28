import React, { useState, useEffect, FC } from 'react';
import Field from '../../../ui/Field';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import ToggleShowPassword from '../../../ui/ToggleShowPassword';
import Button from '../../../ui/Button';
import editProfileManager from '../../../Redux/thunks/Manager/profileManager.api';
import changePassword from '../../../Redux/thunks/Manager/changePassword.api';
import changePhone from '../../../Redux/thunks/Manager/changePhone.api';
import Wrapper from '../../../ui/Wrapper';
import RoleSidebar from '../../RoleSidebar/RoleSidebar';
import {
  DevicePhoneMobileIcon,
  IdentificationIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { unwrapResult } from '@reduxjs/toolkit';
import { Toaster } from 'sonner';
import PopUpNotification from '../../../ui/PopUpNotification';
import PopUpErrorNotification from '../../../ui/PopUpErrorNotification';

interface IDate {
  newLastName: string;
  newFirstName: string;
  newMiddleName: string;
  newPhone: string;
  newEmail: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordChangeData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfileManager: FC = () => {
  const dispatch = useAppDispatch();

  const managerProfile = useAppSelector<{
    lastName?: string;
    firstName?: string;
    middleName?: string;
    phone?: string;
    email?: string;
    password?: string;
  }>((state) => state.managerSlice.manager);

  const managerId = useAppSelector<number>(
    (state) => state.managerSlice.manager.id
  );

  const [openPersonalData, setOpenPersonalData] = useState<boolean>(false);
  const [openPhone, setOpenPhone] = useState<boolean>(false);
  const [openPassword, setOpenPassword] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<PasswordChangeData>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showNotificationFullname, setShowNotificationFullname] =
    useState(false);
  const [showNotificationPhone, setShowNotificationPhone] =
    useState<boolean>(false);
  const [showNotificationPass, setShowNotificationPass] =
    useState<boolean>(false);

  const [errorNotification, setErrorNotification] = useState<string | null>(
    null
  );
  const [showErrorNotificationFullname, setShowErrorNotificationFullname] =
    useState<boolean>(false);
  const [showErrorNotificationPhone, setShowErrorNotificationPhone] =
    useState<boolean>(false);
  const [showErrorNotificationPass, setShowErrorNotificationPass] =
    useState<boolean>(false);

  useEffect(() => {
    if (
      showNotificationFullname ||
      showNotificationPhone ||
      showNotificationPass ||
      showErrorNotificationFullname ||
      showErrorNotificationPhone ||
      showErrorNotificationPass
    ) {
      const timeoutId = setTimeout(() => {
        setShowNotificationFullname(false);
        setShowNotificationPhone(false);
        setShowNotificationPass(false);
        setShowErrorNotificationFullname(false);
        setShowErrorNotificationPhone(false);
        setShowErrorNotificationPass(false);
      });

      return () => clearTimeout(timeoutId);
    }
  }, [
    showNotificationFullname,
    showNotificationPhone,
    showNotificationPass,
    showErrorNotificationFullname,
    showErrorNotificationPhone,
    showErrorNotificationPass,
  ]);

  const [data, setData] = useState<IDate>({
    newLastName: managerProfile.lastName || '',
    newFirstName: managerProfile.firstName || '',
    newMiddleName: managerProfile.middleName || '',
    newPhone: managerProfile.phone || '',
    newEmail: managerProfile.email || '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // ! предзаполняет поля инпутов
  //* из-за него в placeholder={data.newLastName} требуется такая запись, а если бы было из локального стора,
  //* то placeholder=''
  useEffect(() => {
    setData(() => ({
      newLastName: managerProfile.lastName || '',
      newFirstName: managerProfile.firstName || '',
      newMiddleName: managerProfile.middleName || '',
      newPhone: managerProfile.phone || '',
      newEmail: managerProfile.email || '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  }, [managerProfile]);

  const clickOpenPersonalData = (): void => {
    setOpenPersonalData(!openPersonalData);
    setOpenPhone(false);
    setOpenPassword(false);
  };

  const clickOpenPhone = (): void => {
    setOpenPhone(!openPhone);
    setOpenPersonalData(false);
    setOpenPassword(false);
  };

  const clickOpenPassword = (): void => {
    setOpenPassword(!openPassword);
    setOpenPersonalData(false);
    setOpenPhone(false);
  };

  const handleFieldChangeProfileManager = (
    field: keyof IDate,
    value: string
  ): void => {
    setData((prevDate) => ({ ...prevDate, [field]: value }));
    setErrorMessages((prevErr) => ({ ...prevErr, [field]: '' }));
  };

  //! нужна регулярка, проверяющая верность кириллицы на введение ФИО  её прокинуть в native
  //! сделать регистр первой буквы заглавной для ФИО
  const handleSubmitProfileManager = async (
    e: React.FormEvent
  ): Promise<void> => {
    e.preventDefault();

    const isConfirmed = window.confirm(
      'Вы уверены, что хотите внести изменения?'
    );

    if (isConfirmed) {
      try {
        const resultEdit = await dispatch(
          editProfileManager({
            managerId,
            newLastName: data.newLastName,
            newFirstName: data.newFirstName,
            newMiddleName: data.newMiddleName,
          })
        );
        unwrapResult(resultEdit);
        setErrorNotification(null);
        setShowNotificationFullname(true);
      } catch (error) {
        console.error('Ошибка обновления данных:', error);
        setShowErrorNotificationFullname(true);
        setErrorNotification(error as string | null);
      }
    }
  };

  //* изменение номера
  const handleSubmitProfileManagerPhone = async (
    e: React.FormEvent
  ): Promise<void> => {
    e.preventDefault();

    const isConfirmed = window.confirm(
      'Вы уверены, что хотите внести изменения?'
    );

    if (isConfirmed) {
      try {
        const resultEdit = await dispatch(
          changePhone({
            managerId,
            newPhone: data.newPhone,
          })
        );

        unwrapResult(resultEdit);
        setErrorNotification(null);
        setShowNotificationPhone(true);
      } catch (error) {
        console.error('Ошибка обновления данных:', error);
        setShowErrorNotificationPhone(true);
        setErrorNotification(error as string | null);
      }
    }
  };

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };
  const toggleShowNewPassword = (): void => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleShowConfirmPassword = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  //! нужна регулярка, проверяющая пароль по условиям надёжности и её прокинуть в native
  const handleSubmitProfileManagerPassword = async (
    e: React.FormEvent
  ): Promise<void> => {
    e.preventDefault();

    const isConfirmed = window.confirm(
      'Вы уверены, что хотите внести изменения?'
    );

    if (isConfirmed) {
      if (!data.oldPassword || !data.newPassword || !data.confirmPassword) {
        setErrorMessages({
          oldPassword: !data.oldPassword ? 'Введите текущий пароль' : '',
          newPassword: !data.newPassword ? 'Введите новый пароль' : '',
          confirmPassword: !data.confirmPassword
            ? 'Подтвердите новый пароль'
            : '',
        });
      } else if (data.newPassword !== data.confirmPassword) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          newPassword: 'Пароли не совпадают',
        }));
      } else {
        try {
          const resultEdit = await dispatch(
            changePassword({
              managerId,
              oldPassword: data.oldPassword,
              newPassword: data.newPassword,
            })
          );

          unwrapResult(resultEdit);
          setErrorNotification(null);
          setShowNotificationPass(true);
        } catch (error) {
          console.error('Ошибка обновления данных:', error);
          setShowErrorNotificationPass(true);
          setErrorNotification(error as string | null);
        }
      }
    }
  };

  const inputFieldsLastName = [
    {
      id: 'lastName',
      name: 'lastName',
      type: 'text',
      placeholder: data.newLastName,
      autoComplete: 'off',
      htmlFor: 'lastName',
      title: 'Фамилия',
      value: data.newLastName,
      onChange: (value: string) =>
        handleFieldChangeProfileManager('newLastName', value),
      required: true,
    },
  ];

  const inputFieldsFirstName = [
    {
      id: 'firstName',
      name: 'firstName',
      type: 'text',
      placeholder: data.newFirstName,
      autoComplete: 'off',
      htmlFor: 'firstName',
      title: 'Имя',
      value: data.newFirstName,
      onChange: (value: string) =>
        handleFieldChangeProfileManager('newFirstName', value),
      required: true,
    },
  ];

  const inputFieldsMiddleName = [
    {
      id: 'middleName',
      name: 'middleName',
      type: 'text',
      placeholder: data.newMiddleName,
      autoComplete: 'off',
      htmlFor: 'middleName',
      title: 'Отчество',
      value: data.newMiddleName,
      onChange: (value: string) =>
        handleFieldChangeProfileManager('newMiddleName', value),
      required: true,
    },
  ];

  const inputFieldsPhone = [
    {
      id: 'phone',
      name: 'phone',
      type: 'tel',
      placeholder: '',
      autoComplete: 'off',
      htmlFor: 'phone',
      title: 'Телефон',
      value: data.newPhone,
      onChange: (value: string) =>
        handleFieldChangeProfileManager('newPhone', value),
      required: true,
      pattern: '\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}',
    },
  ];

  const inputFieldsOldPassword = [
    {
      id: 'oldPassword',
      name: 'oldPassword',
      type: showPassword ? 'text' : 'password',
      placeholder: '',
      autoComplete: 'off',
      htmlFor: 'oldPassword',
      title: 'Старый пароль',
      value: data.oldPassword,
      onChange: (value: string) =>
        handleFieldChangeProfileManager('oldPassword', value),
      required: false,
      children: (
        <ToggleShowPassword
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
        />
      ),
      error: (
        <span className="text-sm text-rose-400">
          {errorMessages.oldPassword && errorMessages.oldPassword}
        </span>
      ),
    },
  ];

  const inputFieldsNewPassword = [
    {
      id: 'newPassword',
      name: 'newPassword',
      type: showNewPassword ? 'text' : 'password',
      placeholder: '',
      autoComplete: 'off',
      htmlFor: 'newPassword',
      title: 'Новый пароль',
      value: data.newPassword,
      onChange: (value: string) =>
        handleFieldChangeProfileManager('newPassword', value),
      required: false,
      children: (
        <ToggleShowPassword
          showPassword={showNewPassword}
          toggleShowPassword={toggleShowNewPassword}
        />
      ),
      error: (
        <span className="text-sm text-rose-400">
          {errorMessages.newPassword && errorMessages.newPassword}
        </span>
      ),
    },
  ];

  const inputFieldsConfirmPassword = [
    {
      id: 'confirmPassword',
      name: 'confirmPassword',
      type: showConfirmPassword ? 'text' : 'password',
      placeholder: '',
      autoComplete: 'off',
      htmlFor: 'confirmPassword',
      title: 'Повторите пароль',
      value: data.confirmPassword,
      onChange: (value: string) =>
        handleFieldChangeProfileManager('confirmPassword', value),
      required: false,
      children: (
        <ToggleShowPassword
          showPassword={showConfirmPassword}
          toggleShowPassword={toggleShowConfirmPassword}
        />
      ),
      error: (
        <span className="text-sm text-rose-400">
          {errorMessages.confirmPassword && errorMessages.confirmPassword}
        </span>
      ),
    },
  ];

  return (
    <Wrapper>
      <Toaster position="bottom-left" expand={true} />
      {showNotificationFullname && (
        <PopUpNotification
          titleText={'Ваши персональные данные успешно обновлены'}
          bodyText={`${data.newLastName} ${data.newFirstName} ${data.newMiddleName}`}
        />
      )}
      {showNotificationPhone && (
        <PopUpNotification
          titleText={'Ваш номер телефона успешно обновлён'}
          bodyText={data.newPhone}
        />
      )}
      {showNotificationPass && (
        <PopUpNotification
          titleText={'Успех'}
          bodyText={'Ваш пароль успешно обновлён'}
        />
      )}

      {/* //!уведомления об ошибках */}
      {showErrorNotificationFullname && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}
      {showErrorNotificationPhone && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}
      {showErrorNotificationPass && (
        <PopUpErrorNotification
          titleText={'Ошибка'}
          bodyText={errorNotification}
        />
      )}

      <RoleSidebar />

      <section className="p-6 bg-white dark:text-gray-50  w-[1024px]">
        <h1 className="text-center text-xl font-normal text-slate-700">
          Добро пожаловать, {managerProfile.firstName}
        </h1>
        <p className="text-center font-normal text-md text-slate-600 mx-auto my-3">
          {/* Здесь вы можете легко управлять своими персональными данными */}
          Здесь вы можете легко управлять своими учетными данными
        </p>

        <div
          className="w-full bg-slate-100 flex items-center rounded-md hover:bg-slate-100 cursor-pointer my-1"
          onClick={clickOpenPersonalData}
        >
          <div className=" flex items-center space-x-4 bg-slate-100 px-6 py-2">
            <div className="py-1">
              {' '}
              <IdentificationIcon className="cursor-pointer w-4 h-4 text-slate-600 mx-1" />
            </div>

            <span className="text-slate-600 text-sm font-normal">
              Обновление персональных данных
            </span>
          </div>
        </div>

        {openPersonalData && (
          <form
            //! FIO
            onSubmit={handleSubmitProfileManager}
            className="container flex flex-col mx-auto space-y-12"
          >
            <fieldset className="grid grid-cols-4 gap-6 p-2 rounded-md shadow-sm dark:bg-gray-900">
              <div className="w-44 space-y-2 col-span-full lg:col-span-1 ml-6">
                <p className="font-normal text-sm text-slate-600 pt-10">
                  Обновление персональных данных
                </p>
              </div>
              <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                <div className="col-span-full sm:col-span-3">
                  <div className="pt-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <Field inputFields={inputFieldsLastName} />
                  </div>
                </div>
                <div className="col-span-full sm:col-span-3">
                  <div className="pt-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <Field inputFields={inputFieldsFirstName} />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-3">
                  <div className="pt-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <Field inputFields={inputFieldsMiddleName} />
                  </div>
                </div>
              </div>

              <div className="col-span-full flex justify-center">
                <Button type="submit" title="Сохранить" />
              </div>
            </fieldset>
          </form>
        )}

        <div
          className="w-full bg-slate-100 flex items-center rounded-md hover:bg-slate-100 cursor-pointer my-1"
          onClick={clickOpenPhone}
        >
          <div className=" flex items-center space-x-4 bg-slate-100 px-6 py-2">
            <div className="py-1">
              <DevicePhoneMobileIcon className="cursor-pointer w-4 h-4 text-slate-600 mx-1" />
            </div>

            <span className="text-slate-600 text-sm font-normal">
              Обновление номера телефона
            </span>
          </div>
        </div>

        {openPhone && (
          <form
            //! только телефон
            onSubmit={handleSubmitProfileManagerPhone}
            className="container flex flex-col mx-auto space-y-12"
          >
            <fieldset className="grid grid-cols-4 gap-6 p-2 rounded-md shadow-sm dark:bg-gray-900">
              <div className="w-44 space-y-2 col-span-full lg:col-span-1 ml-6">
                <p className="font-normal text-sm text-slate-600 pt-10">
                  Телефон
                </p>
              </div>
              <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                <div className="col-span-full sm:col-span-3">
                  <div className="pt-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <Field inputFields={inputFieldsPhone} />
                  </div>
                </div>
              </div>
              <div className="col-span-full flex justify-center">
                <Button type="submit" title="Сохранить" />
              </div>
            </fieldset>
          </form>
        )}

        <div
          className="w-full bg-slate-100 flex items-center rounded-md hover:bg-slate-100 cursor-pointer my-1"
          onClick={clickOpenPassword}
        >
          <div className=" flex items-center space-x-4 cursor-pointer px-6 py-2">
            <div className="py-1">
              {' '}
              <LockClosedIcon className="cursor-pointer w-4 h-4 text-slate-600 mx-1" />
            </div>

            <span className="text-slate-600 text-sm font-normal">
              Обновление пароля
            </span>
          </div>
        </div>

        {openPassword && (
          <form
            //! пароль
            onSubmit={handleSubmitProfileManagerPassword}
            className="container flex flex-col mx-auto space-y-12"
          >
            <fieldset className="grid grid-cols-4 gap-6 p-2 rounded-md shadow-sm dark:bg-gray-900">
              <div className="w-44 space-y-2 col-span-full lg:col-span-1 ml-6">
                <p className="font-normal text-sm text-slate-600 pt-10">
                  Обновление пароля
                </p>
              </div>
              <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                <div className="col-span-full sm:col-span-3">
                  <div className="pt-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <Field inputFields={inputFieldsOldPassword} />{' '}
                  </div>
                </div>

                <div className="col-span-full sm:col-span-3">
                  <div className="pt-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <Field inputFields={inputFieldsNewPassword} />{' '}
                  </div>{' '}
                </div>

                <div className="col-span-full sm:col-span-3">
                  <div className="pt-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <Field inputFields={inputFieldsConfirmPassword} />
                  </div>{' '}
                </div>
              </div>
              <div className="col-span-full flex justify-center">
                <Button type="submit" title="Сохранить" />
              </div>
            </fieldset>
          </form>
        )}
      </section>
    </Wrapper>
  );
};

export default ProfileManager;
