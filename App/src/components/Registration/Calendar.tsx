import { StatusBar } from 'expo-status-bar';
import { View, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

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
    <View>
      <Button title="Выбрать дату рождения" onPress={showCalendar} />
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

// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, View } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { useState } from "react";

// export default function Calendar() {
//   const [date, setDate] = useState(new Date());

//   const onChange = (e, selectedDate) => {
//     setDate(selectedDate);
//   };

//   return (
//     <View style={styles.container}>
//       <DateTimePicker
//         value={date}
//         mode={"date"}
//         is24Hour={true}
//         onChange={onChange}
//       />
//       {/* <DateTimePicker
//         value={date}
//         mode={"time"}
//         is24Hour={true}
//         onChange={onChange}
//       /> */}
//       {/* <Text>{date.toLocaleString()}</Text> */}
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
