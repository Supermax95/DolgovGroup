import React, { FC, useEffect, useState } from 'react';
import { View, Text, Alert, Pressable } from 'react-native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { TabScreenNavigationProp } from 'navigation/types';
import userActivate from 'Redux/thunks/User/activated.api';
import { useNavigation } from '@react-navigation/native';
import Button from 'ui/Button';
import sendActivationLink from 'Redux/thunks/User/sendActivationLink.api';
import UniversalHeader from 'ui/UniversalHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const CheckMail: FC = () => {
  const navigation = useNavigation<TabScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const userId = useAppSelector<number | undefined>(
    (state) => state.userSlice.user?.id
  );

  const [isResendDisabled, setResendDisabled] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);

  useEffect(() => {
    if (userId) {
      dispatch(userActivate({ userId, force: true }));
    }
  }, [dispatch, userId]);

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

  const handleCheckActivation = async (): Promise<void> => {
    try {
      const result = await dispatch(userActivate({ userId, force: true }));
      if (result.meta.requestStatus === 'fulfilled') {
        navigation.navigate('Home');
      } else {
        Alert.alert('Аккаунт не активирован');
      }
    } catch (error) {
      Alert.alert('Произошла ошибка при проверке активации.');
    }
  };

  const handleSendActivation = async (): Promise<void> => {
    try {
      setResendDisabled(true);
      startResendTimer();

      const result = await dispatch(sendActivationLink({ userId }));
      Alert.alert('Проверьте свою почту.');
    } catch (error) {
      Alert.alert('Произошла ошибка при отправке повторной активации.');
      setResendDisabled(false);
    }
  };

  return (
    <>
      <SafeAreaView className="bg-white h-full flex-1">
        <UniversalHeader
          onPress={() => navigation.goBack()}
          title="Проверка активации"
        />

        <View className="justify-center items-center h-[80%]">
          <View className="w-11/12">
            <View className="w-full justify-center items-center">
              <Text className="text-center text-zinc-800 text-lg font-normal mb-2">
                Мы отправили вам письмо на указанный адрес электронной почты
              </Text>
            </View>

            <Button
              title="Проверить активацию"
              onPress={handleCheckActivation}
            />

            <View className="w-full justify-center items-center mt-2 px-2">
              <Text className="text-xs font-molmal text-zinc-500">
                Если вы не получили письмо, пожалуйста, проверьте папку "Спам"
                или запросите отправку письма повторно
              </Text>
            </View>

            <Pressable
              onPress={handleSendActivation}
              disabled={isResendDisabled}
              className="text-zinc-800 rounded-xl w-full px-2 py-3"
            >
              <View>
                <Text
                  className={`text-sm text-center font-molmal text-zinc-800
                  ${
                    isResendDisabled ? 'text-zinc-500 ' : 'text-zinc-800'
                  }                
              `}
                >
                  Отправить повторно
                </Text>

                {isResendDisabled && (
                  <Text className="text-center text-xs font-molmal text-zinc-500">
                    Возможность повторной отправки через{' '}
                    {Math.floor(secondsRemaining / 60)} минут{' '}
                    {secondsRemaining % 60} секунд
                  </Text>
                )}
              </View>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default CheckMail;
