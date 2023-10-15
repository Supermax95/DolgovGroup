import { View, Text, Pressable } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import Padding from 'ui/Padding';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import getProfileInfo from 'Redux/thunks/Profile/profileInfo.api';
import Calendar from 'components/Registration/Calendar';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const userId = useAppSelector((state) => state.userSlice.user.id);
  console.log('userId', userId);

  useEffect(() => {
    if (userId) {
      dispatch(getProfileInfo(userId));
    }
  }, [dispatch, userId]);

  const profile = useAppSelector((state) => state.profileSlice);
  console.log(profile);
  const navigateToChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  return (
    <View className="bg-white h-full">
      <Padding>
        <Padding>
          <Pressable
            // onPress={onPress}
            className={`py-4 flex-row border-b-[1px] border-zinc-200 justify-between`}
          >
            <View>
              <Text>Имя</Text>
            </View>
            <View>
              <Text className="text-zinc-500">
                {profile.lastName} {profile.firstName} {profile.middleName}
              </Text>
            </View>
          </Pressable>
        </Padding>
        <Padding>
          <Calendar
            onDateChange={(selectedDate) =>
              handleFieldChange('birthDate', selectedDate)
            }
            styleCSS={[
              'py-4 flex-row border-b-[1px] border-zinc-200 justify-between',
            ]}
          >
            <Text className="text-zinc-500">{profile.birthDate}</Text>
          </Calendar>
        </Padding>
        <Padding>
          <Pressable
            // onPress={onPress}
            className={`py-4 flex-row border-b-[1px] border-zinc-200 justify-between`}
          >
            <View>
              <Text>Email</Text>
            </View>
            <View>
              <Text className="text-zinc-500">{profile.email}</Text>
            </View>
          </Pressable>
        </Padding>
        <Padding>
        <Pressable
            className={`py-4 flex-row border-b-[1px] border-zinc-200 justify-between`}
            onPress={navigateToChangePassword} // Добавили обработчик нажатия
          >
            <View>
              <Text>Пароль</Text>
            </View>
            <View>
              <Text className="text-zinc-500">Изменить пароль</Text>
            </View>
          </Pressable>
        </Padding>
      </Padding>
    </View>
  );
};

export default EditProfile;
