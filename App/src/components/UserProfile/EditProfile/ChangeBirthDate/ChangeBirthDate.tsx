import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { View, Text, Alert } from 'react-native';
import Calendar from '../../../Registration/Calendar';
import Button from 'ui/Button';
import profileChangeBirthDate from 'Redux/thunks/Profile/profileChangeBirthDate.api';
import { parseISO } from 'date-fns';

export const ChangeBirthDate: FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.userSlice.user.id);
  const userDate = useAppSelector((state) => state.profileSlice.birthDate);
  console.log('userDate',  parseISO(userDate));

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
        Alert.alert('Дата успешно изменена');
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Произошла ошибка');
    }
  };

  useEffect(() => {
    // Если `userDate` из Redux еще не загружена, попробуйте загрузить ее здесь.
  }, []);

  return (
    <View>
      <Calendar
        onDateChange={(selectedDate) =>
          handleFieldChange('newBirthDate', selectedDate)
        }
        initialDate={data.newBirthDate}
        selectedDate={data.newBirthDate}
      />

      <Button onPress={handleSubmit} title="Изменить дату" />
    </View>
  );
};

export default ChangeBirthDate;
