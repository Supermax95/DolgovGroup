import React, { FC } from 'react';
import {
  ScrollView,
  Image,
  View,
  Text,
  Pressable,
  Dimensions,
  StyleSheet,
} from 'react-native';

interface IProductCard {
  onPress: () => void;
  productName: string;
  originalPrice: number;
  isDiscount?: boolean | undefined;
  discountedPrice?: number | undefined;
  discountPercentage?: number | undefined;
  isNew?: boolean | undefined;
  imageProduct: string;
}

const ProductCard: FC<IProductCard> = ({
  onPress,
  productName,
  originalPrice,
  isDiscount,
  discountedPrice,
  discountPercentage,
  isNew,
  imageProduct,
}) => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const cardWidth = screenWidth / 2 - 20;

  return (
    <>
      <Pressable
        onPress={onPress}
        style={[styles.cardContainer, { width: cardWidth }]}
      >
        <Image
          source={{ uri: imageProduct }}
          resizeMode="contain"
          style={styles.image}
        />

        {discountPercentage && isDiscount ? (
          <View className="px-2 py-1 bg-amber-400 rounded-full absolute justify-start items-center top-2 left-1.5">
            <Text className="text-[11px] text-gray-700 font-normal">
              -{discountPercentage}%
            </Text>
          </View>
        ) : (
          <></>
        )}

        <View className="h-19 w-full space-y-1 mt-2 px-1">
          <View
            // style={styles.textContainer}
            className="flex-col items-start justify-start w-full h-8"
          >
            <Text className="text-xs text-gray-700 font-medium">
              {productName}
            </Text>
          </View>

          <View className="flex-col items-start justify-start w-full h-4">
            {isNew ? (
              <Text className="text-xs text-blue-500 font-medium">Новинка</Text>
            ) : (
              <></>
            )}
          </View>

          {isDiscount ? (
            <View className="flex-row items-center space-x-1">
              <Text className="text-lg font-medium text-red-600">
                {discountedPrice}₽
              </Text>
              <Text className="text-xs font-medium opacity-50 line-through">
                {originalPrice}₽
              </Text>
            </View>
          ) : (
            <View className="flex-row items-center">
              <Text className="text-lg font-medium text-gray-800">
                {originalPrice}₽
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    //
    position: 'relative',
    padding: 2,
    margin: 6,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 245,
  },
  image: {
    width: 144,
    height: 128,
  },
});

export default ProductCard;
