import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import { View, Alert } from 'react-native';
import { parseISO } from 'date-fns';
import Calendar from '../../../Registration/Calendar';
import Button from 'ui/Button';
import profileChangeBirthDate from 'Redux/thunks/Profile/profileChangeBirthDate.api';
import Padding from 'ui/Padding';

export const ChangeBirthDate = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp>();
  const userId = useAppSelector((state) => state.userSlice.user.id);
  const userDate = useAppSelector((state) => state.profileSlice.birthDate);
  console.log('userDate in file ChangeBirthDate', parseISO(userDate));

  const [data, setData] = useState({
    newBirthDate: parseISO(userDate) || new Date(),
  });

  const handleFieldChange = (field: string, value: Date) => {
    setData({ ...data, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      if (!data.newBirthDate) {
        Alert.alert('Ошибка', 'Выберите дату');
        return;
      }

      const result = await dispatch(
        profileChangeBirthDate({ userId, newBirthDate: data.newBirthDate })
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
    <View className="bg-white h-full">
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
    </View>
  );
};

export default ChangeBirthDate;
