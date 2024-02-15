import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import { View, Text, Alert } from 'react-native';
import FieldInput from 'ui/FieldInput';
import Button from 'ui/Button';
import Padding from 'ui/Padding';
import profileChangeEmail from 'Redux/thunks/Profile/profileChangeEmail.api';
import { SafeAreaView } from 'react-native-safe-area-context';
import UniversalHeader from 'ui/UniversalHeader';

interface IChangeEmail {
  newEmail: string;
}

const ChangeEmail: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp>();
  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );

  const emailProfile = useAppSelector<string>(
    (state) => state.profileSlice.email
  );

  const newEmailProfile = useAppSelector<string>(
    (state) => state.profileSlice.newEmail
  );

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const [data, setData] = useState<IChangeEmail>({
    newEmail: emailProfile || '',
  });

  const [errorMessages, setErrorMessages] = useState<IChangeEmail>({
    newEmail: '',
  });

  const handleFieldChange = (
    field: keyof IChangeEmail,
    value: string
  ): void => {
    setData((prevData) => ({ ...prevData, [field]: value }));
    setErrorMessages((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const handlerSubmitEmail = async (): Promise<void> => {
    if (!data.newEmail || !validateEmail(data.newEmail)) {
      setErrorMessages({
        newEmail: !data.newEmail
          ? 'Введите почту'
          : 'Введите корректный адрес электронной почты',
      });
    } else {
      try {
        const result = await dispatch(
          profileChangeEmail({
            token,
            newEmail: data.newEmail,
          })
        );

        if (result.meta.requestStatus === 'rejected') {
          Alert.alert(
            'Ошибка',
            'Пользователь с такой электронной почтой уже существует'
          );
        } else if (result.meta.requestStatus === 'fulfilled') {
          Alert.alert(
            'На новую почту было отправлено письмо',
            'Подтвердите новую почту',
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('EditProfile');
                },
              },
            ]
          );
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
            value={data.newEmail}
            placeholder="Email"
            onChange={(value) => handleFieldChange('newEmail', value)}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {errorMessages.newEmail && (
            <Text className="text-red-500 ml-1 mt-1 text-xs">
              {errorMessages.newEmail}
            </Text>
          )}

          {newEmailProfile !== '' ? (
            <View className="w-full justify-center mt-1 px-1">
              <Text className="text-xs font-molmal text-rose-500">
                Новая почта не подтверждена {newEmailProfile}
              </Text>
            </View>
          ) : null}

          <View className="w-full justify-center mt-2 px-1">
            <Text className="text-xs font-molmal text-zinc-500">
              Если вы не подтвердите адрес электронной почты, то изменения не
              будут внесены
            </Text>
          </View>

          <Button onPress={handlerSubmitEmail} title="Сохранить" />
        </Padding>
      </Padding>
    </SafeAreaView>
  );
};

export default ChangeEmail;
