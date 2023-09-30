import React, { FC, useState } from 'react';
import { Text, View } from 'react-native';
import Field from 'ui/Field';

interface IData {
  email: string;
  password: string;
}

const SignIn: FC = () => {
  const [data, setData] = useState<IData>({} as IData);

  return (
    <View className="flex-1">
      <View className="mx-5 justify-center items-center h-full">
        <Field
          value={data.email}
          placeholder="Введите email"
          onChange={(value) => setData({ ...data, email: value })}
        />
        <Field
          value={data.password}
          placeholder="Введите пароль"
          onChange={(value) => setData({ ...data, password: value })}
          isSecure={true}
        />
      </View>
    </View>
  );
};

export default SignIn;
