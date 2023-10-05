// import { styled } from 'nativewind';
import { Image, View, Text } from 'react-native';
import React from 'react';

import { withExpoSnack } from 'nativewind';
import NewGoods from 'screens/NewGoods/NewGoods';

// const View = styled(View);
// const Text = styled(Text);

const Home = () => {
  return (
    <View className="bg-white h-full">
      <View
        style={{ elevation: 2 }}
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
        style={{ elevation: 2 }}
        className="bg-green-200 rounded-lg p-2 w-80 mx-auto mt-4"
      >
        <Text className="text-center text-lg font-bold">Акции</Text>
      </View>
      <NewGoods />
    </View>
  );
};

export default Home;
