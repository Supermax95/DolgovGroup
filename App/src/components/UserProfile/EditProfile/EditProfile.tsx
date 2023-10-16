import { View, Text, Pressable } from 'react-native';
import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import Padding from 'ui/Padding';
import getProfileInfo from 'Redux/thunks/Profile/profileInfo.api';
import { format } from 'date-fns';

const EditProfile: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const userId = useAppSelector((state) => state.userSlice.user.id);
  const profile = useAppSelector((state) => state.profileSlice);
  console.log('profileAll============>', profile);
  const transferToBirthdate = async () => {
    navigation.navigate('ChangeDate');
  };

    useEffect(() => {
    if (userId) {
      dispatch(getProfileInfo({ userId }));
    }
  }, [dispatch, userId]);


  return (
    <View className="bg-white h-full">
      <Padding>
        <Padding>
          <Pressable
            onPress={() => navigation.navigate('ChangeFullName')}
            className="py-4 flex-row border-b-[1px] border-zinc-200 justify-between"
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
          <View className="py-4 flex-row border-b-[1px] border-zinc-200 justify-between">
            <Text>День рождения</Text>
            <View>
              <Pressable onPress={() => navigation.navigate('ChangeBirthDate');}>
             <Text className="text-zinc-500">
  {profile.birthDate
    ? new Date(profile.birthDate).toLocaleDateString()
    : 'Не указан'}
</Text>

              </Pressable>
            </View>
          </View>
        </Padding>
        <Padding>
          <Pressable className="py-4 flex-row border-b-[1px] border-zinc-200 justify-between">
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
            className="py-4 flex-row border-b-[1px] border-zinc-200 justify-between"
            onPress={() => navigation.navigate('ChangePassword')}
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
