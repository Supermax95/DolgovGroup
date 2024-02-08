import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
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
  const screenWidth = Math.round(Dimensions.get('window').width);

  const cardWidth = screenWidth / 2 - 20;

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
                      className={`text-zinc-700 font-medium  ${
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
              ) : null}
            </View>
          </View>
        </Animated.View>
      </Modal>
    </>
  );
};

export default EmployeeConfirm;
