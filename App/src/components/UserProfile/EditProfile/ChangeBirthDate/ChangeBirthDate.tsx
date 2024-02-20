import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import { View, Alert } from 'react-native';
import { parseISO } from 'date-fns';
import Calendar from '../../../Calendar/Calendar';
import Button from 'ui/Button';
import profileChangeBirthDate from 'Redux/thunks/Profile/profileChangeBirthDate.api';
import Padding from 'ui/Padding';
import { SafeAreaView } from 'react-native-safe-area-context';
import UniversalHeader from 'ui/UniversalHeader';

export const ChangeBirthDate: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp>();
  const userDate = useAppSelector<Date | null | string>(
    (state) => state.profileSlice.birthDate
  );

  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );
  // const email = useAppSelector<null | string>(
  //   (state) => state.userSlice.user.email
  // );
  //  const refreshResult = dispatch(refreshToken());

  const userDateAsDate =
    userDate !== null ? parseISO(userDate as string) : null;

  const [data, setData] = useState({
    newBirthDate: userDateAsDate || new Date(),
  });

  const handleFieldChange = (field: string, value: Date): void => {
    setData({ ...data, [field]: value });
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      if (!data.newBirthDate) {
        Alert.alert('Ошибка', 'Выберите дату');
        return;
      }

      const result = await dispatch(
        profileChangeBirthDate({ token, newBirthDate: data.newBirthDate })
      );
      if (result.meta.requestStatus === 'rejected') {
        Alert.alert(
          'Ошибка',
          'Произошла ошибка при изменении даты. Пожалуйста, попробуйте ещё раз.'
        );
      } else if (result.meta.requestStatus === 'fulfilled') {
        Alert.alert(
          'Ваша дата рождения была успешно изменена',
          'Ваша дата рождения была успешно изменена',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('EditProfile');
              },
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Произошла ошибка');
    }
  };

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title="Изменение профиля"
      />
      <Padding>
        <Padding>
          <View>
            <Calendar
              onDateChange={(selectedDate) =>
                handleFieldChange('newBirthDate', selectedDate)
              }
              initialDate={data.newBirthDate}
              selectedDate={data.newBirthDate}
            />
          </View>
          <Button onPress={handleSubmit} title="Сохранить" />
        </Padding>
      </Padding>
    </SafeAreaView>
  );
};

export default ChangeBirthDate;
