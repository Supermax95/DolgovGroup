import React, { useState, useEffect, FC } from 'react';
import Field from '../../../ui/Field';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import ToggleShowPassword from '../../../ui/ToggleShowPassword';
import Button from '../../../ui/Button';
import editProfileManager from '../../../Redux/thunks/Manager/profileManager.api';
import changePassword from '../../../Redux/thunks/Manager/changePassword.api';
import changePhone from '../../../Redux/thunks/Manager/changePhone.api';
import getManagerInfo from '../../../Redux/thunks/Manager/getManagerInfo.api';
import Wrapper from '../../../ui/Wrapper';
import RoleSidebar from '../../RoleSidebar/RoleSidebar';

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getManagerInfo());
  }, [dispatch]);

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

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<PasswordChangeData>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

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

    try {
      const resultEdit = await dispatch(
        editProfileManager({
          managerId,
          newLastName: data.newLastName,
          newFirstName: data.newFirstName,
          newMiddleName: data.newMiddleName,
        })
      );

      if (editProfileManager.fulfilled.match(resultEdit)) {
        alert('Данные успешно обновлены');
      }

      if (editProfileManager.rejected.match(resultEdit)) {
        alert('Не удалось обновить данные. Попробуйте ещё раз.');
      }
    } catch (error) {
      console.error('Ошибка обновления данных:', error);
    }
  };

  //* изменение номера
  const handleSubmitProfileManagerPhone = async (
    e: React.FormEvent
  ): Promise<void> => {
    e.preventDefault();

    try {
      const resultEdit = await dispatch(
        changePhone({
          managerId,
          newPhone: data.newPhone,
        })
      );

      if (changePhone.fulfilled.match(resultEdit)) {
        alert('Данные успешно обновлены');
      }

      if (changePhone.rejected.match(resultEdit)) {
        alert('Не удалось обновить данные. Попробуйте ещё раз.');
      }
    } catch (error) {
      console.error('Ошибка обновления данных:', error);
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
        if (changePassword.rejected.match(resultEdit)) {
          alert('Не удалось обновить данные. Попробуйте ещё раз');
        } else if (changePassword.fulfilled.match(resultEdit)) {
          alert('Пароль успешно изменён');
        }
      } catch (error) {
        alert('Введён неверный текущий пароль или произошла ошибка');
        console.error('Ошибка обновления данных:', error);
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
      <RoleSidebar />

      <section
        //! Form
        className="p-6 bg-slate-50 dark:text-gray-50"
      >
        <h1 className="text-center text-xl font-normal text-slate-700">
          Добро пожаловать, {managerProfile.firstName}
        </h1>
        <p className="text-center font-normal text-md text-slate-600 mx-auto mt-2">
          {/* Здесь вы можете легко управлять своими персональными данными */}
          Здесь вы можете легко управлять своими учетными данными
        </p>

        <form
          //! FIO
          onSubmit={handleSubmitProfileManager}
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
            <div className="w-44 space-y-2 col-span-full lg:col-span-1">
              <p className="font-normal text-md text-slate-600 pt-6">
                {/* Обновление персональных <br /> данных */}
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

        <form
          //! только телефон
          onSubmit={handleSubmitProfileManagerPhone}
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
            <div className="w-44 space-y-2 col-span-full lg:col-span-1">
              <p className="font-normal text-md text-slate-600 pt-10">
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

        <form
          //! пароль
          onSubmit={handleSubmitProfileManagerPassword}
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
            <div className="w-44 space-y-2 col-span-full lg:col-span-1">
              <p className="font-normal text-md text-slate-600 pt-10">
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
                </div>
              </div>

              <div className="col-span-full sm:col-span-3">
                <div className="pt-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <Field inputFields={inputFieldsConfirmPassword} />
                </div>
              </div>
            </div>
            <div className="col-span-full flex justify-center">
              <Button type="submit" title="Сохранить" />
            </div>
          </fieldset>
        </form>
      </section>
    </Wrapper>
  );
};

export default ProfileManager;
