import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { PORT, IP } from '@env';

const LogoImage = styled.Image`
  padding: 150px;
  height: 240px;
  width: 240px;
  resizeMode: contain;
`;
const $PostView = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
`;

const LogoHello = () => {
  const [data, setData] = useState({});
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
      }
    };

    fetchData();
  }, []);

  return (
    <$PostView>
      <Text>Добро пожаловать</Text>
      <LogoImage
        source={{
          uri: 'https://poisk-firm.ru/storage/employer/logo/70/ba/a9/abb46e24b581abb40de2b12ed1.jpg',
        }}
      />
      <Text>{data.message}</Text>
      <Text>{data.someOtherData}</Text>
    </PostView>
  );
};

export default LogoHello;
