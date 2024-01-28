import { View, Text, Image, SafeAreaView, Dimensions } from 'react-native';
import React, { FC } from 'react';

interface ISinglePromo {
  onPress: () => void;
  title: string;
  description: string;
  image: string;
  dateStart: Date | string;
  dateEnd: Date | string;
  carousel: boolean;
  invisible: boolean;
}

const SinglePromo: FC<ISinglePromo> = ({
  title,
  description,
  image,
  dateStart,
  dateEnd,

  invisible,
}) => {
  const screenHeight = Math.round(Dimensions.get('window').height);

  return (
    <>
      <SafeAreaView className={`w-full`}>
        {/* Image Section */}

        <View
          style={[{ height: screenHeight / 2.5 }]}
          className="w-full flex items-center justify-center relative"
        >
          <View
            className={`w-full h-full absolute top-0 left-0 flex items-center justify-center`}
          >
            <Image
              source={{ uri: image }}
              //   source={require('../assets/Trio.webp')}
              resizeMode="contain"
              className={`w-80 h-80`}
            />
            {/* {discountPercentage && isDiscount ? (
              <View className="px-2 py-1 bg-amber-400 rounded-full absolute justify-start items-center bottom-10 left-3">
                <Text className="text-sm text-gray-700 font-normal">
                  -{discountPercentage}%
                </Text>
              </View>
            ) : (
              <></>
            )} */}
            {/* <View className={`absolute flex items-end w-full bottom-2 right-5`}>
            <Text className={`text-xs font-normal text-gray-500`}>
              Арт. {article}
            </Text>
          </View> */}
          </View>
        </View>
      </SafeAreaView>

      <View
        className={`w-full flex-1 h-full bg-white rounded-t-3xl px-6 py-2 bg-slate-100`}
      >
        {/* //! артикул */}
        <View className="space-y-2">
          {/* <View className={`flex items-end w-full`}>
            <Text className={`text-xs font-normal text-gray-500`}>
              Арт. {article}
            </Text>
          </View> */}

          <View className={`flex items-start justify-start w-full`}>
            <Text className={`text-lg font-bold text-gray-800`}>{title}</Text>
          </View>

          {/* {isDiscount ? (
            <View className="flex-row items-center space-x-1">
              <Text className="text-2xl font-medium text-red-600">
                {discountedPrice}₽
              </Text>
              <Text className="text-lg font-normal opacity-50 line-through">
                {originalPrice}₽
              </Text>
            </View>
          ) : (
            <View className="flex-row items-center">
              <Text className="text-2xl font-medium text-gray-800">
                {originalPrice}₽
              </Text>
            </View>
          )} */}
        </View>

        {/* <View className="flex-col items-start justify-start w-full h-4">
          {isNew ? (
            <Text className="text-xs text-blue-500 font-medium">Новинка</Text>
          ) : (
            <></>
          )}
        </View> */}

        {/* //! на андроид нет отступа от текста и текст не переносится */}
        <SafeAreaView
          className={`mt-6 flex-col items-center justify-between w-full`}
        >
          <View className={`flex items-start justify-start w-full`}>
            {description}
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default SinglePromo;
