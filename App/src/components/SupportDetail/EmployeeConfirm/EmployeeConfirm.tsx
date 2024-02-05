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
} from 'react-native';
import { StackNavigationProp } from 'navigation/types';
import Padding from 'ui/Padding';
import UniversalHeader from 'ui/UniversalHeader';
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
    } else {
      Alert.alert('Ваше обращение успешно отправлено, ожидайте подтверждения ');
      navigation.navigate('Support');
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
        <View className="absolute h-[35%] bottom-0 left-0 right-0">
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              width: '100%',
              height: '100%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: -2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Pressable
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <MaterialCommunityIcons
                name="close"
                size={Platform.OS === 'android' ? 20 : 23}
                color="#71716F"
              />
            </Pressable>

            <View className="w-full justify-center items-center">
              {userStatus === 'Новый сотрудник' ? (
                <Text>Ваш запрос еще обрабатывается</Text>
              ) : userStatus === 'Сотрудник' ? (
                <View className="flex-row justify-center items-center mt-4">
                  <Text className="text-lg font-normal text-zinc-500">
                    Вы являетесь сотрудником компании
                  </Text>
                </View>
              ) : (
                <View className="w-full space-y-4">
                  <View className="flex-row justify-center items-center mt-4">
                    <Text className="text-md font-normal text-zinc-500">
                      Если вы являетесь сотрудником компании, для изменения
                      своего статуса в личном кабинете и получения необходимого
                      доступа, пожалуйста, воспользуйтесь кнопкой "Запросить
                      проверку".
                    </Text>
                  </View>
                  <View>
                    <Button title="Запросить проверку" onPress={handleSubmit} />
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default EmployeeConfirm;
