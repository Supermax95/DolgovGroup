import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  Modal,
  Pressable,
  Platform,
  Animated,
  PanResponder,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from 'navigation/types';

import checkEmployee from 'Redux/thunks/Support/checkEmployee.api';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Button from 'ui/Button';
import getUserStatus from 'Redux/thunks/User/userStatus.api';
import ButtonWithDisable from 'ui/ButtonWithDisable';

interface EmployeeConfirmProps {
  visible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const EmployeeConfirm: FC<EmployeeConfirmProps> = ({
  visible,
  setModalVisible,
}) => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();
  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );
  const userStatus = useAppSelector<string | undefined>(
    (state) => state.userSlice.user.userStatus
  );

  const [modalOffset, setModalOffset] = useState(new Animated.Value(0));
  const [isResendDisabled, setResendDisabled] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);

  useEffect(() => {
    if (token) {
      dispatch(getUserStatus({ token }));
    }
  }, [dispatch]);

  // useEffect(() => {
  //   const intervalId = setInterval(async () => {
  //     // Получаем время начала истечения срока действия кнопки из AsyncStorage
  //     const disableUntil = await AsyncStorage.getItem('disableButtonUntil');
  //     if (disableUntil) {
  //       // Вычисляем оставшееся время
  //       const currentTime = Date.now();
  //       const remainingTime = parseInt(disableUntil) - currentTime;

  //       // Обновляем состояние секунд
  //       setSecondsRemaining(
  //         remainingTime > 0 ? Math.ceil(remainingTime / 1000) : 0
  //       );
  //     }
  //   }, 1000); // Проверяем каждую секунду

  //   return () => clearInterval(intervalId);
  // }, []);

  // const handleRefreshStatusTimer = async () => {
  //   // Здесь вы можете добавить логику обработки нажатия кнопки

  //   // Получаем текущее время в миллисекундах
  //   const currentTime = Date.now();

  //   // Сохраняем время начала истечения срока действия кнопки в AsyncStorage
  //   await AsyncStorage.setItem(
  //     'disableButtonUntil',
  //     (currentTime + 180000).toString()
  //   );

  //   // Делаем кнопку недоступной
  //   setResendDisabled(true);

  //   // Устанавливаем таймер на 3 минуты (180000 миллисекунд)
  //   setTimeout(async () => {
  //     // Получаем время начала истечения срока действия кнопки из AsyncStorage
  //     const disableUntil = await AsyncStorage.getItem('disableButtonUntil');

  //     // Проверяем, прошло ли уже 3 минуты
  //     if (disableUntil && currentTime > parseInt(disableUntil)) {
  //       // Если прошло 3 минуты, делаем кнопку снова доступной и удаляем данные из AsyncStorage
  //       await AsyncStorage.removeItem('disableButtonUntil');
  //       setResendDisabled(false);
  //     }
  //   }, 180000); // 3 минуты в миллисекундах
  //   // После завершения таймера делаем кнопку снова доступной
  //   // setTimeout(() => {
  //   //   setResendDisabled(false);
  //   // }, 180000); // 3 минуты в миллисекундах
  // };

  const handleSubmit = async () => {
    const result = await dispatch(
      checkEmployee({
        token,
      })
    );
    if (result.meta.requestStatus === 'rejected') {
      Alert.alert(
        'Ошибка',
        'Произошла ошибка при отправке запроса, попробуйте повторить позже'
      );
      setModalVisible(false);
    } else {
      Alert.alert(
        'Ваше обращение успешно отправлено. Ожидайте письмо на почту.'
      );
      setModalVisible(false);
    }
  };

  //*обновление статуса
  const handleRefreshStatus = async (): Promise<void> => {
    try {
      const result = await dispatch(getUserStatus({ token }));

      if (result.meta.requestStatus === 'rejected') {
        Alert.alert(
          'Ошибка',
          'Произошла ошибка при отправке запроса, попробуйте повторить позже'
        );
        setModalVisible(false);
      } else {
        Alert.alert('Данные обновлены.');
        setModalVisible(false);
        // AsyncStorage.setItem('lastSentTimeStatus', Date.now().toString());
        handleRefreshStatusTimer();
      }
    } catch (error) {
      console.error(
        'Ошибка при обновлении токена и получении статуса пользователя:',
        error
      );
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        Animated.event([null, { dy: modalOffset }], {
          useNativeDriver: false,
        })(_, gestureState);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 50) {
        Animated.timing(modalOffset, {
          toValue: 400, // Изменено на 400, но может потребоваться другое значение
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          setModalVisible(false);
          setModalOffset(new Animated.Value(0)); // Сброс смещения
        });
      } else {
        Animated.timing(modalOffset, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <>
      {visible && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Черный цвет с прозрачностью 50%
          }}
        />
      )}

      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.0)',
            transform: [{ translateY: modalOffset }],
          }}
        >
          <View className="flex-1 justify-end items-center">
            <View
              className="h-[35%] w-full m-0 p-8 rounded-t-2xl bg-white"
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 21,
              }}
            >
              {/* кнопка закрытия */}
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                }}
                className="absolute left-5 top-5"
              >
                <MaterialCommunityIcons
                  name="close"
                  size={Platform.OS === 'android' ? 20 : 23}
                  color="#71716F"
                />
              </Pressable>

              {userStatus === 'Клиент' ? (
                <View
                  className={`mt-4 ${
                    Platform.OS === 'android' ? 'py-0' : 'py-2'
                  }`}
                >
                  <View className="items-center my-4">
                    <Text
                      className={`w-full text-zinc-700 font-medium  ${
                        Platform.OS === 'android' ? 'text-md' : 'text-md'
                      }
                        `}
                    >
                      Если вы являетесь сотрудником компании, для изменения
                      своего статуса в личном кабинете и получения необходимого
                      доступа, воспользуйтесь функцией запроса проверки
                    </Text>
                  </View>

                  <View>
                    <Button title="Запросить проверку" onPress={handleSubmit} />
                  </View>
                </View>
              ) : (
                <View
                  className={`mt-4 ${
                    Platform.OS === 'android' ? 'py-0' : 'py-2'
                  }`}
                >
                  <View className="items-center my-4">
                    <Text
                      className={`w-full text-zinc-700 font-medium  ${
                        Platform.OS === 'android' ? 'text-md' : 'text-md'
                      }
                      `}
                    >
                      Для проверки статуса сотрудника воспользуйтесь функцией,
                      позволяющей обновить данные в режиме реального времени.
                    </Text>
                    {/* <Text
                      className={`w-full text-zinc-700 font-medium  ${
                        Platform.OS === 'android' ? 'text-md' : 'text-md'
                      }
                      `}
                    >
                      Если запрос по-прежнему находится в обработке, то
                      отправьте повторный запрос попозже.
                    </Text> */}
                  </View>

                  <View>
                    <ButtonWithDisable
                      title="Проверить статус"
                      onPress={handleRefreshStatus}
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
              )}
            </View>
          </View>
        </Animated.View>
      </Modal>
    </>
  );
};

export default EmployeeConfirm;
