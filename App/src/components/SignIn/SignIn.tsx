import React, { FC, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, Pressable, Text, View } from 'react-native';
import userLogin from 'Redux/thunks/User/login.api';
import Button from 'ui/Button';
import Field from 'ui/Field';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAppSelector, useAppDispatch } from 'Redux/hooks';

interface IData {
  email: string;
  password: string;
}

const styleCenter = 'h-full w-full bg-white';

const SignIn = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [data, setData] = useState<IData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const isLoading = useAppSelector((state) => state.userSlice.isLoading);
  const token = useAppSelector((state) => state.userSlice.token);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleForgotPassword = () => {
    navigation.navigate('ResetPassword');
  };

  const authHandler = async () => {
    try {
      if (!data.email || !data.password) {
        Alert.alert('Ошибка', 'Введите email и пароль');
        return;
      }

      const result = await dispatch(userLogin({ token, userData: data }));

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
          <Field
            value={data.email}
            placeholder="Введите email"
            autoCapitalize="none"
            keyboardType="email-address"
            onChange={(value) => setData({ ...data, email: value })}
          />
          <View className="flex-row items-center">
            <Field
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
          <Pressable onPress={handleForgotPassword}>
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
