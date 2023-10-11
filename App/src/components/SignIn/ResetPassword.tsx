import React, { FC, useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import resetPassword from 'Redux/thunks/User/newPassword.api';
import Button from 'ui/Button';
import Field from 'ui/Field';

interface IResetPassword {
  email: string;
}

const styleCenter = 'h-full w-full bg-white pt-16';

const ResetPassword: FC<IResetPassword> = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<IResetPassword>({
    email: '',
  });
  const error = useSelector((state: RootState) => state.userSlice.error);

  const handleResetPassword = async () => {
    try {
      if (!data.email) {
        Alert.alert('Ошибка', 'Введите email');
        return;
      }
      const result = await dispatch(resetPassword(data.email));
      console.log('Result:', result);
      if (result.meta.requestStatus === 'rejected') {
        Alert.alert(
          'Ошибка',
          'Данного пользователя не существует или произошла ошибка'
        );
      } else if (result.meta.requestStatus === 'fulfilled') {
        Alert.alert('Пароль выслан на вашу почту');
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
      {/* {error && <Text className="text-red-500 ml-1 mt-1 text-xs">{error}</Text>} */}
    </View>
  );
};

export default ResetPassword;
