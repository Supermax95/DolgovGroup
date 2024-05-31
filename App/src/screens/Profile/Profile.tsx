import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import { View, Text, Alert } from 'react-native';
import Padding from 'ui/Padding';
import FieldDetail from 'ui/FieldDetail';
import userLogout from 'Redux/thunks/User/logout.api';
import getProfileInfo from 'Redux/thunks/Profile/profileInfo.api';
import UniversalHeader from 'ui/UniversalHeader';
import { SafeAreaView } from 'react-native-safe-area-context'; // Обновленный импорт

const Profile: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();
  const firstName = useAppSelector<string>(
    (state) => state.profileSlice.firstName
  );
  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );

  useEffect(() => {
    if (token) {
      dispatch(getProfileInfo({ token }));
    }
  }, [dispatch]);

  const handleLogout = async (): Promise<void> => {
    try {
      await dispatch(userLogout({ token }));
      navigation.navigate('FooterTabs');
    } catch (error) {
      Alert.alert('Ошибка при выходе:');
    }
  };

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader title="Профиль" />

      <Padding>
        <View className="mt-4 mb-2">
          <Text className="text-center text-lg font-bold text-zinc-500">
            Добро пожаловать, {firstName}!
          </Text>
        </View>
        <FieldDetail
          onPress={() => navigation.navigate('EditProfile')}
          icon="account"
          title="Редактирование данных"
        />
        {/* <FieldDetail
          onPress={() => navigation.navigate('AccumulatedUserPoints')}
          icon="receipt"
          title="Накопленные баллы"
        /> */}
        <FieldDetail
          onPress={() => navigation.navigate('NotificationSettings')}
          icon="bell"
          title="Настройка уведомлений"
        />
        <FieldDetail
          onPress={() => navigation.navigate('Support')}
          icon="chat-question"
          title="Служба поддержки"
        />
        <FieldDetail
          onPress={() => navigation.navigate('AboutApplication')}
          icon="information"
          title="Правовая информация"
        />
        <FieldDetail
          onPress={handleLogout}
          icon="location-exit"
          title="Выход"
          isLast={true}
        />
      </Padding>
    </SafeAreaView>
  );
};

export default Profile;
