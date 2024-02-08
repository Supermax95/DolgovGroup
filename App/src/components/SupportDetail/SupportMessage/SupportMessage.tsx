import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from 'navigation/types';
import Padding from 'ui/Padding';
import FieldInput from 'ui/FieldInput';
import UniversalHeader from 'ui/UniversalHeader';
import nodemailerSend from 'Redux/thunks/Support/supportNodemailer.api';
import {
  KeyboardAccessoryNavigation,
  KeyboardAccessoryView,
} from 'react-native-keyboard-accessory';
import ButtonWithDisable from 'ui/ButtonWithDisable';
import { SafeAreaView } from 'react-native-safe-area-context';

const SupportMessage: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();
  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );

  const [data, setData] = useState({
    titleMessage: '',
    message: '',
  });
  const [isResendDisabled, setResendDisabled] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [isShowKeyboard, setIsShowKeyboard] = useState<boolean>(false);

  useEffect(() => {
    checkResendAvailability();
  }, []);

  const checkResendAvailability = async () => {
    const lastSentTime = await AsyncStorage.getItem('lastSentTime');
    console.log('lastSentTime', lastSentTime);
    if (lastSentTime) {
      const currentTime = Date.now();
      const timeDifference = currentTime - parseInt(lastSentTime, 10);
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

  const startResendTimer = () => {
    const interval = setInterval(() => {
      setSecondsRemaining((prevSeconds) => {
        if (prevSeconds === 1) {
          clearInterval(interval);
          setResendDisabled(false);
          AsyncStorage.removeItem('lastSentTime');
        }
        return prevSeconds - 1;
      });
    }, 1000);
  };

  const handleFieldChange = (field: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!data.titleMessage || !data.message) {
      Alert.alert('Поля не заполнены', 'Пожалуйста, заполните все поля');
      return;
    }

    const result = await dispatch(
      nodemailerSend({
        token,
        titleMessage: data.titleMessage,
        message: data.message,
      })
    );

    if (result.meta.requestStatus === 'rejected') {
      Alert.alert(
        'Ошибка',
        'Произошла ошибка при отправке обращения, попробуйте повторить позже'
      );
    } else {
      // Успешная отправка
      Alert.alert('Ваше обращение успешно отправлено');
      navigation.navigate('Support');
      AsyncStorage.setItem('lastSentTime', Date.now().toString());
    }
  };

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title={'Поддержка'}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView>
          <Padding>
            <Padding>
              <View
                className="w-full pt-2 pb-8"
                style={{ marginBottom: isShowKeyboard ? 30 : 100 }}
              >
                <FieldInput
                  value={data.titleMessage}
                  placeholder="Тема обращения"
                  onChange={(value) => handleFieldChange('titleMessage', value)}
                  autoCapitalize="sentences"
                />

                <FieldInput
                  value={data.message}
                  placeholder="Текст"
                  onChange={(value) => handleFieldChange('message', value)}
                  autoCapitalize="sentences"
                  style={{ height: 200, textAlignVertical: 'top' }}
                  multiline
                  onFocus={() => setIsShowKeyboard(true)}
                />

                {/* //*  здесь были жалкие попытки добавить закрытие клавиатуры  
                //* было принято решение пока задать фиксированную высоту инпута для текста,  style={{ height: 200, textAlignVertical: 'top' }}
                //* т.к. полностью решить проблему с прокруткой и исчезновением клавы на iOS не получается */}
                {/* <KeyboardAccessoryNavigation
                  doneHidden={true}
                  // nextHidden={true}
                  // previousHidden={true}
                /> */}

                <View className="mt-2 justify-center items-center">
                  <Text className="text-xs font-molmal text-zinc-500">
                    Подробное описание позволит нам предоставить ответ в
                    кратчайшие сроки без уточнения дополнительной информации...
                    Ответ придёт на вашу электронную почту, которая указана в
                    ЛК...
                  </Text>
                </View>

                <ButtonWithDisable
                  title="Отправить"
                  onPress={handleSubmit}
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
            </Padding>
          </Padding>

          {/* Если письмо уже отправлено */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SupportMessage;
