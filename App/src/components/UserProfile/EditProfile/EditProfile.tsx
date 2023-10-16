import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import Padding from 'ui/Padding';
import getProfileInfo from 'Redux/thunks/Profile/profileInfo.api';
import FieldEditProfile from 'ui/FieldEditProfile';

const EditProfile: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const userId = useAppSelector((state) => state.userSlice.user.id);
  const profile = useAppSelector((state) => state.profileSlice);
  console.log('profileAll============>', profile);

  useEffect(() => {
    if (userId) {
      dispatch(getProfileInfo({ userId }));
    }
  }, [dispatch, userId]);

  return (
    <View className="bg-white h-full">
      <Padding>
        <FieldEditProfile
          onPress={() => navigation.navigate('ChangeFullName')}
          title="Имя"
        >
          {profile.lastName} {profile.firstName} {profile.middleName}
        </FieldEditProfile>
        <FieldEditProfile
          onPress={() => navigation.navigate('ChangeBirthDate')}
          title="День рождения"
        >
          {profile.birthDate
            ? new Date(profile.birthDate).toLocaleDateString()
            : 'Не указан'}
        </FieldEditProfile>
        <FieldEditProfile
          onPress={() => navigation.navigate('ChangeEmail')}
          title="Emal"
        >
          {profile.email}
        </FieldEditProfile>
        <FieldEditProfile
          onPress={() => navigation.navigate('ChangePassword')}
          title="Пароль"
        >
          Изменить пароль
        </FieldEditProfile>
      </Padding>
    </View>
  );
};

export default EditProfile;
