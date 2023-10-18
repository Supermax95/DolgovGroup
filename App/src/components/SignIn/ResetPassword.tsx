import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import resetPassword from 'Redux/thunks/User/newPassword.api';
import Button from 'ui/Button';
import Field from 'ui/Field';

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

interface IResetPassword {
  email: string;
}

const styleCenter = 'h-full w-full bg-white pt-16';

export const ResetPassword = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IResetPassword>({
    email: '',
  });
  const error = useAppSelector((state) => state.userSlice.error);

  const handleResetPassword = async () => {
    if (!data.email) {
      Alert.alert('Ошибка', 'Введите email');
      return;
    }

    try {
      if (!emailRegex.test(data.email)) {
        Alert.alert('Ошибка', 'Введите корректный email');
        return;
      }

      const result = await dispatch(resetPassword(data.email));

      if (result.meta.requestStatus === 'rejected') {
        Alert.alert(
          'Ошибка',
          'Данного пользователя не существует или произошла ошибка'
        );
      } else if (result.meta.requestStatus === 'fulfilled') {
        Alert.alert('Пароль выслан на вашу почту', '', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('SignIn');
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
  };

  return (
    <View className={styleCenter}>
      <Text className="text-center text-gray-800 text-2xl font-bold mb-2">
        Сбросить пароль
      </Text>
      <Field
        value={data.email}
        placeholder="Введите email"
        autoCapitalize="none"
        onChange={(value) => setData({ ...data, email: value })}
      />
      <Button onPress={handleResetPassword} title={`Сбросить пароль`} />
    </View>
  );
};
