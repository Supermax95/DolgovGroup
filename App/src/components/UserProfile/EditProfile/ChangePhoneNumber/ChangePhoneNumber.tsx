import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import { View, Text, Alert } from 'react-native';
import Button from 'ui/Button';
import Padding from 'ui/Padding';
import profileChangePhoneNumber from 'Redux/thunks/Profile/profileChangePhoneNumber.api'; // Correct import
import { TextInputMask } from 'react-native-masked-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import UniversalHeader from 'ui/UniversalHeader';

interface IChangePhone {
  newPhoneNumber: string;
}

const ChangePhoneNumber: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp>();
  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );
  const reduxPhoneProfile = useAppSelector<string>(
    (state) => state.profileSlice.phoneNumber!
  );
  

  const phoneProfile = `+7 (${reduxPhoneProfile.substring(
    0,
    3
  )}) ${reduxPhoneProfile.substring(3, 6)}-${reduxPhoneProfile.substring(
    6,
    8
  )}-${reduxPhoneProfile.substring(8, 10)}`;

  const validatePhoneNumber = (): boolean => {
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return phoneRegex.test(data.newPhoneNumber);
  };

  const [data, setData] = useState<IChangePhone>({
    newPhoneNumber: phoneProfile || '',
  });


  const [errorMessages, setErrorMessages] = useState<IChangePhone>({
    newPhoneNumber: '',
  });

  const handleFieldChange = (
    field: keyof IChangePhone,
    value: string
  ): void => {
    setData((prevData) => ({ ...prevData, [field]: value }));
    setErrorMessages((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const handlerSubmitEmail = async (): Promise<void> => {
    if (!data.newPhoneNumber || !validatePhoneNumber()) {
      setErrorMessages({
        newPhoneNumber: !data.newPhoneNumber
          ? 'Введите номер'
          : 'Введите корректный телефонный номер',
      });
    } else {
      try {
        const result = await dispatch(
          profileChangePhoneNumber({
            token,
            newPhoneNumber: data.newPhoneNumber,
          })
        );

        if (result.meta.requestStatus === 'rejected') {
          Alert.alert(
            'Ошибка',
            'Пользователь с таким номером телефона уже существует'
          );
        } else if (result.meta.requestStatus === 'fulfilled') {
          Alert.alert('Ваш номер телефона успешно обновлен', '', [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('EditProfile');
              },
            },
          ]);
        }
      } catch (error) {
        Alert.alert(
          'Ошибка',
          'Данного пользователя не существует или произошла ошибка'
        );
      }
    }
  };

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title="Изменение профиля"
      />
      <Padding>
        <Padding>
          <TextInputMask
            className="rounded-xl bg-gray-100 mt-3 p-3 w-full"
            type={'custom'}
            options={{
              mask: '+7 (999) 999-99-99',
            }}
            value={data.newPhoneNumber}
            onChangeText={(text) => handleFieldChange('newPhoneNumber', text)}
            placeholder="+7 (___) ___-__-__"
            keyboardType="number-pad"
          />
          {errorMessages.newPhoneNumber && (
            <Text className="text-red-500 ml-1 mt-1 text-xs">
              {errorMessages.newPhoneNumber}
            </Text>
          )}
          <Button onPress={handlerSubmitEmail} title="Сохранить" />
        </Padding>
      </Padding>
    </SafeAreaView>
  );
};

export default ChangePhoneNumber;
