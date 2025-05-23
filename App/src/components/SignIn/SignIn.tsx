import React, { FC, useState } from 'react';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {
  Alert,
  Pressable,
  Text,
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import { useAppSelector, useAppDispatch } from 'Redux/hooks';
import { StackNavigationProp, TabScreenNavigationProp } from 'navigation/types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import userLogin from 'Redux/thunks/User/login.api';
import Button from 'ui/Button';
import FieldInput from 'ui/FieldInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import UniversalHeader from 'ui/UniversalHeader';

interface IData {
  email: string;
  password: string;
}

interface ResultType {
  payload: {
    activationError?: string;
  };
  meta: {
    requestStatus: string;
  };
}

type HomeAndPropResetPassword = CompositeNavigationProp<
  StackNavigationProp,
  TabScreenNavigationProp
>;

const SignIn: FC = () => {
  const navigation = useNavigation<HomeAndPropResetPassword>();
  const dispatch = useAppDispatch();
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

      const result = (await dispatch(
        userLogin({
          userData: data,
        })
      )) as ResultType;

      if (result.meta.requestStatus === 'rejected') {
        Alert.alert('Ошибка', result.payload as string);
      } else if (result.meta.requestStatus === 'fulfilled') {
        if (result.payload.activationError === 'Аккаунт не активирован') {
          navigation.navigate('CheckMail');
        } else {
          navigation.navigate('FooterTabs');
        }
      }
    } catch (error) {
      Alert.alert(
        'Ошибка',
        'Невозможно авторизоваться. Проверьте данные и попробуйте снова.'
      );
      // console.error('Ошибка при авторизации:', error);
    }
  };

  return (
    <>
      {/* <ImageBackground
        // source={require('../../assets/absrac.jpg')}
         //! чтобы было видно картинку, нужно убрать из  SafeAreaView bg-white  
        source={{
          uri: 'https://i.pinimg.com/564x/cb/31/f3/cb31f356e257de14263e93dbb72ff319.jpg',
        }}
        style={{ width: '100%', height: '100%' }}
      > */}
      <SafeAreaView className="bg-white h-full flex-1">
        <UniversalHeader onPress={() => navigation.goBack()} />
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            onScrollBeginDrag={() => Keyboard.dismiss()}
          >
            <View className="justify-center items-center h-full">
              <View className="w-10/12">
                <Text className="text-center text-gray-800 text-lg font-normal mb-2">
                  Вход
                </Text>
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

                {/* Восстановление пароля  */}
                <View className="mx-2 my-2 flex-row items-center justify-start">
                  <Pressable
                    onPress={() => navigation.navigate('ResetPassword')}
                  >
                    <Text className="text-gray-800 opacity-50 text-sm text-center">
                      Забыли пароль?
                    </Text>
                  </Pressable>
                </View>

                <Button
                  onPress={authHandler}
                  title={`Войти`}
                  disabled={isLoading}
                />

                <View className="mt-6 flex-row items-center justify-center">
                  <View
                    style={{ flex: 1, height: 1.5, backgroundColor: '#d1d5db' }}
                  />
                  <Pressable
                    onPress={() => navigation.navigate('Registration')}
                  >
                    <Text className="mx-3 text-gray-800 opacity-50 text-sm text-center">
                      Зарегистрироваться
                    </Text>
                  </Pressable>
                  <View
                    style={{ flex: 1, height: 1.5, backgroundColor: '#d1d5db' }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {/* </ImageBackground> */}
    </>
  );
};

export default SignIn;
