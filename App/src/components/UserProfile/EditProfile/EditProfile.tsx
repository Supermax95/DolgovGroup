import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import { format } from 'date-fns';
import Padding from 'ui/Padding';
import FieldEditProfile from 'ui/FieldEditProfile';
import UniversalHeader from 'ui/UniversalHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditProfile: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const profile = useAppSelector<{
    lastName?: string;
    firstName?: string;
    middleName?: string;
    birthDate?: Date | null | string;
    email?: string;
    phoneNumber?: string;
    newEmail?: string;
  }>((state) => state.profileSlice);

  const formattedPhoneNumber = `+7(${profile.phoneNumber?.substring(
    0,
    3
  )})${profile.phoneNumber?.substring(3, 6)}-${profile.phoneNumber?.substring(
    6,
    8
  )}-${profile.phoneNumber?.substring(8, 10)}`;

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title="Личные данные"
      />

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
          onPress={() => navigation.navigate('ChangePhoneNumber')}
          title="Телефонный номер"
        >
          {formattedPhoneNumber}
        </FieldEditProfile>

      
        {profile.newEmail !== '' ? (
          <FieldEditProfile
            onPress={() => navigation.navigate('ChangeEmail')}
            title="Email"
          >
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 12 }}>{profile.email}</Text>
              <Text style={{ fontSize: 10 }}>{profile.newEmail}</Text>
            </View>
          </FieldEditProfile>
        ) : (
          <FieldEditProfile
            onPress={() => navigation.navigate('ChangeEmail')}
            title="Email"
          >
            {profile.email}
          </FieldEditProfile>
        )}

        <FieldEditProfile
          onPress={() => navigation.navigate('ChangePassword')}
          title="Пароль"
        >
          Изменить пароль
        </FieldEditProfile>
      </Padding>
    </SafeAreaView>
  );
};

export default EditProfile;
