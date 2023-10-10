import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import Button from 'ui/Button';


interface CalendarProps {
  onDateChange: (selectedDate: Date) => void;
}

export default function Calendar({ onDateChange }: CalendarProps) {
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
    <View  style={{alignItems: "center"}}>
      <Button title="День рождения" onPress={showCalendar} colors={['bg-lime-200','bg-lime-300' ]}/>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          minimumDate={minDate}
          maximumDate={maxDate}
          onChange={onChange}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}


