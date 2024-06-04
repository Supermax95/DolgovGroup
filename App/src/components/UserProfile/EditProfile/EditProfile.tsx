import React, { FC, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  Pressable,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import { format } from 'date-fns';
import Padding from 'ui/Padding';
import FieldEditProfile from 'ui/FieldEditProfile';
import UniversalHeader from 'ui/UniversalHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import getProfileInfo from 'Redux/thunks/Profile/profileInfo.api';
import DeleteAccount from './DeleteAccount/DeleteAccount';

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
    lastName?: string | undefined;
    firstName?: string | undefined;
    middleName?: string | undefined;
    birthDate?: Date | null | string | undefined;
    email?: string | undefined;
    phoneNumber?: string | undefined;
    newEmail?: string | undefined;
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

  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getProfileInfo({ token }));
    }, [dispatch, token])
  );

  const handleDeleteShowModal = (): void => {
    try {
      // dispatch(deleteClients(userId));
    } catch (error) {
      console.error('Произошла ошибка при отправке:', error);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title="Личные данные"
        handleDeleteShowModal={() => setModalVisible(true)}
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

          {/* <FieldEditProfile
            onPress={() => navigation.navigate('ChangeBirthDate')}
            title="Дата рождения"
          >
            {profile.birthDate
              ? format(new Date(profile.birthDate), 'dd.MM.yyyy')
              : 'Не указана'}
          </FieldEditProfile> */}

          {profile.birthDate ? (
            <FieldEditProfile
              onPress={() => navigation.navigate('ChangeBirthDate')}
              title="Дата рождения"
            >
              {format(new Date(profile.birthDate), 'dd.MM.yyyy')}
            </FieldEditProfile>
          ) : (
            <FieldEditProfile
              onPress={() => navigation.navigate('ChangeBirthDate')}
              title="Дата рождения"
              warningIcon="exclamationcircleo"
            >
              Не указана
            </FieldEditProfile>
          )}
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

      <DeleteAccount
        visible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
};

export default EditProfile;
