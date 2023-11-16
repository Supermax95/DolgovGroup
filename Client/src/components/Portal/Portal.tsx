import { FC, useState } from 'react';
import Button from '../../ui/Button';
import Field from '../../ui/Field';
import ToggleShowPassword from '../../ui/ToggleShowPassword';
import { useAppDispatch } from '../../Redux/hooks';
import { useNavigate } from 'react-router-dom';
import portalLogin from '../../Redux/thunks/PortalLogin/portalLogin.api';

interface IDate {
  email: string;
  password: string;
}

const Portal: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [data, setData] = useState<IDate>({ email: '', password: '' });

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const authHandler = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(portalLogin(data));

      if (portalLogin.fulfilled.match(resultAction)) {
        //! вход для всех - магазины. затем надо будет исправить, что для админа редирект на что-то одно, для менеджера другое, мб
        navigate('/locations');
      }

      if (portalLogin.rejected.match(resultAction)) {
        alert(
          'Невозможно авторизоваться. Проверьте данные и попробуйте снова.'
        );
      }
    } catch (error) {
      console.error('Ошибка при аутентификации:', error);
    }
  };

  const inputFields = [
    {
      id: 'email',
      name: 'email',
      type: 'text',
      placeholder: '',
      autoComplete: 'off',
      htmlFor: 'email',
      title: 'Email',
      onChange: (value: string) => setData({ ...data, email: value }),
      required: true,
    },
    {
      id: 'password',
      name: 'password',
      type: showPassword ? 'text' : 'password',
      placeholder: '',
      autoComplete: 'off',
      htmlFor: 'password',
      title: 'Пароль',
      onChange: (value: string) => setData({ ...data, password: value }),
      required: true,
      children: (
        <ToggleShowPassword
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r  from-lime-200 to-green-200 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-nolmal text-slate-600">
                Портал авторизации. Продуктивной работы 😎
              </h1>
            </div>
            <form onSubmit={authHandler} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <Field inputFields={inputFields} />
                <div className="relative flex justify-center">
                  <Button type="submit" title="Войти" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portal;
