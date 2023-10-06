import { View, Text, Image } from 'react-native';
import React, { FC } from 'react';
import { BOX_SHADOW } from 'styles';

interface ICardProduct {
  productName: string;
  promoStartDate: string;
  promoEndDate: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  image: string;
}

const CardProduct: FC<ICardProduct> = ({
  productName,
  promoStartDate,
  promoEndDate,
  originalPrice,
  discountedPrice,
  discountPercentage,
  image,
}) => {
  return (
    <View className="px-1">
      <View className="rounded-md mt-4" style={{ ...BOX_SHADOW }}>
        <View className="bg-white w-40 h-64 rounded-xl items-center justify-center">
          <View className="relative">
            <Image source={image} className="h-32 w-32 mt-2" />
            <View className="px-2 py-1 bg-yellow-300 rounded-full absolute top-0 left-0 ">
              <Text className="text-xs font-light opacity-80">
                -{discountPercentage}%
              </Text>
            </View>
          </View>

          <View className="bg-white w-36 h-24 ml-2 mr-2 pl-2 rounded-xl">
            <Text className="text-sm font-ligth opasity-80">{productName}</Text>
            <Text className="text-sm font-normal opacity-50 line-through mt-4">
              {originalPrice} ₽
            </Text>
            <Text className="text-lg font-bold text-red-600">
              {discountedPrice} ₽
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardProduct;
