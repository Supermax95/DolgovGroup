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
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from 'navigation/types';
import Padding from 'ui/Padding';
import { Dropdown } from 'react-native-element-dropdown';
import FieldInput from 'ui/FieldInput';
import UniversalHeader from 'ui/UniversalHeader';
import nodemailerSend from 'Redux/thunks/Support/supportNodemailer.api';
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
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isResendDisabled, setResendDisabled] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [isShowKeyboard, setIsShowKeyboard] = useState<boolean>(false);

  useEffect(() => {
    checkResendAvailability();
  }, []);

  const checkResendAvailability = async (): Promise<void> => {
    const lastSentTime = await AsyncStorage.getItem('lastSentTime');
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

  const startResendTimer = (): void => {
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

  const handleFieldChange = (field: string, value: string): void => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (): Promise<void> => {
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

  const dropdownOptions = [
    { label: 'Выберите тему обращения', value: '' },
    { label: 'Качество продукции', value: 'Качество продукции' },
    { label: 'Обслуживание в магазине', value: 'Обслуживание в магазине' },
    { label: 'Функционал приложения', value: 'Функционал приложения' },
    { label: 'Программа лояльности', value: 'Программа лояльности' },
    {
      label: 'Накопленные баллы отсутствуют',
      value: 'Накопленные баллы отсутствуют',
    },
    { label: 'Прочее', value: 'Прочее' },
    { label: 'Удаление аккаунта', value: 'Удаление аккаунта' },
  ];

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title={'Поддержка'}
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
          <Padding>
            <Padding>
              <View
                className="w-full pt-2 pb-8"
                style={{ marginBottom: isShowKeyboard ? 30 : 100 }}
              >
                <Dropdown
                  value={selectedOption}
                  data={dropdownOptions}
                  onChange={(item) => {
                    setSelectedOption(item.value);
                    if (item.value === 'Прочее') {
                      handleFieldChange('titleMessage', '');
                    } else {
                      handleFieldChange('titleMessage', item.value);
                    }
                  }}
                  labelField={'label'}
                  valueField={'value'}
                />
                {selectedOption === 'Прочее' && (
                  <FieldInput
                    value={data.titleMessage}
                    placeholder="Другая тема обращения"
                    onChange={(value) =>
                      handleFieldChange('titleMessage', value)
                    }
                    autoCapitalize="sentences"
                  />
                )}
                {selectedOption === 'Накопленные баллы отсутствуют' && (
                  <View className="mt-2 justify-center items-center w-full">
                    <Text className="text-xs font-molmal text-green-700">
                      Выберите этот запрос, если баллы с вашей физической карты
                      не отображаются в приложении. Время рассмотрения составит
                      от 30 до 45 дней.
                    </Text>
                  </View>
                )}
                {selectedOption === 'Удаление аккаунта' && (
                  <View className="mt-2 justify-center items-center w-full">
                    <Text className="text-xs font-molmal text-red-700">
                      Если вы хотите удалить свой аккаунт, выберите этот запрос.
                      Укажите, пожалуйста, причину удаления. Это поможет нам
                      улучшить сервис в будущем. Удаление аккаунта займёт 15
                      дней.
                    </Text>
                  </View>
                )}
                {selectedOption !== '' && (
                  <FieldInput
                    value={data.message}
                    placeholder="Текст"
                    onChange={(value) => handleFieldChange('message', value)}
                    autoCapitalize="sentences"
                    style={{ height: 200, textAlignVertical: 'top' }}
                    // style={{ minHeight: 200, textAlignVertical: 'top' }}
                    multiline
                    onFocus={() => setIsShowKeyboard(true)}
                  />
                )}
                {selectedOption !== 'Удаление аккаунта' &&
                  selectedOption !== '' && (
                    <View className="mt-2 justify-center items-center w-full">
                      <Text className="text-xs font-molmal text-zinc-500">
                        Подробное описание позволит нам предоставить ответ в
                        кратчайшие сроки без уточнения дополнительной
                        информации. Письмо с ответом будет направлено на ваш
                        адрес электронной почты, указанный в вашем профиле
                      </Text>
                    </View>
                  )}
                {selectedOption !== '' && (
                  <ButtonWithDisable
                    title="Отправить"
                    onPress={handleSubmit}
                    disabled={isResendDisabled}
                  />
                )}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SupportMessage;
