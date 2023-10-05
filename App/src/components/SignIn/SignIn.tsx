// import React, { FC, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { Pressable, Text, View } from 'react-native';
// import Button from 'ui/Button';
// import Field from 'ui/Field';

// interface IData {
//   email: string;
//   password: string;
// }

// const styleCenter = 'h-full w-full bg-white pt-16';

// const SignIn: FC = () => {
//   const navigation = useNavigation();

//   const [data, setData] = useState<IData>({} as IData);

//   const authHandler = () => {};

//   return (
//     <View className={styleCenter}>
//       <View className="mx-1 justify-center items-center h-full">
//         <Text className="text-center text-gray-800 text-2xl font-bold mb-2">
//           Авторизация
//         </Text>
//         <View className="w-10/12">
//           <Field
//             value={data.email}
//             placeholder="Введите email"
//             autoCapitalize="none"
//             onChange={(value) => setData({ ...data, email: value })}
//           />
//           <Field
//             value={data.password}
//             placeholder="Введите пароль"
//             autoCapitalize="none"
//             onChange={(value) => setData({ ...data, password: value })}
//             isSecure={true}
//           />
//           <Button onPress={authHandler} title={'Войти'} />
//           <Pressable onPress={() => navigation.navigate('Registration')}>
//             <Text className="text-gray-800 opacity-50 text-sm text-center">
//               Зарегистрироваться
//             </Text>
//           </Pressable>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default SignIn;







import React, { FC, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'; 
import Button from 'ui/Button';
import Field from 'ui/Field';
import auth from 'Redux/thunks/Auth/auth.api';

interface IData {
  email: string;
  password: string;
} 

const styleCenter = 'h-full w-full bg-white pt-16';

const SignIn: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { token, isLoading } = useSelector((state) => state.authSlice);

  const [data, setData] = useState<IData>({} as IData);

  const authHandler = async () => {
    const userData = {
      email: data.email,
      password: data.password,
    };

    try {
     
      await dispatch(auth({ token, userData }));
      navigation.navigate('Home'); 
    } catch (error) {
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
