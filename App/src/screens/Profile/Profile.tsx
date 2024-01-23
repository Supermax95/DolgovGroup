import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import { View, Text } from 'react-native';
import Padding from 'ui/Padding';
import FieldDetail from 'ui/FieldDetail';
import userLogout from 'Redux/thunks/User/logout.api';
import getProfileInfo from 'Redux/thunks/Profile/profileInfo.api';

const Profile: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();
  const userId = useAppSelector<number>((state) => state.userSlice.user.id);
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
      navigation.navigate('Auth');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <View className="bg-white h-full">
      <Padding>
        <View className="mt-4 mb-2">
          <Text className="text-center text-xl font-bold text-zinc-500">
            Добро пожаловать, {firstName}!
          </Text>
        </View>
        <FieldDetail
          onPress={() => navigation.navigate('EditProfile')}
          icon="account"
          title="Редактирование данных"
        />
        <FieldDetail
          onPress={() => navigation.navigate('AccumulatedUserPoints')}
          icon="receipt"
          title="Накопленные баллы"
        />
        <FieldDetail
          onPress={() => navigation.navigate('NotificationSettings')}
          icon="bell"
          title="Настройка уведомлений"
        />
        <FieldDetail
          onPress={() => navigation.navigate('AboutApplication')}
          icon="information"
          title="О приложении"
        />
        <FieldDetail
          onPress={handleLogout}
          icon="location-exit"
          title="Выход"
          isLast={true}
        />
      </Padding>
    </View>
  );
};

export default Profile;
