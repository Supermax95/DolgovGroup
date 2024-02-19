import { View, Text, Image, SafeAreaView, Dimensions } from 'react-native';
import React, { FC } from 'react';

interface ISingleProductCard {
  article: string;
  productName: string;
  originalPrice: number;
  isDiscount?: boolean | undefined;
  discountedPrice?: number | undefined;
  discountPercentage?: number | undefined;
  isNew?: boolean | undefined;
  image: string;
  description?: React.ReactNode;
}

const SingleProductCard: FC<ISingleProductCard> = ({
  article,
  productName,
  originalPrice,
  isDiscount,
  discountedPrice,
  discountPercentage,
  isNew,
  image,
  description,
}) => {
  const screenHeight = Math.round(Dimensions.get('window').height);

  return (
    <>
      <SafeAreaView className={`w-full relative`}>
        {/* Image Section */}

        <Image
          source={{ uri: image }}
          resizeMode="contain"
          className={`w-80 h-80`}
          //  aspectRatio: 1.2  - меняет расположение картинки меньше/больше
          style={{ width: '100%', height: 'auto', aspectRatio: 1.2 }}
        />
        {discountPercentage && isDiscount ? (
          <View className="px-2 py-2 bg-amber-400 rounded-full absolute justify-start items-center bottom-10 left-4">
            <Text className="text-sm text-gray-700 font-normal">
              -{discountPercentage}%
            </Text>
          </View>
        ) : (
          <></>
        )}
      </SafeAreaView>

      <View className={`w-full flex-1 h-full bg-white rounded-t-3xl px-6 py-2`}>
        {/* //! артикул */}
        <View className="space-y-2">
          {/* <View className={`flex items-end w-full`}>
            <Text className={`text-xs font-normal text-gray-500`}>
              Арт. {article}
            </Text>
          </View> */}

          <View className={`flex items-start justify-start w-full`}>
            <Text className={`text-lg font-bold text-gray-800`}>
              {productName}
            </Text>
          </View>

          {discountedPrice !== originalPrice ? (
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
          )}
        </View>

        <View className="flex-col items-start justify-start w-full h-4">
          {isNew ? (
            <Text className="text-xs text-blue-500 font-medium">Новинка</Text>
          ) : (
            <></>
          )}
        </View>

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

export default SingleProductCard;
