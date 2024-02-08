import React, { FC, useState } from 'react';
import { useAppDispatch } from 'Redux/hooks';
import {
  View,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Button from 'ui/Button';
import FieldInput from 'ui/FieldInput';
import Calendar from '../Calendar/Calendar';
import userRegister from 'Redux/thunks/User/reg.api';
import { TextInputMask } from 'react-native-masked-text';

interface IData {
  email?: string;
  phoneNumber?: string;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<IData>({
    email: '',
    phoneNumber: '',
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
    phoneNumber: '',
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

  const handleLegalPolicyPress = () => {
    navigation.navigate('AboutApplication');
  };

  const handleFieldChange = (
    field: keyof IData,
    value: string | Date
  ): void => {
    setData((prevData) => ({ ...prevData, [field]: value }));
    setErrorMessages((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const validateEmail = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(data.email || '');
  };

  const validatePhoneNumber = (): boolean => {
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return phoneRegex.test(data.phoneNumber || '');
  };

  const validatePassword = (): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*\d).{6,}$/;
    return passwordRegex.test(data.password || '');
  };

  const validateCyrillicName = (name: string): boolean => {
    const cyrillicRegex = /^[А-Яа-яЁё]+$/;
    return cyrillicRegex.test(name);
  };

  const handleSubmit = async (): Promise<void> => {
    if (step === 2) {
      if (
        !validateEmail() ||
        !validatePhoneNumber() ||
        !validatePassword() ||
        data.password !== passwordCheck
      ) {
        setErrorMessages({
          email: !validateEmail() ? 'Введите корректный email' : '',
          phoneNumber: !validatePhoneNumber()
            ? 'Введите корректный телефон'
            : '',
          password: !validatePassword()
            ? 'Пароль должен содержать минимум 6 символов, включая заглавные и строчные буквы, а также цифры.'
            : '',
          passwordCheck:
            data.password !== passwordCheck ? 'Пароли не совпадают' : '',
        });
        return;
      } else {
        setErrorMessages({});
      }
    }
    Alert.alert(
      'Подтверждение',
      'Вы уверены, что ввели свои данные корректно?',
      [
        {
          text: 'Нет',
          style: 'cancel',
        },
        {
          text: 'Да',
          onPress: async () => {
            try {
              setIsLoading(true);
              const result = await dispatch(userRegister(data));
              if (result.meta.requestStatus === 'rejected') {
                setTimeout(() => {
                  setIsLoading(false);
                  Alert.alert('Ошибка', result.payload);
                }, 2000);
                setTimeout(() => {
                  setIsLoading(false);
                }, 2000);
              } else if (result.meta.requestStatus === 'fulfilled') {
                setTimeout(() => {
                  setIsLoading(false);
                  navigation.navigate('CheckMail');
                }, 2000);
              }
            } catch (error) {
              setIsLoading(false);
              console.error('Произошла ошибка при отправке запроса:', error);
            }
          },
        },
      ]
    );
  };

  const handleNextStep = (): void => {
    if (step === 1) {
      if (
        !validateCyrillicName(data.firstName) ||
        !validateCyrillicName(data.lastName) ||
        !validateCyrillicName(data.middleName) ||
        !data.birthDate
      ) {
        setErrorMessages({
          firstName: !validateCyrillicName(data.firstName)
            ? 'Имя должно содержать только кириллические символы'
            : '',
          lastName: !validateCyrillicName(data.lastName)
            ? 'Фамилия должна содержать только кириллические символы'
            : '',
          middleName: !validateCyrillicName(data.middleName)
            ? 'Отчество должно содержать только кириллические символы'
            : '',
          birthDate: !data.birthDate ? 'Введите дату рождения' : '',
        });
      } else {
        setErrorMessages({});
        setStep(step + 1);
      }
    } else if (step === 2) {
      if (
        !validateEmail() ||
        !validatePhoneNumber() ||
        !validatePassword() ||
        data.password !== passwordCheck
      ) {
        setErrorMessages({
          email: !validateEmail() ? 'Введите корректный email' : '',
          phoneNumber: !validatePhoneNumber()
            ? 'Введите корректный телефон'
            : '',
          password: !validatePassword()
            ? 'Пароль должен содержать цифры, строчные и заглавные буквы, не менее 8 символов'
            : '',
          passwordCheck:
            data.password !== passwordCheck ? 'Пароли не совпадают' : '',
        });
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
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="green" />
        </View>
      ) : (
        <View className="h-full w-full bg-white">
          <View className="mx-1 justify-center items-center h-full">
            <View className="w-10/12">
              {step === 1 && (
                <>
                  <Text className="text-center text-gray-800 text-2xl font-bold mb-2">
                    Первый шаг регистрации
                  </Text>
                  <FieldInput
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
                  <FieldInput
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
                  <FieldInput
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
                    Осталось еще чуть-чуть
                  </Text>
                  <FieldInput
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
                    <TextInputMask
                      className="rounded-xl bg-gray-100 mt-3 p-3 w-full"
                      type={'custom'}
                      options={{
                        mask: '+7 (999) 999-99-99',
                      }}
                      value={data.phoneNumber}
                      onChangeText={(text) =>
                        handleFieldChange('phoneNumber', text)
                      }
                      placeholder="+7 (___) ___-__-__"
                      keyboardType="number-pad"
                    />
                  </View>
                  {errorMessages.phoneNumber && (
                    <Text className="text-red-500 ml-1 mt-1 text-xs">
                      {errorMessages.phoneNumber}
                    </Text>
                  )}

                  <View className="flex-row items-center">
                    <FieldInput
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
                    <FieldInput
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
                  {errorMessages.passwordCheck && (
                    <Text className="text-red-500 ml-1 mt-1 text-xs">
                      {errorMessages.passwordCheck}
                    </Text>
                  )}
                  <View className="mt-2">
                    <Text className="text-grey-800 text-xs font-normal ml-1 ">
                      Регистрируясь, вы соглашаетесь с{' '}
                    </Text>
                    <TouchableOpacity onPress={handleLegalPolicyPress}>
                      <Text className="text-lime-600 text-xs font-normal ml-1 underline">
                      правовой политикой компании
                      </Text>
                    </TouchableOpacity>
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
      )}
    </ScrollView>
  );
};
