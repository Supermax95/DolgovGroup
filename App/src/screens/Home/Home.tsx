import { Image, View, Text } from 'react-native';
import React from 'react';

const Home = () => {
  return (
    <View className="bg-white h-full">
      <View className="bg-blue-100 rounded-lg	 p-4 w-80 h-48 mx-auto mt-6">
        <View className="text-center mb-4">
          <Image
            source={{
              uri: 'https://dolgovagro.ru/upload/iblock/284/284c6bd1a7ab7a439c8559fecdb5275d.jpg',
            }}
            className="mt-2 h-[60px] w-full"
          />
        </View>
        <View className="mt-2">
          <View className="">
            <Text className="text-2xl font-extrabold text-green-500">
              22 балла
            </Text>
          </View>
        </View>
      </View>

      <Text>Акции</Text>
    </View>
  );
};

export default Home;
