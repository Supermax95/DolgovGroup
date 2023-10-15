import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { View, Text, Alert } from 'react-native';
import Calendar from '../../Registration/Calendar';
import Button from 'ui/Button';
import profileChangeBirthDate from 'Redux/thunks/Profile/profileChangeBirthDate.api';

export const ChangeDate: FC = () => {
  const dispatch = useAppDispatch();
  //   const navigation = useNavigation();
  const userId = useAppSelector((state) => state.userSlice.user.id);
  console.log('uuuuussseeerrrr ', userId);

  const userDate = useAppSelector((state) => state.profileSlice.birthDate);
  console.log('я в дате ДР', userDate);

  const [data, setData] = useState<{ newBirthDate: Date | null }>({
    newBirthDate: userDate ? new Date(userDate) : null,
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

  return (
    <View>
      <Calendar
        onDateChange={(selectedDate) =>
          handleFieldChange('newBirthDate', selectedDate)
        }
        selectedDate={data.newBirthDate}
      />
      <Button onPress={handleSubmit} title="Изменить дату" />
    </View>
  );
};

export default ChangeDate;
