import React, { FC, useEffect, useState } from 'react';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { View, Text, Alert, Pressable, ActivityIndicator } from 'react-native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { StackNavigationProp, TabScreenNavigationProp } from 'navigation/types';
import userActivate from 'Redux/thunks/User/activated.api';
import Button from 'ui/Button';
import sendActivationLink from 'Redux/thunks/User/sendActivationLink.api';
import UniversalHeader from 'ui/UniversalHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import FieldInput from 'ui/FieldInput';
import newEmailReg from 'Redux/thunks/User/newEmailReg.api';

type HomeAndPropResetPassword = CompositeNavigationProp<
  StackNavigationProp,
  TabScreenNavigationProp
>;

const CheckMail: FC = () => {
  const navigation = useNavigation<HomeAndPropResetPassword>();
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.userSlice.user?.id);

  const userEmail = useAppSelector((state) => state.userSlice.email);
  console.log('🚀 ~ userEmail:', userEmail);

  const [isResendDisabled, setResendDisabled] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   if (userId) {
  //     dispatch(userActivate({ userId, force: true }));
  //   }
  // }, [dispatch, userId]);

  useEffect(() => {
    setResendDisabled(true);
    startResendTimer();
  }, []);

  const startResendTimer = (): void => {
    setSecondsRemaining(180);
    const interval = setInterval(() => {
      setSecondsRemaining((prevSeconds) => {
        if (prevSeconds === 1) {
          clearInterval(interval);
          setResendDisabled(false);
        }
        return prevSeconds - 1;
      });
    }, 1000);
  };

  // const handleCheckActivation = async (): Promise<void> => {
  //   try {
  //     const result = await dispatch(userActivate({ userId, force: true }));
  //     if (result.meta.requestStatus === 'fulfilled') {
  //       navigation.navigate('FooterTabs');
  //     } else {
  //       Alert.alert('Аккаунт не активирован');
  //     }
  //   } catch (error) {
  //     Alert.alert('Произошла ошибка при проверке активации.');
  //   }
  // };

  // const handleSendActivation = async (): Promise<void> => {
  //   try {
  //     setResendDisabled(true);
  //     startResendTimer();

  //     await dispatch(sendActivationLink({ userId }));
  //     Alert.alert('Проверьте свою почту.');
  //   } catch (error) {
  //     Alert.alert('Произошла ошибка при отправке повторной активации.');
  //     setResendDisabled(false);
  //   }
  // };

  return (
    <>
      <SafeAreaView className="bg-white h-full flex-1">
        <UniversalHeader
          onPress={() => navigation.goBack()}
          title="Проверка активации"
        />
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="green" />
          </View>
        ) : (
          <View className="justify-center items-center h-[80%]">
            <View className="w-11/12">
              <View className="w-full px-2">
                <Text className="text-base font-molmal text-zinc-800">
                  Письмо было отправлено на электронную почту:
                </Text>
                <Text className="text-center text-base font-molmal text-zinc-800">
                  {userEmail}
                </Text>
              </View>
              <Button
                title="Проверить активацию"
                // onPress={handleCheckActivation}
              />
              <View className="w-full justify-center items-center mt-2 px-2">
                <Text className="text-xs font-molmal text-zinc-500">
                  Если вы не получили письмо, пожалуйста, проверьте папку "Спам"
                </Text>
              </View>
              {/* <Pressable
                // onPress={handleSendActivation}
                disabled={isResendDisabled}
                className="text-zinc-800 rounded-xl w-full px-2 py-3"
              >
                <View>
                  {isResendDisabled ? (
                    <Text className="text-center text-xs font-molmal text-zinc-500">
                      Возможность повторной отправки через{' '}
                      {Math.floor(secondsRemaining / 60)} минут{' '}
                      {secondsRemaining % 60} секунд
                    </Text>
                  ) : (
                    <Text
                      className={`text-sm text-center font-molmal text-zinc-800
                  ${
                    isResendDisabled ? 'text-zinc-500 ' : 'text-zinc-800'
                  }                
              `}
                    >
                      Отправить повторно
                    </Text>
                  )}
                </View>
              </Pressable> */}
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default CheckMail;
