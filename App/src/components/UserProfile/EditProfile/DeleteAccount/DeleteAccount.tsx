import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {
  View,
  Text,
  Alert,
  Modal,
  Pressable,
  Platform,
  Animated,
  PanResponder,
} from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Button from 'ui/Button';
import profileDelete from 'Redux/thunks/Profile/profileDelete.api';
import userLogout from 'Redux/thunks/User/logout.api';
import { StackNavigationProp, TabScreenNavigationProp } from 'navigation/types';

interface IDeleteAccount {
  phoneNumber: string | undefined;
  visible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

// type HomeAndPropResetPassword = CompositeNavigationProp<
//   StackNavigationProp,
//   TabScreenNavigationProp
// >;

const DeleteAccount: FC<IDeleteAccount> = ({ visible, setModalVisible }) => {
  const navigation = useNavigation<TabScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );

  const [modalOffset, setModalOffset] = useState(new Animated.Value(0));

  const handleDelete = async (): Promise<void> => {
    try {
      const result = await dispatch(
        profileDelete({
          token,
        })
      );

      if (result.meta.requestStatus === 'rejected') {
        Alert.alert(
          'Ошибка',
          'Произошла ошибка при удалении профиля, попробуйте повторить позже'
        );
        setModalVisible(false);
        return; // Прекращаем выполнение функции, если произошла ошибка
      }

      await dispatch(userLogout({ token }));
      Alert.alert('Ваш профиль удалён');
      setModalVisible(false);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert(
        'Ошибка',
        'Произошла непредвиденная ошибка, попробуйте повторить позже'
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

              <View
                className={`mt-4 ${
                  Platform.OS === 'android' ? 'py-0' : 'py-2'
                }`}
              >
                <View className="flex justify-center items-center ">
                  <Text className="w-full text-base font-bold text-slate-800">
                    Вы уверены, что хотите удалить профиль?
                  </Text>
                </View>
                <View className="items-center my-4">
                  <Text
                    className={`w-full text-zinc-700 font-medium  ${
                      Platform.OS === 'android' ? 'text-md' : 'text-md'
                    }
                          `}
                  >
                    Ваши бонусы сохранятся. Регистрируйтесь снова под этим же
                    номером, чтобы потратить их
                  </Text>
                </View>

                <View>
                  <Button
                    title="Назад"
                    onPress={() => setModalVisible(false)}
                    colors={['bg-red-500', 'bg-red-400']}
                  />
                  <Button
                    title="Удалить профиль"
                    onPress={handleDelete}
                    colors={['bg-zinc-200', 'bg-zinc-200']}
                    colorsText={'text-zinc-700'}
                  />
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </Modal>
    </>
  );
};

export default DeleteAccount;
