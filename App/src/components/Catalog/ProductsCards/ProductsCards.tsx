import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import CardCategory from 'ui/CardCategory';
import CardNoCarusel from 'components/ Action/CardNoCarusel/CardNoCarusel';
import Heading from 'ui/Heading';
import Search from 'ui/Search';
import ProductCard from 'ui/ProductCard';
import { PORT, IP } from '@env';

export interface IProduct {
  id: number;
  article: string;
  productName: string;
  promoStartDate: string;
  promoEndDate: string;
  originalPrice: number;
  customerPrice: number;
  employeePrice: number;
  isNew: boolean;
  isDiscounted: boolean;
  description: string;
  photo: string;
  subcategoryId: number;
  invisible: boolean;
}

const ProductsCards = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();

  const products = useAppSelector<IProduct[]>(
    (state) => state.productSlice.data
  );
  console.log('productsCArds', products);

  // function calculateDiscountPercentageWithCents(
  //   originalPrice: number,
  //   discountedPrice: number
  // ) {
  //   if (originalPrice <= 0 || discountedPrice <= 0) {
  //     return 0; // Защита от деления на ноль или отрицательных значений
  //   }

  //   // Вычисляем скидку в копейках
  //   const originalCents = originalPrice * 100;
  //   const discountedCents = discountedPrice * 100;
  //   const discountAmountCents = originalCents - discountedCents;

  //   // Вычисляем процент скидки
  //   const discountPercentage = (discountAmountCents / originalCents) * 100;

  //   return Number(discountPercentage.toFixed(0)); // Округляем до двух знаков после запятой
  // }

  // // Пример использования функции
  // const originalPrice = 122.73; // Исходная цена, включая копейки
  // const discountedPrice = 116.36; // Цена со скидкой, включая копейки

  // const discountPercentage = calculateDiscountPercentageWithCents(
  //   originalPrice,
  //   discountedPrice
  // );

  return (
    <SafeAreaView
      className={`flex-1 items-center justify-start py-2 bg-[#ffff] `}
    >
      <Heading title="тайтл подкатегории" />
      <Search />
      {/* Scrollable container start */}
      <ScrollView style={{ flex: 1, width: '100%' }}>
        {/* <View className=""> */}
        <View className="flex-row flex-wrap justify-center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              productName={product.productName}
              originalPrice={product.originalPrice}
              isDiscount={product.isDiscounted}
              discountedPrice={255}
              discountPercentage={15}
              // discountPercentage={calculateDiscountPercentageWithCents(
              //   product.originalPrice,
              //   product.employeePrice
              // )}
              isNew={product.isNew}
              imageProduct={`http://${IP}:${PORT}${product.photo}`}
            />
          ))}
          {/* </View> */}
        </View>
        {/* {isLoading ? (
      <View className={`flex-1 h-80 items-center justify-center`}>
        <ActivityIndicator size={'large'} color={'teal'} />
      </View>
    ) : ( */}

        {/* // feeds={filtered || filtered?.length > 0 ? filtered : feeds?.feeds}
    // />
    )} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductsCards;
