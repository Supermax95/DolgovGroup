import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';
import styled from 'styled-components/native';
import { PORT, IP } from '@env';
import { useNavigation } from '@react-navigation/native';

// const LogoImage = styled.Image`
//   padding: 150px;
//   height: 240px;
//   width: 240px;
//   resizeMode: contain;
// `;

// const PostView = styled.View`
//   flex: 1;
//   alignItems: center;
//   justifyContent: center;
//   background-color:white ;
// `;

export const LogoHello = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${IP}:${PORT}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <Text>Добро пожаловать</Text>
      <Image
        source={{
          uri: 'https://poisk-firm.ru/storage/employer/logo/70/ba/a9/abb46e24b581abb40de2b12ed1.jpg',
        }}
        style={{ padding: 150, height: 240, width: 240, resizeMode: 'contain' }}
      />
      <Text>{data.message}</Text>
      <Text>{data.someOtherData}</Text>
      <Button
        title="Перейти на LoginPage"
        onPress={() => navigation.navigate('LoginPage')}
      />
    </View>
  );
};
