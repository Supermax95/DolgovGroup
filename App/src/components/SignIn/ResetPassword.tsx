import React, { FC, useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import resetPassword from 'Redux/thunks/User/newPassword.api';
import Button from 'ui/Button';
import Field from 'ui/Field';
import { useNavigation } from '@react-navigation/native';

// Регулярное выражение для проверки email
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

interface IResetPassword {
  email: string;
}

const styleCenter = 'h-full w-full bg-white pt-16';

const ResetPassword: FC<IResetPassword> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState<IResetPassword>({
    email: '',
  });
  const error = useSelector((state: RootState) => state.userSlice.error);

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

export default ResetPassword;
