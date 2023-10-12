import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { format } from 'date-fns';
import { useAppSelector } from 'Redux/hooks';

interface CalendarProps {
  onDateChange: (selectedDate: Date) => void;
  styleCSS?: [string];
  children?: React.ReactNode;
}

export default function Calendar({
  onDateChange,
  styleCSS = [
    'rounded-xl bg-gray-100 mt-3 px-3 py-4 w-full flex-row justify-between',
  ],
  children,
}: CalendarProps) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const userId = useAppSelector((state) => state.userSlice.user.id);
  const user =  useAppSelector((state) => state.userSlice.id);
  
  
  console.log('profile',user);

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

  return (
    //   <View className={`${styleCSS}`}>
    //   <Pressable onPress={showCalendar}>
    //     <View>
    //       <Text>День рождения</Text>
    //     </View>

    //     {showDatePicker && (
    //       <View>
    //         <DateTimePicker
    //           value={date}
    //           mode="date"
    //           minimumDate={minDate}
    //           maximumDate={maxDate}
    //           onChange={onChange}
    //           locale="ru-RU"
    //           display="spinner"
    //         />
    //         {Platform.OS === 'ios' && (
    //           <Pressable className='justify-center items-center' onPress={() => setShowDatePicker(false)}>
    //             <Text>ОК</Text>
    //           </Pressable>
    //         )}
    //       </View>
    //     )}

    //     <View>{children}</View>
    //     <View>
    //       <Text>{format(date, 'dd/MM/yyyy')}</Text>
    //     </View>
    //   </Pressable>
    // </View>

    <Pressable onPress={showCalendar}>
      <View className={`${styleCSS}`}>
        <Text>День рождения</Text>

        {userId ? (
          <View>{children}</View>
        ) : (
          <View>
            <Text>{format(date, 'dd/MM/yyyy')}</Text>
          </View>
        )}
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
              className="justify-center items-center"
              onPress={() => setShowDatePicker(false)}
            >
              <Text>ОК</Text>
            </Pressable>
          )}
        </View>
      )}
    </Pressable>
  );
}
