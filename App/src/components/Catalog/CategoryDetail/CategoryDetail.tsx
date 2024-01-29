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
import Heading from 'ui/Heading';
import Search from 'ui/Search';
import CardsNoCarusel from 'components/Promotion/CardsNoCarusel';

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

  // console.log('categoriesCatDet===========>', categories);

  // console.log('subcategoriesCATALDet***********************', subcategories);

  const navigateToSubcategoryDetail = (
    categoryId: number,
    categoryName: string
  ): void => {
    navigation.navigate('SubcategoryDetail', { categoryId, categoryName });
  };

  return (
    <SafeAreaView
      className={`flex-1 items-center justify-start py-2 bg-[#ffff] `}
    >
      <Search />

      {/* Scrollable container start */}
      <ScrollView style={{ flex: 1, width: '100%' }}>
        {/* акции вне карусели */}
        <View className="bg-green-100">
          <Heading title="Рекомендуем" />
          <CardsNoCarusel />
          {/* <View className=" mx-3">
            <ScrollView
              style={{ flex: 1, width: '100%', flexShrink: 0 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
            </ScrollView>
          </View> */}
        </View>

        {/* Каталог */}
        <View>
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
        {/* <View className="flex-row flex-wrap justify-center">
            <CardCategory categoryName imageProduct />
          </View>
        </View> */}
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
}

export default CategoryDetail;
