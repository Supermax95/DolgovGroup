import React, { FC, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { TabScreenNavigationProp } from 'navigation/types';
import userActivate from 'Redux/thunks/User/activated.api';
import { useNavigation } from '@react-navigation/native';
import Button from 'ui/Button';
import sendActivationLink from 'Redux/thunks/User/sendActivationLink.api';
const styleCenter = 'h-full w-full bg-white ';

type IToken =
  | {
      accessToken: string;
      refreshToken: string;
    }
  | undefined;

const CheckMail: FC = () => {
  const navigation = useNavigation<TabScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const userId = useAppSelector<number | undefined>(
    (state) => state.userSlice.user?.id
  );

  const [activationMessage, setActivationMessage] = useState<string>('');
  const [isResendDisabled, setResendDisabled] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);

  useEffect(() => {
    if (userId) {
      dispatch(userActivate({ userId, force: true }));
    }
  }, [dispatch, userId]);

  const startResendTimer = () => {
    setSecondsRemaining(300);
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

  const handleCheckActivation = async () => {
    try {
      const result = await dispatch(userActivate({ userId, force: true }));
      if (result.meta.requestStatus === 'fulfilled') {
        navigation.navigate('Home');
      } else {
        Alert.alert('Аккаунт не активирован, проверьте почту/спам.');
        // setActivationMessage('Аккаунт не активирован, проверьте почту/спам.');
      }
    } catch (error) {
      console.error('Ошибка при проверке активации:', error);
      setActivationMessage('Произошла ошибка при проверке активации.');
    }
  };

  const handleSendActivation = async () => {
    try {
      setResendDisabled(true);
      startResendTimer();

      const result = await dispatch(sendActivationLink({ userId }));
      Alert.alert(
        'Проверьте свою почту',
        'Письмо с активацией отправлено успешно.'
      );
    } catch (error) {
      console.error('Произошла ошибка при отправке:', error);
      Alert.alert('Произошла ошибка при отправке повторной активации.');
      setResendDisabled(false);
    }
  };

  return (
    <>
      <View className={styleCenter}>
        <View className="mx-1 justify-center items-center h-full">
          <Text className="text-center text-gray-800 text-lg font-normal">
            На вашу почту было отправлено письмо, в случае если письмо не пришло
            ,проверьте спам или запросите повторно ссылку
          </Text>
          <View className="w-10/12">
            <Button
              title="Проверить активацию"
              onPress={handleCheckActivation}
            />
            {/* <Text className="text-red-500 ml-1 mt-1 text-xs ">
              {activationMessage}
            </Text> */}
            <TouchableOpacity
              onPress={handleSendActivation}
              disabled={isResendDisabled}
              style={{
                alignSelf: 'center',
                marginTop: 20,
              }}
            >
              <Text>
                Отправить повторно ссылку{' '}
                {isResendDisabled ? `через ${secondsRemaining} с` : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default CheckMail;
