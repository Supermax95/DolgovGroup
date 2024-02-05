import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, Alert, SafeAreaView, Modal } from 'react-native';
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
      {/* <UniversalHeader
        onPress={() => navigation.goBack()}
        title={'Доступ сотрудника'}
      /> */}

      <Modal
        // visible={isFilterModalVisible}
        animationType="slide"
        transparent={true}
        // onRequestClose={() => {
        //   applyFilters();
        //   setFilterModalVisible(false);
        // }}
      ></Modal>
      <View className="flex-1 justify-center items-center">
        {userStatus === 'Новый сотрудник' ? (
          <Text>Ваш запрос еще обрабатывается</Text>
        ) : userStatus === 'Сотрудник' ? (
          <View className="flex-row justify-center items-center mt-4">
            <Text className="text-lg font-normal text-zinc-500">
              Вы являетесь сотрудником компании
            </Text>
          </View>
        ) : (
          <Padding>
            <View className="flex-row justify-center items-center mt-4">
              <Text className="text-lg font-normal text-zinc-500">
                Если вы являетесь сотрудником компании, для изменения своего
                статуса в личном кабинете и получения необходимого доступа,
                пожалуйста, воспользуйтесь кнопкой "Запросить проверку".
              </Text>
            </View>
            <Button title="Запросить проверку" onPress={handleSubmit} />
          </Padding>
        )}
      </View>
    </SafeAreaView>
  );
};

export default EmployeeConfirm;
