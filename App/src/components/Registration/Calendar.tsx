import React, { useState } from 'react';
import { Text, View, Platform, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

interface CalendarProps {
  onDateChange: (selectedDate: Date) => void;
  styleCSS?: string[];
  initialDate?: Date | null; // Добавлено начальное значение для даты рождения
}

const Calendar: React.FC<CalendarProps> = ({
  onDateChange,
  styleCSS = ['rounded-xl bg-gray-100 mt-3 px-3 py-4 w-full flex-row justify-between'],
  initialDate = null, // Используется начальное значение из пропсов
}) => {
  const [date, setDate] = useState(initialDate || new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const currentDate = new Date();
  const maxDate = currentDate;
  const minDate = new Date(
    currentDate.getFullYear() - 100,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  const onChange = (_event: any, selectedDate: Date | undefined) => {
    if (selectedDate) {
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
    }
  };

  const showCalendar = () => {
    setShowDatePicker(true);
  };

  return (
    <Pressable onPress={showCalendar}>
      <View style={styleCSS}>
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
          {Platform.OS === 'ios' && (
            <Pressable
              style={{ justifyContent: 'center', alignItems: 'center' }}
              onPress={() => setShowDatePicker(false)}
            >
              <Text>ОК</Text>
            </Pressable>
          )}
        </View>
      )}
    </Pressable>
  );
};

export default Calendar;
