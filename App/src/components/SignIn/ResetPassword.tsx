import React, { FC, useState } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import resetPassword from 'Redux/thunks/User/newPassword.api';
import Button from 'ui/Button';
import FieldInput from 'ui/FieldInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import UniversalHeader from 'ui/UniversalHeader';

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

interface IResetPassword {
  email: string;
}

export const ResetPassword: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();

  const [data, setData] = useState<IResetPassword>({
    email: '',
  });
  const handleResetPassword = async (): Promise<void> => {
    if (!data.email) {
      Alert.alert('Ошибка', 'Введите email');
      return;
    }
    try {
      if (!emailRegex.test(data.email)) {
        Alert.alert('Ошибка', 'Введите корректный email');
        return;
      }
      const result = await dispatch(resetPassword({ email: data.email }));
      if (result.meta.requestStatus === 'rejected') {
        Alert.alert('Ошибка', result.payload);
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
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title="Восстановление доступа"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View className="justify-center items-center h-[90%]">
          <View className="w-10/12">
            <Text className="text-center text-gray-800 text-md font-normal mb-2">
              Укажите адрес электронной почты, связанный с вашим аккаунтом,
              чтобы мы могли помочь вам восстановить доступ.
            </Text>
            <FieldInput
              value={data.email}
              placeholder="Введите email"
              autoCapitalize="none"
              onChange={(value) => setData({ ...data, email: value })}
              keyboardType="email-address"
            />
            <Button onPress={handleResetPassword} title={`Сбросить пароль`} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
