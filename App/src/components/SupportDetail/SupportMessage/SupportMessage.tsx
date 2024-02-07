import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Alert,
  SafeAreaView,
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
      console.log('minutesPassed', minutesPassed);

      if (minutesPassed < 3) {
        // Если прошло менее трех минут, блокируем повторную отправку
        setResendDisabled(true);
        const remainingTime = Math.ceil(3 - minutesPassed) * 60;
        console.log('remainingTime', remainingTime);
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
  const [isShowKeyboard, setIsShowKeyboard] = useState<boolean>(false);

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

// import React, { FC, useState } from 'react';
// import { useAppDispatch, useAppSelector } from 'Redux/hooks';
// import { useNavigation } from '@react-navigation/native';
// import { View, Text, Button, Alert, SafeAreaView } from 'react-native';
// import { StackNavigationProp } from 'navigation/types';
// import Padding from 'ui/Padding';
// import FieldInput from 'ui/FieldInput';
// import UniversalHeader from 'ui/UniversalHeader';
// import nodemailerSend from 'Redux/thunks/Support/supportNodemailer.api';

// const SupportMessage: FC = () => {
//   const navigation = useNavigation<StackNavigationProp>();
//   const dispatch = useAppDispatch();
//   const token = useAppSelector<string | undefined>(
//     (state) => state.userSlice.token?.refreshToken
//   );

//   const [data, setData] = useState({
//     titleMessage: '',
//     message: '',
//   });

//   const handleFieldChange = (field: string, value: string) => {
//     setData((prevData) => ({
//       ...prevData,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!data.titleMessage || !data.message) {
//       Alert.alert('Поля не заполнены', 'Пожалуйста, заполните все поля');
//       return;
//     }

//     const result = await dispatch(
//       nodemailerSend({
//         token,
//         titleMessage: data.titleMessage,
//         message: data.message,
//       })
//     );

//     if (result.meta.requestStatus === 'rejected') {
//       Alert.alert(
//         'Ошибка',
//         'Произошла ошибка при отправке обращения, попробуйте повторить позже'
//       );
//     } else {
//       // Успешная отправка
//       Alert.alert('Ваше обращение успешно отправлено');
//       navigation.navigate('Support');
//     }
//   };

//   return (
//     <SafeAreaView className="bg-white h-full flex-1">
//       <UniversalHeader
//         onPress={() => navigation.goBack()}
//         title={'Обращение в службу поддержки'}
//       />
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: 'white',
//         }}
//       >
//         <Text
//           style={{
//             textAlign: 'center',
//             color: 'gray',
//             fontSize: 20,
//             fontWeight: 'bold',
//             marginVertical: 2,
//           }}
//         >
//           Заполните поля
//         </Text>

//         <FieldInput
//           value={data.titleMessage}
//           placeholder="Тема обращения"
//           onChange={(value) => handleFieldChange('titleMessage', value)}
//           autoCapitalize="none"
//         />

//         <FieldInput
//           value={data.message}
//           placeholder="Текст"
//           onChange={(value) => handleFieldChange('message', value)}
//           autoCapitalize="none"
//           style={{ height: '20%', textAlignVertical: 'top'}}
//           />
//       </View>
//       <Padding>
//         <Button title="Отправить" onPress={handleSubmit} />
//       </Padding>
//     </SafeAreaView>
//   );
// };

// export default SupportMessage;
