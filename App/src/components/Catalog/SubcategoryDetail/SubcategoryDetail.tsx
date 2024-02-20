import React, { FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Pressable,
  RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import getProducts from 'Redux/thunks/Catalog/productGet.api';
import getSubcategory from 'Redux/thunks/Catalog/subcategoryGet.api';
import Subcategory from 'ui/Subcategory';
import Padding from 'ui/Padding';
import UniversalHeader from 'ui/UniversalHeader';

export interface ISubcategory {
  id: number;
  subcategoryName: string;
  categoryId: number;
}

export interface IProduct {
  id: number;
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
  const dispatch = useAppDispatch();

  const subcategories = useAppSelector<ISubcategory[]>(
    (state) => state.subcategorySlice.data
  );
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await dispatch(getProducts());
      await dispatch(getSubcategory());
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
    } finally {
      setRefreshing(false);
    }
  };

  //* все подкатегории по определённой категории
  const subOfCat = subcategories.filter(
    (subcategory) => subcategory.categoryId === categoryId
  );

  const subcategoryIdArray = subOfCat.map((sub) => sub.id);

  const navigateToProductDetail = (
    subcategoryId: number,
    subcategoryName: string
  ): void => {
    navigation.navigate('ProductsCards', { subcategoryId, subcategoryName });
  };

  const navigateToProductDetailAll = (subcategoryIdArray: number[]): void => {
    navigation.navigate('ProductsCards', { subcategoryIdArray, categoryName });
  };

  return (
    <SafeAreaView className="flex-1  bg-[#ffff]">
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title={categoryName}
        onPressSearch={() => navigation.navigate('SearchProduct')}
      />

      {/* поиск внутри подкатегории */}

      <View className="flex-1 bg-[#F5F5F5]">
        {/* Scrollable container для подкатегорий */}
        <ScrollView
          alwaysBounceVertical
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, width: '100%' }}
          // bounces={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className="mb-4 py-6 flex-1 rounded-b-3xl bg-white">
            {/* мб, в это компонент Все товары категории сделать в виле UI и прокинуть реактпропс типа принимает готовый UI */}

            <Padding>
              <Pressable
                onPress={() => navigateToProductDetailAll(subcategoryIdArray)}
                className="px-2 py-3 flex-row border-b-[1px] border-gray-100"
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
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SubcategoryDetail;
