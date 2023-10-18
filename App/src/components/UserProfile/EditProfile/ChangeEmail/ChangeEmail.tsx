import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import { View, Text, Alert } from 'react-native';
import Field from 'ui/Field';
import Button from 'ui/Button';
import Padding from 'ui/Padding';
import profileChangeEmail from 'Redux/thunks/Profile/profileChangeEmail.api';

interface IChangeEmail {
  newEmail: string;
}

const ChangeEmail = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp>();
  const userId = useAppSelector((state) => state.userSlice.user.id);

  const emailProfile = useAppSelector((state) => state.profileSlice.email);

  const [data, setData] = useState<IChangeEmail>({
    newEmail: emailProfile || '',
  });

  const [errorMessages, setErrorMessages] = useState<IChangeEmail>({
    newEmail: '',
  });

  const handleFieldChange = (field: keyof IChangeEmail, value: string) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
    setErrorMessages((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const handlerSubmitFullName = async () => {
    if (!data.newEmail) {
      setErrorMessages({
        newEmail: !data.newEmail ? 'Введите почту' : '',
      });
    } else {
      try {
        const result = await dispatch(
          profileChangeEmail({
            userId,
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
            'Ваша почта успешно обновлена',
            'Ваша почта успешно обновлена',
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
    <View className="bg-white h-full">
      <Padding>
        <Padding>
          <Field
            value={data.newEmail}
            placeholder="Email"
            onChange={(value) => handleFieldChange('newEmail', value)}
            autoCapitalize="none"
          />
          {errorMessages.newEmail && (
            <Text className="text-red-500 ml-1 mt-1 text-xs">
              {errorMessages.newEmail}
            </Text>
          )}
          <Button onPress={handlerSubmitFullName} title="Сохранить" />
        </Padding>
      </Padding>
    </View>
  );
};

export default ChangeEmail;
