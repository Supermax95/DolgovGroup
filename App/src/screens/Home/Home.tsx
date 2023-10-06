import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import React from 'react';

import NewGoods from 'screens/NewGoods/NewGoods';
import { BOX_SHADOW } from 'styles';

const Home = () => {
  return (
    <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
      <View className="bg-white h-full">
        <View
          style={{ ...BOX_SHADOW }}
          className="bg-white rounded-2xl p-4 w-80 h-48 mx-auto mt-6"
        >
          <View className="text-center mb-4 ">
            <Image
              source={{
                uri: 'https://mosrst.ru/wp-content/uploads/2016/09/SHtrihkodirovanie.jpg',
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
        <View
          style={{ ...BOX_SHADOW }}
          className="bg-lime-300 rounded-lg p-2 w-80 mx-auto mt-4"
        >
          <Text className="text-center text-lg font-bold">Акции</Text>
        </View>
        <NewGoods />
      </View>
    </ScrollView>
  );
};

export default Home;
