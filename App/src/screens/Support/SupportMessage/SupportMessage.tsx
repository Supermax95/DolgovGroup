import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, Alert, SafeAreaView } from 'react-native';
import { StackNavigationProp } from 'navigation/types';
import Padding from 'ui/Padding';
import FieldInput from 'ui/FieldInput';
import UniversalHeader from 'ui/UniversalHeader';
import nodemailerSend from 'Redux/thunks/Support/supportNodemailer.api';

const SupportMessage: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();
  const token = useAppSelector<string | undefined>((state) => state.userSlice.token?.refreshToken);

  const [data, setData] = useState({
    titleMessage: '',
    message: '',
  });

  const handleFieldChange = (field: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!data.titleMessage || !data.message) {
      Alert.alert('Поля не заполнены', 'Пожалуйста, заполните все поля');
      return;
    }
  
    const result = await dispatch(
      nodemailerSend({
        token,
        titleMessage: data.titleMessage,
        message: data.message,
      })
    );
  
    if (result.meta.requestStatus === 'rejected') {
      Alert.alert('Ошибка', 'Произошла ошибка при отправке обращения, попробуйте повторить позже');
    } else {
      // Успешная отправка
      Alert.alert('Ваше обращение успешно отправлено');
      navigation.navigate('Support');
    }
  };

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader onPress={() => navigation.goBack()} title={'Обращение в службу поддержки'} />
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Text style={{ textAlign: 'center', color: 'gray', fontSize: 20, fontWeight: 'bold', marginVertical: 2 }}>
        Заполните поля
      </Text>

      <FieldInput
        value={data.titleMessage}
        placeholder="Тема обращения"
        onChange={(value) => handleFieldChange('titleMessage', value)}
        autoCapitalize="words"
      />

      <FieldInput
        value={data.message}
        placeholder="Текст"
        onChange={(value) => handleFieldChange('message', value)}
        autoCapitalize="words"
      />

      <Padding>
        <Button title="Отправить" onPress={handleSubmit} />
      </Padding>
    </View>
    </SafeAreaView>
  );
};

export default SupportMessage;
