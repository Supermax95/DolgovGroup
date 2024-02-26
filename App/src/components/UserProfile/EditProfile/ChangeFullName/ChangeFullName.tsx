import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import { View, Text, Alert } from 'react-native';
import FieldInput from 'ui/FieldInput';
import Button from 'ui/Button';
import profileChangeFullName from 'Redux/thunks/Profile/profileChangeFullName.api';
import Padding from 'ui/Padding';
import { SafeAreaView } from 'react-native-safe-area-context';
import UniversalHeader from 'ui/UniversalHeader';

interface IFullName {
  newLastName: string;
  newFirstName: string;
  newMiddleName: string;
}

const ChangeFullName: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp>();
  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );
  // const userId = useAppSelector<number>((state) => state.userSlice.user.id);

  const dateProfile = useAppSelector<{
    lastName?: string;
    firstName?: string;
    middleName?: string;
  }>((state) => state.profileSlice);

  const [data, setData] = useState<IFullName>({
    newLastName: dateProfile.lastName || '',
    newFirstName: dateProfile.firstName || '',
    newMiddleName: dateProfile.middleName || '',
  });

  const [errorMessages, setErrorMessages] = useState<IFullName>({
    newLastName: '',
    newFirstName: '',
    newMiddleName: '',
  });

  const validateCyrillicName = (name: string): boolean => {
    const cyrillicRegex = /^[А-Яа-яЁё]+$/;
    return cyrillicRegex.test(name);
  };

  const handleFieldChange = (field: keyof IFullName, value: string): void => {
    setData((prevData) => ({ ...prevData, [field]: value }));
    setErrorMessages((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const handlerSubmitFullName = async (): Promise<void> => {
    if (!data.newLastName || !data.newFirstName || !data.newMiddleName) {
      setErrorMessages({
        newLastName: !data.newLastName ? 'Введите свою фамилию' : '',
        newFirstName: !data.newFirstName ? 'Введите свое имя' : '',
        newMiddleName: !data.newMiddleName ? 'Введите своё отчество' : '',
      });
    } else if (
      !validateCyrillicName(data.newLastName) ||
      !validateCyrillicName(data.newFirstName) ||
      !validateCyrillicName(data.newMiddleName)
    ) {
      setErrorMessages({
        newLastName: !validateCyrillicName(data.newLastName)
          ? 'Фамилия должна содержать только кириллические символы'
          : '',
        newFirstName: !validateCyrillicName(data.newFirstName)
          ? 'Имя должно содержать только кириллические символы'
          : '',
        newMiddleName: !validateCyrillicName(data.newMiddleName)
          ? 'Отчество должно содержать только кириллические символы'
          : '',
      });
    } else {
      try {
        const result = await dispatch(
          profileChangeFullName({
            token,
            newLastName: data.newLastName,
            newFirstName: data.newFirstName,
            newMiddleName: data.newMiddleName,
          })
        );

        if (result.meta.requestStatus === 'rejected') {
          Alert.alert(
            'Ошибка',
            'Произошла ошибка при изменении личных данных. Пожалуйста, попробуйте ещё раз.'
          );
        } else if (result.meta.requestStatus === 'fulfilled') {
          Alert.alert('Данные обновлены', 'Ваши данные успешно обновлены', [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('EditProfile');
              },
            },
          ]);
        }
      } catch (error) {
        Alert.alert(
          'Ошибка',
          'Данного пользователя не существует или произошла ошибка'
        );
      }
    }
  };

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title="Изменение профиля"
      />

      <Padding>
        <Padding>
          <FieldInput
            value={data.newLastName}
            placeholder="Фамилия"
            onChange={(value) => handleFieldChange('newLastName', value)}
            autoCapitalize="words"
          />
          {errorMessages.newLastName && (
            <Text className="text-red-500 ml-1 mt-1 text-xs">
              {errorMessages.newLastName}
            </Text>
          )}
          <FieldInput
            value={data.newFirstName}
            placeholder="Имя"
            onChange={(value) => handleFieldChange('newFirstName', value)}
            autoCapitalize="words"
          />
          {errorMessages.newFirstName && (
            <Text className="text-red-500 ml-1 mt-1 text-xs">
              {errorMessages.newFirstName}
            </Text>
          )}
          <FieldInput
            value={data.newMiddleName}
            placeholder="Отчество"
            onChange={(value) => handleFieldChange('newMiddleName', value)}
            autoCapitalize="words"
          />
          {errorMessages.newMiddleName && (
            <Text className="text-red-500 ml-1 mt-1 text-xs">
              {errorMessages.newMiddleName}
            </Text>
          )}
          <Button onPress={handlerSubmitFullName} title="Сохранить" />
        </Padding>
      </Padding>
    </SafeAreaView>
  );
};

export default ChangeFullName;
