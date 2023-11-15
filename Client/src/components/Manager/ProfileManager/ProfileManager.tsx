import React, { useState, useEffect, FC } from 'react';
import Field from '../../../ui/Field';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import ToggleShowPassword from '../../../ui/ToggleShowPassword';
import Button from '../../../ui/Button';
import editProfileManager from '../../../Redux/thunks/Manager/profileManager.api';
import changePassword from '../../../Redux/thunks/Manager/changePassword.api';

interface IDate {
  newLastName: string;
  newFirstName: string;
  newMiddleName: string;
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

  const managerProfile = useAppSelector<{
    lastName?: string;
    firstName?: string;
    middleName?: string;
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

  //! сделать регистр первой буквы заглавной для ФИО
  const inputFieldsName = [
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

  const inputFieldsPassword = [
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
    <div className="pt-[70px]">
      <div className="flex flex-wrap h-full">
        <div className="flex w-full flex-col md:w-1/2">
          <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
            <p className="text-center text-2xl font-bold text-slate-600">
              Добро пожаловать, {managerProfile.firstName}
            </p>
            <p className="mt-2 text-center text-slate-500">
              Здесь вы можете обновить свои данные
            </p>
            <form
              onSubmit={handleSubmitProfileManager}
              className="flex flex-col"
            >
              <div className="pt-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <Field inputFields={inputFieldsName} />

                <div className="relative flex justify-center">
                  <Button type="submit" title="Сохранить" />
                </div>
              </div>
            </form>
            <p className="mt-2 text-center text-slate-500">Обновление пароля</p>
            <form
              onSubmit={handleSubmitProfileManagerPassword}
              className="flex flex-col"
            >
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <Field inputFields={inputFieldsPassword} />

                <div className="relative flex justify-center">
                  <Button type="submit" title="Сохранить" />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
          <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
            <p className="mb-8 text-3xl font-semibold leading-10">
              We work 10x faster than our compeititors and stay consistant.
              While they're bogged won with techincal debt, we're realeasing new
              features.
            </p>
            <p className="mb-4 text-3xl font-semibold">John Elmond</p>
            <p className="">Founder, Emogue</p>
            <p className="mb-7 text-sm opacity-70">Web Design Agency</p>
          </div>
          <img
            className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
            src="https://images.unsplash.com/photo-1565301660306-29e08751cc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;
