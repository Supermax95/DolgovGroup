import { View, Text, Pressable } from 'react-native';
import React, { FC, useEffect } from 'react';
import Padding from 'ui/Padding';
import FieldEditProfile from 'ui/FieldEditProfile';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import userSlice from '../../../Redux/user.slice';
import getProfileInfo from 'Redux/thunks/Profile/profileInfo.api';

const EditProfile: FC = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.userSlice.user.id);
  // console.log('userId', userId);

  useEffect(() => {
    if (userId) {
      dispatch(getProfileInfo(userId));
    }
  }, [dispatch, userId]);

  const profile = useAppSelector((state) => state.profileSlice);
  console.log(profile);

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
                {profile.lastName} {profile.firstName}
                {profile.middleName}
              </Text>
            </View>
          </Pressable>
        </Padding>
        <Padding>
          <Pressable
            // onPress={onPress}
            className={`py-4 flex-row border-b-[1px] border-zinc-200 justify-between`}
          >
            <View>
              <Text>День рождения</Text>
            </View>
            <View>
              <Text className="text-zinc-500">{profile.birthDate}</Text>
            </View>
          </Pressable>
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
            // onPress={onPress}
            className={`py-4 flex-row border-b-[1px] border-zinc-200 justify-between`}
          >
            <View>
              <Text>Пароль</Text>
            </View>
            <View>
              <Text className="text-zinc-500">Сбросить пароль</Text>
            </View>
          </Pressable>
        </Padding>

        {/* <FieldEditProfile title="Дата рождения" fieldСhange="12.07.2000" />
        <FieldEditProfile title="Email" fieldСhange="rbirbrty0@gmail.com" />
        <FieldEditProfile title="Пароль" fieldСhange="Сброс пароля" /> */}
      </Padding>
    </View>
  );
};

export default EditProfile;
