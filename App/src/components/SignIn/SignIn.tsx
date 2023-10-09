import React, { FC, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import userLogin from 'Redux/thunks/User/login.api';
import Button from 'ui/Button';
import Field from 'ui/Field';

interface IData {
  email: string;
  password: string;
}

const styleCenter = 'h-full w-full bg-white pt-16';

const SignIn: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [data, setData] = useState<IData>({
    email: '',
    password: '',
  });

  const isLoading = useSelector(
    (state: RootState) => state.userSlice.isLoading
  );

  const user = useSelector((state: RootState) => state.userSlice.user);
  console.log(user);

  const authHandler = async () => {
    try {
      if (!data.email || !data.password) {
        Alert.alert('Ошибка', 'Введите email и пароль');
        return;
      }

      const result = await dispatch(userLogin({ userData: data }));

      if (result.meta.requestStatus === 'fulfilled') {
        // Успешная авторизация
        navigation.navigate('Home');
      } else {
        // Обработка ошибок
        Alert.alert(
          'Ошибка',
          'Невозможно авторизоваться. Проверьте данные и попробуйте снова.'
        );
      }
    } catch (error) {
      // Обработка ошибок
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
            onChange={(value) => setData({ ...data, email: value })}
          />
          <Field
            value={data.password}
            placeholder="Введите пароль"
            autoCapitalize="none"
            onChange={(value) => setData({ ...data, password: value })}
            isSecure={true}
          />
          <Button onPress={authHandler} title={`Войти`} disabled={isLoading} />
          <Pressable onPress={() => navigation.navigate('Registration')}>
            <Text className="text-gray-800 opacity-50 text-sm text-center">
              Зарегистрироваться
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
