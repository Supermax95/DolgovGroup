import { View, Text, Pressable, Alert } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import Padding from 'ui/Padding';
import getProfileInfo from 'Redux/thunks/Profile/profileInfo.api';
import Calendar from 'components/Registration/Calendar';
import profileChangeBirthDate from '../../../Redux/thunks/Profile/profileChangeBirthDate.api';
// rfktylfhm
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import Button from 'ui/Button';

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const userId = useAppSelector((state) => state.userSlice.user.id);

  console.log('userId', userId);

  // console.log('userId', userId);
  const profile = useAppSelector((state) => state.profileSlice);
  console.log('profileAll============>', profile);
  const transferToBirthdate = async () => {
  navigation.navigate('ChangeDate');
}
  useEffect(() => {
    if (userId) {
      dispatch(getProfileInfo(userId));
    }
  }, [dispatch, userId]);

  // const handlerSubmitCalendar = async () => {
  //   try {
  //     const result = await dispatch(
  //       profileChangeBirthDate({
  //         userId,
  //         newBirthDate: data.selectedDate,
  //       })
  //     );
  //     console.log('resultresultresultresultresult', result);

  //     //   if (result.meta.requestStatus === 'rejected') {
  //     //     Alert.alert(
  //     //       'Ошибка',
  //     //       'Произошла ошибка при изменении дня рождения. Пожалуйста, попробуйте ещё раз.'
  //     //     );
  //     //   } else if (result.meta.requestStatus === 'fulfilled') {
  //     //     Alert.alert('ОК', 'День рождения успешно изменён', [
  //     //       {
  //     //         text: 'OK',
  //     //       },
  //     //     ]);
  //     //   }
  //   } catch (error) {
  //     Alert.alert(
  //       'Ошибка',
  //       'Данного пользователя не существует или произошла ошибка'
  //     );
  //   }
  // };

  const navigateToChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  // календарь

  const [date, setDate] = useState(new Date()); // Устанавливаем начальное значение из базы данных
  const [showDatePicker, setShowDatePicker] = useState(false);

  const currentDate = new Date();
  const maxDate = currentDate;
  const minDate = new Date(
    currentDate.getFullYear() - 100,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  const onChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate < minDate) {
      setDate(minDate);
      onDateChange(minDate);
    } else if (selectedDate > maxDate) {
      setDate(maxDate);
      onDateChange(maxDate);
    } else {
      setDate(selectedDate);
      onDateChange(selectedDate);
    }
  };

  const showCalendar = () => {
    setShowDatePicker(true);
  };

  const handlerSubmitCalendar = async () => {
    try {
      const result = await dispatch(
        profileChangeBirthDate({
          userId,
          newBirthDate: data.selectedDate,
        })
      );
      console.log('resultresultresultresultresult', result);

      //   if (result.meta.requestStatus === 'rejected') {
      //     Alert.alert(
      //       'Ошибка',
      //       'Произошла ошибка при изменении дня рождения. Пожалуйста, попробуйте ещё раз.'
      //     );
      //   } else if (result.meta.requestStatus === 'fulfilled') {
      //     Alert.alert('ОК', 'День рождения успешно изменён', [
      //       {
      //         text: 'OK',
      //       },
      //     ]);
      //   }
    } catch (error) {
      Alert.alert(
        'Ошибка',
        'Данного пользователя не существует или произошла ошибка'
      );
    }
  };

  return (
    <View className="bg-white h-full">
      <Padding>
        <Padding>
          <Pressable
            // onPress={onPress}
            className={`py-4 flex-row border-b-[1px] border-zinc-200 justify-between`}
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
          {/* <Calendar
            onDateChange={(selectedDate) =>
              handlerSubmitCalendar('newBirthDate', selectedDate)
            }
            styleCSS={[
              'py-4 flex-row border-b-[1px] border-zinc-200 justify-between',
            ]}
          >
            <Text className="text-zinc-500">{profile.birthDate}</Text>
          </Calendar> */}
          <Pressable onPress={showCalendar}>
            <View
              className={`py-4 flex-row border-b-[1px] border-zinc-200 justify-between`}
            >
              <Text>День рождения</Text>

              <View>
                <Text>{format(date, 'dd.MM.yyyy')}</Text>
              </View>
            </View>

            {showDatePicker && (
              <View>
                <DateTimePicker
                  value={date}
                  mode="date"
                  minimumDate={minDate}
                  maximumDate={maxDate}
                  onChange={onChange}
                  locale="ru-RU"
                  display="spinner"
                />
              </View>
            )}
          </Pressable>
        </Padding>
        <Padding>
          <Pressable
            // onPress={onPress}
            className={`py-4 flex-row border-b-[1px] border-zinc-200 justify-between`}
          >
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
            className={`py-4 flex-row border-b-[1px] border-zinc-200 justify-between`}
            onPress={navigateToChangePassword} // Добавили обработчик нажатия
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
      <Button onPress={transferToBirthdate} title={'ДР'}/>
    </View>
  );
};

export default EditProfile;
