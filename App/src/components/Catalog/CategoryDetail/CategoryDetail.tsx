import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import CardCategory from 'ui/CardCategory';
import Heading from 'ui/Heading';
import CardsNoCarusel from 'components/Promotion/CardsNoCarusel';
import UniversalHeader from 'ui/UniversalHeader';
import { LinearGradient } from 'expo-linear-gradient';

export interface ICategory {
  id: number;
  categoryName: string;
  img: string;
}

export interface ISubcategory {
  id: number;
  subcategoryName: string;
  categoryId: number;
}

function CategoryDetail() {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();

  const categories = useAppSelector<ICategory[]>(
    (state) => state.categorySlice.data
  );

  const navigateToSubcategoryDetail = (
    categoryId: number,
    categoryName: string
  ): void => {
    navigation.navigate('SubcategoryDetail', { categoryId, categoryName });
  };

  const handleSearchPress = () => {
    navigation.navigate('SearchProduct');
  };

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        //* что возможно можно в шторке прокинуть навигейт на Магазины рядом
        title="Каталог"
        onPressSearch={handleSearchPress}
      />

      <LinearGradient
        colors={['#FAF9F9', '#FAFAFA', '##F5F5F5']}
        className="flex-1"
      >
        {/* Scrollable container start */}
        <ScrollView
          alwaysBounceVertical
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, width: '100%' }}
        >
          {/* акции вне карусели */}
          <View className="py-2">
            <Heading title="Акции вне карусели" />
            <CardsNoCarusel />
          </View>

          {/* Каталог */}
          <View className="my-4 py-4 flex-1 rounded-3xl bg-white">
            <Heading title="Каталог" />
            {categories.length ? (
              <View className="flex-row flex-wrap justify-center">
                {categories.map((category) => (
                  <CardCategory
                    key={category.id}
                    onPress={() =>
                      navigateToSubcategoryDetail(
                        category.id,
                        category.categoryName
                      )
                    }
                    categoryName={category.categoryName}
                    imageCategory={category.img}
                  />
                ))}
              </View>
            ) : (
              <View className="flex-row flex-wrap justify-center">
                <Text className="text-gray-600 font-medium text-lg mt-4">
                  Каталог пуст
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

export default CategoryDetail;
