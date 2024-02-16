import React, { FC, useEffect, useState } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import resetPassword from 'Redux/thunks/User/newPassword.api';
import FieldInput from 'ui/FieldInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import UniversalHeader from 'ui/UniversalHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonWithDisable from 'ui/ButtonWithDisable';

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

  const [isResendDisabled, setResendDisabled] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);

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
        AsyncStorage.setItem('lastSentResetPass', Date.now().toString());
      }
    } catch (error) {
      Alert.alert(
        'Ошибка',
        'Данного пользователя не существует или произошла ошибка'
      );
    }
  };

  useEffect(() => {
    checkResendAvailability();
  }, []);

  const checkResendAvailability = async () => {
    const lastSentResetPass = await AsyncStorage.getItem('lastSentResetPass');
    console.log('lastSentResetPass', lastSentResetPass);
    if (lastSentResetPass) {
      const currentTime = Date.now();
      const timeDifference = currentTime - parseInt(lastSentResetPass, 10);
      const minutesPassed = timeDifference / (1000 * 60);
      if (minutesPassed < 3) {
        // Если прошло менее трех минут, блокируем повторную отправку
        setResendDisabled(true);
        const remainingTime = Math.floor((3 - minutesPassed) * 60);
        // Оставшееся время в секундах
        setSecondsRemaining(remainingTime);
        startResendTimer();
      }
    }
  };

  const startResendTimer = (): void => {
    const interval = setInterval(() => {
      setSecondsRemaining((prevSeconds) => {
        if (prevSeconds === 1) {
          clearInterval(interval);
          setResendDisabled(false);
          AsyncStorage.removeItem('lastSentResetPass');
        }
        return prevSeconds - 1;
      });
    }, 1000);
  };

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title="Восстановление доступа"
      />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={() => Keyboard.dismiss()}
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

              <ButtonWithDisable
                title="Отправить"
                onPress={handleResetPassword}
                disabled={isResendDisabled}
              />
              {isResendDisabled && (
                <View className="mt-2 justify-center items-center">
                  <Text className="text-xs font-molmal text-zinc-500">
                    Возможность повторной отправки через{' '}
                    {Math.floor(secondsRemaining / 60)} минут{' '}
                    {secondsRemaining % 60} секунд
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
