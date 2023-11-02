import React, { useState, useEffect, FC } from 'react';
import Wrapper from '../../../ui/Wrapper';
import Field from '../../../ui/Field';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import ToggleShowPassword from '../../../ui/ToggleShowPassword';
import Button from '../../../ui/Button';
import portalCheck from '../../../Redux/thunks/PortalLogin/portalCheck';
import getProfileManager from '../../../Redux/thunks/Manager/profileManager.api';

interface IDate {
  newLastName: string;
  newFirstName: string;
  newMiddleName: string;
  newEmail: string;
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


  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  //* третий способ
  const managerId = useAppSelector<number>(
    (state) => state.managerSlice.manager.id
  );


  //! отправляет данные на бэк, чтобы получить ответ о конкретном менеджере
  useEffect(() => {
    if (managerId) {
      dispatch(getProfileManager({ managerId }));
    }
  }, [dispatch, managerId]);

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
    setData((prevData) => ({
      ...prevData,
      newLastName: managerProfile.lastName || '',
      newFirstName: managerProfile.firstName || '',
      newMiddleName: managerProfile.middleName || '',
      newEmail: managerProfile.email || '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  }, [managerProfile]);

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };
  const toggleShowNewPassword = (): void => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleShowConfirmPassword = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleFieldChangeProfileManager = (
    field: keyof IDate,
    value: string
  ): void => {
    setData((prevDate) => ({ ...prevDate, [field]: value }));
  };

  const inputFields = [
    {
      id: 'lastName',
      name: 'lastName',
      type: 'text',
      placeholder: data.newLastName,
      autoCapitalize: 'words',
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
      autoCapitalize: 'words',
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
      autoCapitalize: 'words',
      autoComplete: 'off',
      htmlFor: 'middleName',
      title: 'Отчество',
      value: data.newMiddleName,
      onChange: (value: string) =>
        handleFieldChangeProfileManager('newMiddleName', value),
      required: true,
    },
    {
      id: 'oldPassword',
      //!
      name: 'oldPassword',
      type: showPassword ? 'text' : 'password',
      placeholder: data.oldPassword,
      autoCapitalize: 'none',
      autoComplete: 'off',
      htmlFor: 'password',
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
    },
    {
      id: 'newPassword',
      //!
      name: 'newPassword',
      type: showNewPassword ? 'text' : 'password',
      placeholder: data.newPassword,
      autoCapitalize: 'none',
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
    },
    {
      id: 'confirmPassword',
      //!
      name: 'confirmPassword',
      type: showConfirmPassword ? 'text' : 'password',
      placeholder: data.confirmPassword,
      autoCapitalize: 'none',
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
            {/* <button className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white">
            <img
              className="mr-2 h-5"
              src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
            />
            Log in with Google
          </button> */}
            {/* <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
            <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">
              or
            </div>
          </div> */}
            <form className="flex flex-col">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <Field inputFields={inputFields} />

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
