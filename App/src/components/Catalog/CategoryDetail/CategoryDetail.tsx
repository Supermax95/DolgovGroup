import React, { FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import CardCategory from 'ui/CardCategory';
import Heading from 'ui/Heading';
import CardsNoCarusel from 'components/Promotion/CardsNoCarusel';
import UniversalHeader from 'ui/UniversalHeader';
import { LinearGradient } from 'expo-linear-gradient';
import getCategory from 'Redux/thunks/Catalog/categoryGet.api';
import getProducts from 'Redux/thunks/Catalog/productGet.api';
import getSubcategory from 'Redux/thunks/Catalog/subcategoryGet.api';
import getPromotions from 'Redux/thunks/Promotion/getPromotion.api';

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

const CategoryDetail: FC = () => {
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

  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await dispatch(getPromotions());
      await dispatch(getProducts());
      await dispatch(getCategory());
      await dispatch(getSubcategory());
    } catch (error) {
      Alert.alert('Ошибка при обновлении данных');
    } finally {
      setTimeout(() => {
        setRefreshing(false);
      }, 500);
    }
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        //* что возможно можно в шторке прокинуть навигейт на Магазины рядом
        title="Каталог"
        onPressSearch={handleSearchPress}
      />

      <LinearGradient
        colors={['#FAF9F9', '#FAFAFA', '#EBEBEB']}
        className="flex-1"
      >
        {/* Scrollable container start */}
        <ScrollView
          alwaysBounceVertical
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, width: '100%' }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* акции вне карусели */}
          <View className="py-2">
            <Heading title="Рекомендуем" />
            <CardsNoCarusel />
          </View>

          {/* Каталог */}
          <View
            className="my-4 py-4 flex-1 rounded-3xl bg-white"
            style={{
              shadowColor: '#000',
              shadowRadius: 4,
              shadowOpacity: 0.1,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              elevation: 6,
            }}
          >
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
};

export default CategoryDetail;
