import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import Padding from 'ui/Padding';
import FieldDetail from 'ui/FieldDetail';

interface IProfile {
  username: string;
}

const Profile: FC<IProfile> = ({ username = 'Hulia' }) => {
  const navigation = useNavigation();

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
          icon="cog"
          title="Редактировать профиль"
        />
        <FieldDetail
          onPress={() => navigation.navigate('AccumulatedUserPoints')}
          icon="bookmark"
          title="Накопленные баллы"
        />
        <FieldDetail
          onPress={() => navigation.navigate('NotificationSettings')}
          icon="bell"
          title="Настройка уведомлений"
        />
        <FieldDetail
          onPress={() => navigation.navigate('AboutApplication')}
          icon="info-circle"
          title="О приложении"
        />
        <FieldDetail
          onPress={() => navigation.navigate('Home')}
          icon="sign-out"
          title="Выход"
          isLast={true}
        />
      </Padding>
    </View>
  );
};

export default Profile;
