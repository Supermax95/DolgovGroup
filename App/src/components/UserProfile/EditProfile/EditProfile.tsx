import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import Padding from 'ui/Padding';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import getProfileInfo from 'Redux/thunks/Profile/profileInfo.api';
import DateTimePicker from '@react-native-community/datetimepicker';
import Calendar from 'components/Registration/Calendar';

// interface CalendarProps {
//   onDateChange: (selectedDate: Date) => void;
// }

// const EditProfile = ({ onDateChange }: CalendarProps) => {
const EditProfile = () => {
  // const [date, setDate] = useState(new Date());
  // const [showDatePicker, setShowDatePicker] = useState(false);

  // const currentDate = new Date();
  // const maxDate = currentDate;
  // const minDate = new Date(
  //   currentDate.getFullYear() - 100,
  //   currentDate.getMonth(),
  //   currentDate.getDate()
  // );

  // const onChange = (event, selectedDate) => {
  //   setShowDatePicker(false);

  //   if (selectedDate < minDate) {
  //     setDate(minDate);
  //     onDateChange(minDate);
  //   } else if (selectedDate > maxDate) {
  //     setDate(maxDate);
  //     onDateChange(maxDate);
  //   } else {
  //     setDate(selectedDate);
  //     onDateChange(selectedDate);
  //   }
  // };

  // const showCalendar = () => {
  //   setShowDatePicker(true);
  // };

  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.userSlice.user.id);
  // console.log('userId', userId);

  useEffect(() => {
    if (userId) {
      dispatch(getProfileInfo(userId));
    }
  }, [dispatch, userId]);

  const profile = useAppSelector((state) => state.profileSlice);
  console.log(profile);

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
        {/* <Padding>
          <Pressable
            onPress={showCalendar}
            className={`py-4 flex-row border-b-[1px] border-zinc-200 justify-between`}
          >
            <View>
              <Text>День рождения</Text>
            </View>
            <View>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  minimumDate={minDate}
                  maximumDate={maxDate}
                  onChange={onChange}
                  locale="ru-RU"
                />
              )}

              <Text className="text-zinc-500">{profile.birthDate}</Text>
            </View>
          </Pressable>
        </Padding> */}
        <Padding>
          <Calendar
            onDateChange={(selectedDate) =>
              handleFieldChange('birthDate', selectedDate)
            }
            styleCSS={[
              'py-4 flex-row border-b-[1px] border-zinc-200 justify-between',
            ]}
          >
            <Text className="text-zinc-500">{profile.birthDate}</Text>
          </Calendar>
        </Padding>
        <Padding>
          <TouchableOpacity
            // onPress={onPress}
            className={`py-4 flex-row border-b-[1px] border-zinc-200 justify-between`}
          >
            <View>
              <Text>Email</Text>
            </View>
            <View>
              <Text className="text-zinc-500">{profile.email}</Text>
            </View>
          </TouchableOpacity>
        </Padding>
        <Padding>
          <Pressable
            // onPress={onPress}
            className={`py-4 flex-row border-b-[1px] border-zinc-200 justify-between`}
          >
            <View>
              <Text>Пароль</Text>
            </View>
            <View>
              <Text className="text-zinc-500">Изменить пароль</Text>
            </View>
          </Pressable>
        </Padding>

        {/* <FieldEditProfile title="Дата рождения" fieldСhange="12.07.2000" />
        <FieldEditProfile title="Email" fieldСhange="rbirbrty0@gmail.com" />
        <FieldEditProfile title="Пароль" fieldСhange="Сброс пароля" /> */}
      </Padding>
    </View>
  );
};

export default EditProfile;
