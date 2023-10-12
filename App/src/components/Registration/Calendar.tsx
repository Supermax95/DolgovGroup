import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Children, useState } from 'react';
import Button from 'ui/Button';

interface CalendarProps {
  onDateChange: (selectedDate: Date) => void;
  styleCSS?: [string];
  children?: React.ReactNode;
}
export default function Calendar({
  onDateChange,
  styleCSS = ['rounded-xl bg-gray-100 mt-3 px-3 py-4 w-full '],
  children,
}: CalendarProps) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const currentDate = new Date();
  const maxDate = currentDate;
  const minDate = new Date(
    currentDate.getFullYear() - 100,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);

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

  return (
    <Pressable onPress={showCalendar} className={`${styleCSS}`}>
      <View>
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
        </View>
      </View>
      <View>{children}</View>
    </Pressable>
  );
}
