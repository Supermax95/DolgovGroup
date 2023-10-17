import React, { useEffect, useState } from 'react';
import { Image, Text, View, Button } from 'react-native';
import { PORT, IP } from '@env';
import { useNavigation } from '@react-navigation/native';

export const Auth = () => {
  const [data, setData] = useState({});
  const navigation = useNavigation();

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
        console.error('Error fetching data:', error);
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
