import React, { useEffect, useState } from 'react';
import { Image, Text, View, Button, Alert } from 'react-native';
import { PORT, IP } from '@env';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';

export const Auth = () => {
  const [data, setData] = useState({});
  const navigation = useNavigation<StackNavigationProp>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${IP}:${PORT}/api`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        Alert.alert('Error fetching data:');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <View className="flex-1 items-center justify-center bg-white">
        <Text>Добро пожаловать</Text>
        <Image
          source={require('../../assets/наш_продукт_лого.png')}
          className="h-[240px] w-[240px]"
          resizeMode="contain"
        />
        <Text>{data.message}</Text>
        <Text>{data.someOtherData}</Text>
        <Button
          title="Зарегистрироваться"
          onPress={() => navigation.navigate('Registration')}
        />
        <Button title="Вход" onPress={() => navigation.navigate('SignIn')} />
      </View>
    </>
  );
};
