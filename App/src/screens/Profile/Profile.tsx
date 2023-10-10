import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Padding from 'ui/Padding';
import FieldDetail from 'ui/FieldDetail';
import userLogout from 'Redux/thunks/User/logout.api';

interface IProfile {
  username: string;
}

const Profile: FC<IProfile> = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.userSlice.user.firstName);
  const handleLogout = async () => {
    try {
      await dispatch(userLogout());
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <View className="bg-white h-full">
      <Padding>
        <View className="mt-4 mb-2">
          <Text className="text-center text-xl font-bold text-zinc-500">
          Добро пожаловать, {username}!
          </Text>
        </View>
        <FieldDetail
          onPress={() => navigation.navigate('EditProfile')}
          icon="account"
          title="Редактировать профиль"
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
