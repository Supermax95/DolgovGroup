import React, { FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import {
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Heading from 'ui/Heading';
import Search from 'ui/Search';
import Subcategory from 'ui/Subcategory';
import Padding from 'ui/Padding';

export interface ISubcategory {
  id: number;
  subcategoryName: string;
  categoryId: number;
}

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

const SubcategoryDetail = ({ route }: any) => {
  const { categoryId, categoryName } = route.params;
  const navigation = useNavigation<StackNavigationProp>();

  const subcategories = useAppSelector<ISubcategory[]>(
    (state) => state.subcategorySlice.data
  );

  //* все подкатегории по определённой категории
  const subOfCat = subcategories.filter(
    (subcategory) => subcategory.categoryId === categoryId
  );

  //* все товары по определённой категории

  console.log(
    'subOfCat=================================================+++ЮЮЮЮЮЮЮ>',
    subOfCat
  );

  const subcategoryIdArray = subOfCat.map((sub) => sub.id);

  const navigateToProductDetail = (
    subcategoryId: number,
    subcategoryName: string
  ): void => {
    navigation.navigate('ProductsCards', { subcategoryId, subcategoryName });
  };

  const navigateToProductDetailAll = (subcategoryIdArray: number): void => {
    navigation.navigate('ProductsCards', { subcategoryIdArray });
  };

  return (
    <SafeAreaView
      className={`flex-1 items-center justify-start py-2 bg-[#ffff] `}
    >
      <Heading title={categoryName} />

      {/* поиск внутри подкатегории */}
      {/* <Search /> */}

      {/* Scrollable container для подкатегорий */}
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View className="my-4">
          {/* мб, в это компонент Все товары категории сделать в виле UI и прокинуть реактпропс типа принимает готовый UI */}

          <Padding>
            <Pressable
              onPress={() => navigateToProductDetailAll(subcategoryIdArray)}
              // className={`py-4 flex-row justify-between ${tailwindClass}`}
              className={`px-2 py-3 flex-row border-b-[1px] border-gray-100`}
            >
              <View className="w-7">
                <MaterialCommunityIcons
                  name="creation"
                  size={19}
                  color="#10b981"
                />
              </View>
              <View className="flex-1 flex-row justify-between">
                <View>
                  <Text className="text-green-600 font-medium text-md">
                    Все товары категории
                  </Text>
                </View>
                <View className="w-7">
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={26}
                    color="#10b981"
                  />
                </View>
              </View>
            </Pressable>
          </Padding>

          {subOfCat.length ? (
            subOfCat.map((subcategory) => (
              <Subcategory
                key={subcategory.id}
                onPress={() =>
                  navigateToProductDetail(
                    subcategory.id,
                    subcategory.subcategoryName
                  )
                }
                title={subcategory.subcategoryName}
              />
            ))
          ) : (
            <View className="flex-row flex-wrap justify-center mt-4">
              <Text className="text-gray-600 font-medium text-lg">
                Подкатегоии отсутствуют
              </Text>
            </View>
          )}

          {/* <View className="flex-row flex-wrap justify-center">
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubcategoryDetail;
