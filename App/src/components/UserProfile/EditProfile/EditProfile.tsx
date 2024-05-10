import React, { FC, useState } from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import { format } from 'date-fns';
import Padding from 'ui/Padding';
import FieldEditProfile from 'ui/FieldEditProfile';
import UniversalHeader from 'ui/UniversalHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import getProfileInfo from 'Redux/thunks/Profile/profileInfo.api';

const EditProfile: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getProfileInfo({ token }));
    setRefreshing(false);
  };

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

  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getProfileInfo({ token }));
    }, [dispatch, token])
  );

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title="Личные данные"
      />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
              warningIcon="exclamationcircleo"
            >
              {profile.email}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
