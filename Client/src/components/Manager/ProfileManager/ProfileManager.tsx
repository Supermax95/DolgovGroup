import React, { useState } from 'react';
import Wrapper from '../../../ui/Wrapper';
import Field from '../../../ui/Field';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../Redux/hooks';
import ToggleShowPassword from '../../../ui/ToggleShowPassword';
import Button from '../../../ui/Button';

interface IDate {
  email: string;
  password: string;
}

function ProfileManager() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

  const [data, setData] = useState<IDate>({ email: '', password: '' });

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };
  const toggleShowRepeatPassword = (): void => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <div className="flex flex-wrap mt-20">
      <div className="flex w-full flex-col md:w-1/2">
        {/* <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
          <a
            href="#"
            className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900"
          >
            {' '}
            Damasus .{' '}
          </a>
        </div> */}
        <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
          <p className="text-left text-3xl font-bold text-slate-600">
            Добро пожаловать, Olivia
          </p>
          {/* <p className="mt-2 text-left text-gray-500">
            Welcome back, please enter your details.
          </p> */}
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
              <Field
                id="lastName"
                name="lastName"
                type="text"
                placeholder=""
                autoCapitalize="words"
                autoComplete="off"
                htmlFor="lastName"
                title="Фамилия"
                onChange={(value) => setData({ ...data, email: value })}
                required={true}
              />
              <Field
                id="firstName"
                name="firstName"
                type="text"
                placeholder=""
                autoCapitalize="words"
                autoComplete="off"
                htmlFor="firstName"
                title="Имя"
                onChange={(value) => setData({ ...data, email: value })}
                required={true}
              />
              <Field
                id="middleName"
                name="middleName"
                type="text"
                placeholder=""
                autoCapitalize="words"
                autoComplete="off"
                htmlFor="middleName"
                title="Отчество"
                onChange={(value) => setData({ ...data, email: value })}
                required={true}
              />
              <Field
                id="email"
                name="email"
                type="text"
                placeholder=""
                autoCapitalize="none"
                autoComplete="off"
                htmlFor="email"
                title="Email"
                onChange={(value) => setData({ ...data, email: value })}
                required={true}
              />

              <Field
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder=""
                autoCapitalize="none"
                autoComplete="off"
                htmlFor="password"
                title="Пароль"
                onChange={(value) => setData({ ...data, password: value })}
                required={true}
              >
                <ToggleShowPassword
                  showPassword={showPassword}
                  toggleShowPassword={toggleShowPassword}
                />
              </Field>
              <Field
                id="repeatPassword"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder=""
                autoCapitalize="none"
                autoComplete="off"
                htmlFor="repeatPassword"
                title="Повторите пароль"
                onChange={(value) => setData({ ...data, password: value })}
                required={true}
              >
                <ToggleShowPassword
                  showPassword={showRepeatPassword}
                  toggleShowPassword={toggleShowRepeatPassword}
                />
              </Field>
              {/* <button
                type="submit"
                className="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
              >
                Сохранить
              </button> */}
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
            We work 10x faster than our compeititors and stay consistant. While
            they're bogged won with techincal debt, we're realeasing new
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
  );
}

export default ProfileManager;
