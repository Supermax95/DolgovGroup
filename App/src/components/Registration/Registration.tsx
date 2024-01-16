import React, { FC, useState } from 'react';
import { useAppDispatch } from 'Redux/hooks';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Button from 'ui/Button';
import Field from 'ui/Field';
import Calendar from '../Calendar/Calendar';
import userRegister from 'Redux/thunks/User/reg.api';

interface IData {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  birthDate?: Date | null | string;
  passwordCheck?: string;
}

export const Registration: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<IData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: null || '',
  });

  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<IData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: null || '',
    passwordCheck: '',
  });

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleShowPasswordRepeat = (): void => {
    setShowPasswordRepeat(!showPasswordRepeat);
  };

  const handleFieldChange = (
    field: keyof IData,
    value: string | Date
  ): void => {
    setData((prevData) => ({ ...prevData, [field]: value }));
    setErrorMessages((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const handleSubmit = async (): Promise<void> => {
    if (step === 2) {
      if (!data.email || !data.password || !passwordCheck) {
        setErrorMessages({
          ...errorMessages,
          email: !data.email ? 'Заполните email' : '',
          password: !data.password ? 'Заполните пароль' : '',
          passwordCheck: !passwordCheck ? 'Подтвердите пароль' : '',
        });
        return;
      } else if (data.password !== passwordCheck) {
        setErrorMessages({ ...errorMessages, password: 'Пароли не совпадают' });
        return;
      } else {
        setErrorMessages({});
      }
    }

    try {
      const result = await dispatch(userRegister(data));
      if (result.meta.requestStatus === 'rejected') {
        Alert.alert(
          'Ошибка',
          'Пользователь с данным email существует или произошла ошибка'
        );
      } else if (result.meta.requestStatus === 'fulfilled') {
        navigation.navigate('CheckMail');
      }
    } catch (error) {
      console.error('Произошла ошибка при отправке запроса:', error);
    }
  };

  const handleNextStep = (): void => {
    if (step === 1) {
      if (
        !data.firstName ||
        !data.lastName ||
        !data.middleName ||
        !data.birthDate
      ) {
        setErrorMessages({
          ...errorMessages,
          firstName: !data.firstName ? 'Заполните имя' : '',
          lastName: !data.lastName ? 'Заполните фамилию' : '',
          middleName: !data.middleName ? 'Заполните отчество' : '',
          birthDate: !data.birthDate ? 'Введите дату рождения' : '',
        });
      } else {
        setErrorMessages({});
        setStep(step + 1);
      }
    } else if (step === 2) {
      if (!data.email || !data.password || !passwordCheck) {
        setErrorMessages({
          ...errorMessages,
          email: !data.email ? 'Заполните email' : '',
          password: !data.password ? 'Заполните пароль' : '',
          passwordCheck: !passwordCheck ? 'Подтвердите пароль' : '',
        });
      } else if (data.password !== passwordCheck) {
        setErrorMessages({ ...errorMessages, password: 'Пароли не совпадают' });
      } else {
        setErrorMessages({});
      }
    }
  };

  const handlePrevStep = (): void => {
    setStep(step - 1);
  };

  return (
    <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
      <View className="h-full w-full bg-white">
        <View className="mx-1 justify-center items-center h-full">
          <View className="w-10/12">
            {step === 1 && (
              <>
                <Text className="text-center text-gray-800 text-2xl font-bold mb-2">
                  Заполните поля
                </Text>
                <Field
                  value={data.lastName}
                  placeholder="Фамилия"
                  onChange={(value) => handleFieldChange('lastName', value)}
                  autoCapitalize="words"
                />
                {errorMessages.lastName && (
                  <Text className="text-red-500 ml-1 mt-1 text-xs">
                    {errorMessages.lastName}
                  </Text>
                )}
                <Field
                  value={data.firstName}
                  placeholder="Имя"
                  onChange={(value) => handleFieldChange('firstName', value)}
                  autoCapitalize="words"
                />
                {errorMessages.firstName && (
                  <Text className="text-red-500 ml-1 mt-1 text-xs">
                    {errorMessages.firstName}
                  </Text>
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
                <Calendar
                  onDateChange={(selectedDate) =>
                    handleFieldChange('birthDate', selectedDate)
                  }
                />

                {errorMessages.birthDate && (
                  <Text className="text-red-500 ml-1 mt-1 text-xs">
                    {errorMessages.birthDate
                      ? errorMessages.birthDate.toLocaleString()
                      : ''}
                  </Text>
                )}
                <Button onPress={handleNextStep} title="Далее" />
              </>
            )}
            {step === 2 && (
              <>
                <Text className="text-center text-gray-800 text-2xl font-bold mb-2">
                  Заполните еще раз поля
                </Text>
                <Field
                  value={data.email}
                  placeholder="Email"
                  onChange={(value) => handleFieldChange('email', value)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                {errorMessages.email && (
                  <Text className="text-red-500 ml-1 mt-1 text-xs">
                    {errorMessages.email}
                  </Text>
                )}
                <View className="flex-row items-center">
                  <Field
                    value={data.password}
                    placeholder="Пароль"
                    onChange={(value) => handleFieldChange('password', value)}
                    isSecure={!showPassword}
                    autoCapitalize="none"
                  />
                  <MaterialCommunityIcons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={25}
                    color="gray"
                    onPress={toggleShowPassword}
                    style={{
                      position: 'absolute',
                      right: 15,
                      transform: [{ translateY: 5 }],
                    }}
                  />
                </View>
                {errorMessages.password && (
                  <Text className="text-red-500 ml-1 mt-1 text-xs">
                    {errorMessages.password}
                  </Text>
                )}
                <View className="flex-row items-center">
                  <Field
                    value={passwordCheck}
                    placeholder="Подтвердите пароль"
                    onChange={(value) => {
                      setPasswordCheck(value);
                      setErrorMessages((prevErrors) => ({
                        ...prevErrors,
                        password: '',
                      }));
                    }}
                    isSecure={!showPasswordRepeat}
                    autoCapitalize="none"
                  />
                  <MaterialCommunityIcons
                    name={showPasswordRepeat ? 'eye' : 'eye-off'}
                    size={25}
                    color="gray"
                    onPress={toggleShowPasswordRepeat}
                    style={{
                      position: 'absolute',
                      right: 15,
                      transform: [{ translateY: 5 }],
                    }}
                  />
                </View>
                {errorMessages.password && (
                  <Text className="text-red-500 ml-1 mt-1 text-xs">
                    {errorMessages.password}
                  </Text>
                )}
                <View className="mt-2">
                  <Text className=" text-gray-800 ml-1 text-xs font-normal">
                    Регестрируясь вы соглашаетесь продать душу дьяволу
                  </Text>
                </View>
                <Button
                  onPress={handlePrevStep}
                  title="Назад"
                  colors={['bg-red-200', 'bg-lime-300']}
                />
                <Button onPress={handleSubmit} title={`Зарегистрироваться`} />
              </>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
