import { Image, Text, View } from 'react-native';
import React from 'react';

export const NewGoods = () => {
  return (
    // <View className="bg-zinc-100">
    <View className="">
      <View className="flex-row flex-wrap justify-center ">
        <View>
          <View className="rounded-2xl mt-4">
            <View className="bg-white w-36 h-64 ml-2 mr-2 rounded-xl items-center justify-center">
              <Image
                source={require('../../assets/ChocoMilka.png')}
                className="h-32 w-32"
              />
              <View className="bg-white w-36 h-24 ml-2 mr-2 pl-1 rounded-xl mt-0">
                <Text className="text-sm font-ligth opasity-80 mt-2">
                  Milk Domik v Derevne, 150 ml
                </Text>
                <Text className="text-sm font-normal opacity-50 line-through mt-4">
                  159,99 ₽
                </Text>
                <Text className="text-lg font-bold text-red-600">79,99 ₽</Text>
              </View>
            </View>
            {/* <View className="bg-white w-36 h-24 ml-2 mr-2 pl-1 rounded-xl mt-2">
              <Text className="text-lg font-normal">79,99 ₽</Text>
              <Text className="text-sm font-normal opacity-50 line-through">
                159,99 ₽
              </Text>
              <Text className="text-sm font-semibold opasity-80 mt-2">
                Milk Domik v Derevne, 150 ml
              </Text>
            </View> */}
          </View>
        </View>
        <View>
          <View className="bg-blue-50 w-36 h-36 ml-2 mr-2 rounded-xl mt-4 items-center justify-center">
            <Image
              source={require('../../assets/kinder.png')}
              className="h-32 w-32"
            />
          </View>
          <View className="bg-white w-36 h-24 ml-2 mr-2 pl-1 rounded-xl mt-2">
            <Text className="text-lg font-normal">79,99 ₽</Text>
            <Text className="text-sm font-normal opacity-50 line-through">
              159,99P
            </Text>
            <Text className="text-sm font-semibold opasity-80 mt-2">
              Milk Domik v Derevne, 150 ml
            </Text>
          </View>
        </View>
        <View>
          <View className="bg-blue-50 w-36 h-36 ml-2 mr-2 rounded-xl mt-4 items-center justify-center">
            <Image
              source={{
                uri: 'https://png.pngtree.com/element_our/20190603/ourlarge/pngtree-healthy-drink-milk-image_1440016.jpg',
              }}
              className="h-32 w-32"
            />
          </View>
          <View className="bg-gray-100 w-36 h-24 ml-2 mr-2 pl-1 rounded-xl mt-2">
            <Text className="text-lg font-normal">79,99 ₽</Text>
            <Text className="text-sm font-normal opacity-50 line-through">
              159,99P
            </Text>
            <Text className="text-sm font-semibold opasity-80 mt-2">
              Milk Domik v Derevne, 150 ml
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewGoods;