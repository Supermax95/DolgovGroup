import React, { FC, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import Field from 'ui/Field';
import Calendar from './Calendar';
//import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import userRegister from 'Redux/thunks/User/reg.api';
import Button from 'ui/Button';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface IData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
}
export const Registration: FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  // const isLoading = useSelector(
  //   (state: RootState) => state.userSlice.isLoading
  // );
  const user = useAppSelector((state) => state.userSlice.user);
  console.log('я юзуер на регистрации', user);

  const error = useAppSelector((state) => state.userSlice.error);
  const [step, setStep] = useState(1);
  const [data, setData] = useState<IData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
  });
  const [passwordCheck, setPasswordCheck] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const [errorMessages, setErrorMessages] = useState<IData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPasswordRepeat = () => {
    setShowPasswordRepeat(!showPasswordRepeat);
  };

  const handleFieldChange = (field: keyof IData, value: string) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
    setErrorMessages((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const handleSubmit = async () => {
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

  const handleNextStep = () => {
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
        setStep(step + 1); // Переход ко второму шагу
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

  const handlePrevStep = () => {
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
                    {errorMessages.birthDate}
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
