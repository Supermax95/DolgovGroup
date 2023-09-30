import React, { FC, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';
import Button from 'ui/Button';
import Field from 'ui/Field';

interface IData {
  email: string;
  password: string;
}

const styleCenter = 'h-full w-full bg-white pt-16';

const SignIn: FC = () => {
  const navigation = useNavigation();

  const [data, setData] = useState<IData>({} as IData);

  const authHandler = () => {};

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
          <Button onPress={authHandler} title={`Войти`} />
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
