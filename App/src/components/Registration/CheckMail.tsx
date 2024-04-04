import React, { FC, useEffect, useState } from 'react';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { View, Text, Alert, Pressable, ActivityIndicator } from 'react-native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { StackNavigationProp, TabScreenNavigationProp } from 'navigation/types';
import userActivate from 'Redux/thunks/User/activated.api';
import Button from 'ui/Button';
import UniversalHeader from 'ui/UniversalHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeAndPropResetPassword = CompositeNavigationProp<
  StackNavigationProp,
  TabScreenNavigationProp
>;

const CheckMail: FC = () => {
  const navigation = useNavigation<HomeAndPropResetPassword>();
  const dispatch = useAppDispatch();

  const userEmail = useAppSelector((state) => state.userSlice.email);
  console.log('🚀 ~ userEmail:', userEmail);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheckActivation = async (): Promise<void> => {
    try {
      const result = await dispatch(userActivate({ userEmail, force: true }));
      if (result.meta.requestStatus === 'fulfilled') {
        navigation.navigate('FooterTabs');
      } else {
        Alert.alert('Аккаунт не активирован');
      }
    } catch (error) {
      Alert.alert('Произошла ошибка при проверке активации.');
    }
  };

  return (
    <>
      <SafeAreaView className="bg-white h-full flex-1">
        <UniversalHeader
          onPress={() => navigation.goBack()}
          title="Проверка активации"
        />
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="green" />
          </View>
        ) : (
          <View className="justify-center items-center h-[80%]">
            <View className="w-11/12">
              <View className="w-full px-2">
                <Text className="text-base font-molmal text-zinc-800">
                  Письмо было отправлено на электронную почту:
                </Text>
                <Text className="text-center text-base font-molmal text-zinc-800">
                  {userEmail}
                </Text>
              </View>
              <Button
                title="Проверить активацию"
                onPress={handleCheckActivation}
              />
              <View className="w-full justify-center items-center mt-2 px-2">
                <Text className="text-xs font-molmal text-zinc-500">
                  Если вы не получили письмо, пожалуйста, проверьте папку "Спам"
                </Text>
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default CheckMail;
