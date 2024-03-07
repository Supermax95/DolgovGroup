import React, { FC, useEffect, useState } from 'react';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { View, Text, Alert, Pressable } from 'react-native';
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

interface IChangeEmail {
  newEmail: string;
}

const CheckMail: FC = () => {
  const navigation = useNavigation<HomeAndPropResetPassword>();
  const dispatch = useAppDispatch();

  const [changeEmail, setChangeEmail] = useState(false);

  const userId = useAppSelector((state) => state.userSlice.user?.id);

  const userEmail = useAppSelector((state) => state.userSlice.user?.email);

  const [isResendDisabled, setResendDisabled] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);

  const [errorMessages, setErrorMessages] = useState<IChangeEmail>({
    newEmail: '',
  });

  const [data, setData] = useState<IChangeEmail>({
    newEmail: userEmail || '',
  });

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
        navigation.navigate('FooterTabs');
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

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleFieldChange = (
    field: keyof IChangeEmail,
    value: string
  ): void => {
    setData((prevData) => ({ ...prevData, [field]: value }));
    setErrorMessages((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const handleChangeEmail = () => {
    setChangeEmail(true);
  };

  const handlerCancelEmail = () => {
    setChangeEmail(false);
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
          newEmailReg({
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
            'На новую почту было отправлено письмо',
            'Подтвердите новую почту',
            [
              {
                text: 'OK',
              },
            ]
          );
          setChangeEmail(false);
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
    <>
      <SafeAreaView className="bg-white h-full flex-1">
        <UniversalHeader
          onPress={() => navigation.goBack()}
          title="Проверка активации"
        />

        <View className="justify-center items-center h-[80%]">
          {changeEmail ? (
            <View className="w-10/12">
              <View className="w-full justify-center items-center">
                <Text className="text-center text-gray-800 text-md font-normal mb-2">
                  На указанную вами эл. почту придёт ссылка активации
                </Text>
              </View>
              <FieldInput
                value={data.newEmail}
                placeholder="Email"
                onChange={(value) => handleFieldChange('newEmail', value)}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <Button onPress={handlerSubmitEmail} title="Сохранить" />

              <Button
                onPress={handlerCancelEmail}
                colors={['bg-zinc-400', 'bg-zinc-400']}
                title="Отменить изменение почты"
              />
            </View>
          ) : (
            <View className="w-11/12">
              <View className="w-full justify-center items-center">
                <Text className="text-center text-zinc-800 text-md font-normal mb-2">
                  Мы отправили вам письмо на адрес электронной почты {userEmail}
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
                onPress={handleChangeEmail}
                className="w-full justify-center items-center mt-2 px-2"
              >
                <Text className="text-xs font-molmal text-zinc-600">
                  Ввести другой адрес эл. почты
                </Text>
              </Pressable>
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
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default CheckMail;
