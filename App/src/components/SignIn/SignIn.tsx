import React, { FC, useState } from 'react';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { Alert, Pressable, Text, View } from 'react-native';
import { useAppSelector, useAppDispatch } from 'Redux/hooks';
import { StackNavigationProp, TabScreenNavigationProp } from 'navigation/types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import userLogin from 'Redux/thunks/User/login.api';
import Button from 'ui/Button';
import FieldInput from 'ui/FieldInput';

interface IData {
  email: string;
  password: string;
}

type HomeAndPropResetPassword = CompositeNavigationProp<
  StackNavigationProp,
  TabScreenNavigationProp
>;
type IToken =
  | {
      accessToken: string;
      refreshToken: string;
    }
  | undefined;

const styleCenter = 'h-full w-full bg-white';

const SignIn: FC = () => {
  const navigation = useNavigation<HomeAndPropResetPassword>();
  const dispatch = useAppDispatch();
  // const userToken = useAppSelector<IToken | undefined>(
  //   (state) => state.userSlice.token
  // );

  

  const isLoading = useAppSelector<boolean>(
    (state) => state.userSlice.isLoading
  );

  const [data, setData] = useState<IData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const authHandler = async (): Promise<void> => {
    try {
      if (!data.email || !data.password) {
        Alert.alert('Ошибка', 'Введите email и пароль');
        return;
      }

      const result = await dispatch(
        userLogin({ 
          // token: userToken
          // , 
          userData: data })
      );

      if (result.meta.requestStatus === 'rejected') {
        Alert.alert(
          'Ошибка',
          'Данного пользователя не существует или произошла ошибка'
        );
      } else if (result.meta.requestStatus === 'fulfilled') {
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert(
        'Ошибка',
        'Невозможно авторизоваться. Проверьте данные и попробуйте снова.'
      );
      console.error('Ошибка при авторизации:', error);
    }
  };

  return (
    <View className={styleCenter}>
      <View className="mx-1 justify-center items-center h-full">
        <Text className="text-center text-gray-800 text-2xl font-bold mb-2">
          Авторизация
        </Text>
        <View className="w-10/12">
          <FieldInput
            value={data.email}
            placeholder="Введите email"
            autoCapitalize="none"
            keyboardType="email-address"
            onChange={(value) => setData({ ...data, email: value })}
          />
          <View className="flex-row items-center">
            <FieldInput
              value={data.password}
              placeholder="Введите пароль"
              autoCapitalize="none"
              onChange={(value) => setData({ ...data, password: value })}
              isSecure={!showPassword}
            />
            <MaterialCommunityIcons
              name={showPassword ? 'eye' : 'eye-off'}
              size={25}
              color="gray"
              onPress={toggleShowPassword}
              style={{
                position: 'absolute',
                right: 15,
                transform: [{ translateY: 5 }],
              }}
            />
          </View>
          <Button onPress={authHandler} title={`Войти`} disabled={isLoading} />
          <Pressable onPress={() => navigation.navigate('ResetPassword')}>
            <Text className="text-gray-800 mt-4 opacity-50 text-sm text-center">
              Забыли пароль?
            </Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Registration')}>
            <Text className="text-gray-800 mt-4 opacity-50 text-sm text-center">
              Зарегистрироваться
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
