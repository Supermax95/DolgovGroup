import React, { FC, useState } from 'react';
import { View, Text } from 'react-native';
import Field from 'ui/Field';
import Calendar from './Calendar';
import { useDispatch, useSelector } from 'react-redux';
import register from 'Redux/thunks/Register/reg.api';
import Button from 'ui/Button';

interface IData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
}

const styleCenter = 'h-full w-full bg-white pt-16';

export const Registration: FC = () => {
  const isLoading = useSelector((state: RootState) => state.regSlice.isLoading);
  const user = useSelector((state: RootState) => state.regSlice.user);
  const error = useSelector((state: RootState) => state.regSlice.error);

  const [data, setData] = useState<IData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
  });
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [errorMessages, setErrorMessages] = useState<IData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
  });

  const dispatch = useDispatch();

  const handleFieldChange = (field: keyof IData, value: string) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
    setErrorMessages((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const handleSubmit = () => {
    const newErrorMessages = {} as IData;
    let hasError = false;

    if (!data.firstName) {
      newErrorMessages.firstName = 'Заполните имя';
      hasError = true;
    }

    if (!data.lastName) {
      newErrorMessages.lastName = 'Заполните фамилию';
      hasError = true;
    }

    if (!data.middleName) {
      newErrorMessages.middleName = 'Заполните отчество';
      hasError = true;
    }

    if (!data.email) {
      newErrorMessages.email = 'Заполните email';
      hasError = true;
    }

    if (!data.password) {
      newErrorMessages.password = 'Заполните пароль';
      hasError = true;
    }

    if (!passwordCheck) {
      newErrorMessages.password = 'Подтвердите пароль';
      hasError = true;
    }

    if (!data.birthDate) {
      newErrorMessages.birthDate = 'Введите дату рождения';
      hasError = true;
    }

    if (data.password !== passwordCheck) {
      newErrorMessages.password = 'Пароли не совпадают';
      hasError = true;
    }

    if (data.password.length < 6) {
      newErrorMessages.password = 'Пароль слишком короткий';
      hasError = true;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(data.email)) {
      newErrorMessages.email = 'Введите корректный email';
      hasError = true;
    }

    if (hasError) {
      setErrorMessages(newErrorMessages);
      return;
    }

    dispatch(register(data));

    console.log('Имя:', data.firstName);
    console.log('Фамилия:', data.lastName);
    console.log('Отчество:', data.middleName);
    console.log('Email:', data.email);
    console.log('Пароль:', data.password);
    console.log('Проверка пароля:', passwordCheck);
    console.log('День рождения', data.birthDate);

    setAllFieldsFilled(true);
  };

  return (
    <View className={styleCenter}>
      <View className="mx-1 justify-center items-center h-full">
        <Text className="text-center text-gray-800 text-2xl font-bold mb-2">
          Регистрация
        </Text>
        <View className="w-10/12">
          <Field
            value={data.firstName}
            placeholder="Имя"
            onChange={(value) => handleFieldChange('firstName', value)}
            autoCapitalize="words"
          />
          {errorMessages.firstName && (
            <Text className="text-red-500 ml-1 mt-1 text-xs">{errorMessages.firstName}</Text>
          )}
          <Field
            value={data.lastName}
            placeholder="Фамилия"
            onChange={(value) => handleFieldChange('lastName', value)}
            autoCapitalize="words"
          />
          {errorMessages.lastName && (
            <Text className="text-red-500 ml-1 mt-1 text-xs">{errorMessages.lastName}</Text>
          )}
          <Field
            value={data.middleName}
            placeholder="Отчество"
            onChange={(value) => handleFieldChange('middleName', value)}
            autoCapitalize="words"
          />
          {errorMessages.middleName && (
            <Text className="text-red-500 ml-1 mt-1 text-xs">
              {errorMessages.middleName}
            </Text>
          )}
          <Field
            value={data.email}
            placeholder="Email"
            onChange={(value) => handleFieldChange('email', value)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {errorMessages.email && (
            <Text className="text-red-500 ml-1 mt-1 text-xs">{errorMessages.email}</Text>
          )}
          <Field
            value={data.password}
            placeholder="Пароль"
            onChange={(value) => handleFieldChange('password', value)}
            isSecure={true}
            autoCapitalize="none"
          />
          {errorMessages.password && (
            <Text className="text-red-500 ml-1 mt-1 text-xs">{errorMessages.password}</Text>
          )}
          <Field
            value={passwordCheck}
            placeholder="Подтвердите пароль"
            onChange={(value) => setPasswordCheck(value)}
            isSecure={true}
            autoCapitalize="none"
          />
          {errorMessages.password && (
            <Text className="text-red-500 ml-1 mt-1 text-xs">{errorMessages.password}</Text>
          )}

          <Calendar
            onDateChange={(selectedDate) =>
              handleFieldChange('birthDate', selectedDate)
            }
          />

          {errorMessages.birthDate && (
            <Text className="text-red-500 ml-1 mt-1 text-xs">{errorMessages.birthDate}</Text>
          )}

          <Text className="text-center text-lg">
            {data.birthDate ? data.birthDate.toLocaleDateString() : ''}
          </Text>

          <Button onPress={handleSubmit} title={`Зарегистрироваться`} />
          {isLoading ? (
            // Показать загрузочное сообщение
            <Text>Loading...</Text>
          ) : user ? (
            // Показать сообщение об успешной регистрации
            <Text>Регистрация прошла успешно</Text>
          ) : error ? (
            // Показать сообщение об ошибке
            <Text className="text-red-500 ml-1 mt-1 text-xs">{error}</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};
