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
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import { useAppSelector, useAppDispatch } from 'Redux/hooks';
import { StackNavigationProp, TabScreenNavigationProp } from 'navigation/types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import userLogin from 'Redux/thunks/User/login.api';
import Button from 'ui/Button';
import FieldInput from 'ui/FieldInput';
import UniversalHeader from 'ui/UniversalHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native-svg';

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
          userData: data,
        })
      );

      if (result.meta.requestStatus === 'rejected') {
        Alert.alert('Ошибка', result.payload);
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
      console.error('Ошибка при авторизации:', error);
    }
  };

  const handleLegalPolicyPress = () => {
    navigation.navigate('AboutApplication');
  };

  const AnimatedLinearGradient =
    Animated.createAnimatedComponent(LinearGradient);

  return (
    <>
      {/* <ImageBackground
        // source={require('../../assets/absrac.jpg')}
        source={{
          uri: 'https://i.pinimg.com/564x/cb/31/f3/cb31f356e257de14263e93dbb72ff319.jpg',
        }}
        style={{ width: '100%', height: '100%' }}
      > */}
      <SafeAreaView className="z-50  flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* <LinearGradient
          colors={['#f0fdf4', '#fafaf9', '#a7f3d0']}
          style={styles.linearGradient}
        > */}
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
                <Pressable onPress={() => navigation.navigate('ResetPassword')}>
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
                <Pressable onPress={() => navigation.navigate('Registration')}>
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
          {/* </LinearGradient> */}
        </KeyboardAvoidingView>
      </SafeAreaView>
      {/* </ImageBackground> */}
    </>
  );
};

var styles = StyleSheet.create({
  linearGradient: {
    // flex: 1,
    // paddingLeft: 15,
    // paddingRight: 15,
    // borderRadius: 5,
  },
  // buttonText: {
  //   fontSize: 18,
  //   fontFamily: 'Gill Sans',
  //   textAlign: 'center',
  //   margin: 10,
  //   color: '#ffffff',
  //   backgroundColor: 'transparent',
  // },
});

export default SignIn;
