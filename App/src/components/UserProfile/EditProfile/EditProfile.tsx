import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from 'Redux/hooks';
import { format } from 'date-fns';
import Padding from 'ui/Padding';
import FieldEditProfile from 'ui/FieldEditProfile';

const EditProfile = () => {
  const navigation = useNavigation();
  const profile = useAppSelector((state) => state.profileSlice);

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
          title="Дата рождения"
        >
          {profile.birthDate
            ? format(new Date(profile.birthDate), 'dd.MM.yyyy')
            : 'Не указана'}
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
