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
  imageProduct: object;
}

const CardProduct: FC<ICardProduct> = ({
  productName,
  promoStartDate,
  promoEndDate,
  originalPrice,
  discountedPrice,
  discountPercentage,
  imageProduct,
}) => {
  return (
    <View className="px-1">
      <View className="rounded-md mt-4" style={{ ...BOX_SHADOW }}>
        <View className="bg-white w-40 h-60 rounded-lg items-center justify-center">
          <View className="relative">
            <Image source={imageProduct} className="h-32 w-36 mt-1" />
            <View className="px-2 py-1 bg-yellow-300 rounded-full absolute left-0 mt-1">
              <Text className="text-xs font-light opacity-80">
                -{discountPercentage}%
              </Text>
            </View>
          </View>

          <View className="bg-white w-36 h-24 ml-2 mr-2 justify-between">
            <View>
              <Text className="text-sm font-light opacity-80">
                {productName}
              </Text>
            </View>
            <View>
              <Text className="text-sm font-normal opacity-50 line-through mt-auto">
                {originalPrice} ₽
              </Text>
              <Text className="text-lg font-bold text-red-600">
                {discountedPrice} ₽
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardProduct;
