import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, Alert, SafeAreaView } from 'react-native';
import { StackNavigationProp } from 'navigation/types';
import Padding from 'ui/Padding';
import FieldInput from 'ui/FieldInput';
import UniversalHeader from 'ui/UniversalHeader';
import checkEmployee from 'Redux/thunks/Support/checkEmployee.api';

const EmployeeConfirm: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();
  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );
  const userStatus = useAppSelector<string | undefined>(
    (state) => state.userSlice.user.userStatus
  );
  console.log(userStatus);

  const handleSubmit = async () => {
    const result = await dispatch(
      checkEmployee({
        token,
      })
    );

    if (result.meta.requestStatus === 'rejected') {
      Alert.alert(
        'Ошибка',
        'Произошла ошибка при отправке запроса, попробуйте повторить позже'
      );
    } else {
      Alert.alert('Ваше обращение успешно отправлено, ожидайте подтверждения ');
      navigation.navigate('Support');
    }
  };

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title={'Получение доступа работнику'}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        {userStatus === 'Новый сотрудник' ? (
          <Text>Ваш запрос еще обрабатывается</Text>
        ) : (
          <Padding>
            <Button title="Запросить проверку" onPress={handleSubmit} />
          </Padding>
        )}
      </View>
    </SafeAreaView>
  );
};

export default EmployeeConfirm;
