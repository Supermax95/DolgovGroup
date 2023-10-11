import { View, Text, Image } from 'react-native';
import React, { FC } from 'react';
import { BOX_SHADOW } from 'styles';

interface IPromotionalCardProduct {
  productName: string;
  promoStartDate: string;
  promoEndDate: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  imageProduct: object;
}

const PromotionalCardProduct: FC<IPromotionalCardProduct> = ({
  productName,
  promoStartDate,
  promoEndDate,
  originalPrice,
  discountedPrice,
  discountPercentage,
  imageProduct,
}) => {
  return (
    <View
      style={{ ...BOX_SHADOW }}
      className="bg-white h-64 w-48 mt-2 mb-2 rounded-2xl items-center"
    >
      <Image source={imageProduct} className="h-32 w-36 mt-6" />
      <View className="px-2 py-1 bg-yellow-300 rounded-full absolute left-3 mt-2">
        <Text className="text-xs font-light opacity-80">
          -{discountPercentage}%
        </Text>
      </View>
      <View className="mx-1 h-24 justify-between">
        <Text>{productName}</Text>
        <Text className="text-sm font-normal opacity-50 line-through mt-auto">
          {originalPrice} ₽
        </Text>
        <Text className="text-lg font-bold text-red-600">
          {discountedPrice} ₽
        </Text>
      </View>
    </View>
  );
};

export default PromotionalCardProduct;
