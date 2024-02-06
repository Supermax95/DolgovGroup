import React, { useState, useEffect } from 'react';
import {
  View,
  Pressable,
  TextInput,
  Modal,
  Text,
  Switch,
  ScrollView,
  SafeAreaView,
  Animated,
  PanResponder,
  Platform,
} from 'react-native';
import { useAppSelector } from 'Redux/hooks';
import { PORT, IP } from '@env';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import UniversalHeader from 'ui/UniversalHeader';
import ProductCard from 'ui/ProductCard';
import FilterModal from 'ui/FilterModal';
import SearchAndFilter from 'ui/SearchAndFilter';

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

const SearchProduct = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const [searchText, setSearchText] = useState<string>('');
  const [isFilterModalVisible, setFilterModalVisible] =
    useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [showDiscounted, setShowDiscounted] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [initialRender, setInitialRender] = useState<boolean>(true);

  const products = useAppSelector<IProduct[]>(
    (state) => state.productSlice.data
  );

  const navigateToSingleProduct = (productId: number): void => {
    navigation.navigate('SingleProduct', { productId });
  };

  const maxProductOriginalPrice = Math.max(
    ...products.map((product: IProduct) => product.originalPrice),
    0
  );

  const applyFilters = () => {
    let filtered: IProduct[] = Array.isArray(products) ? products : [];

    if (showNew) {
      filtered = filtered.filter((product) => product.isNew === true);
    }

    if (showDiscounted) {
      filtered = filtered.filter((product) => product.isDiscounted === true);
    }

    if (searchText !== '') {
      filtered = filtered.filter((product) => {
        const productFields = [
          String(product.productName),
          String(product.promoStartDate),
          String(product.promoEndDate),
          String(product.article),
        ];

        const searchTerms = searchText.toLowerCase().split(' ');

        return searchTerms.every((term) =>
          productFields.some((field) => field.toLowerCase().includes(term))
        );
      });
    }

    filtered = filtered.filter(
      (product) =>
        product.originalPrice >= minPrice && product.originalPrice <= maxPrice
    );

    return filtered;
  };

  useEffect(() => {
    if (initialRender) {
      setMaxPrice(maxProductOriginalPrice);
      setInitialRender(false);
    }
  }, [initialRender, maxProductOriginalPrice]);

  const displayedProducts = applyFilters();

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader onPress={() => navigation.goBack()} title="Поиск" />

      {/* Поиск и фильтр */}
      <SearchAndFilter
        value={searchText}
        placeholder="  Найти
        продукт"
        onChangeText={(text) => {
          setSearchText(text);
          applyFilters();
        }}
        onPressFilter={() => setFilterModalVisible(true)}
      />

      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View className="flex-row flex-wrap justify-center">
          {displayedProducts.length ? (
            displayedProducts.map((product) => (
              <ProductCard
                onPress={() => {
                  navigateToSingleProduct(product.id);
                }}
                key={product.id}
                productName={product.productName}
                originalPrice={product.originalPrice}
                isDiscount={product.isDiscounted}
                discountedPrice={255}
                discountPercentage={15}
                isNew={product.isNew}
                imageProduct={`http://${IP}:${PORT}${product.photo}`}
              />
            ))
          ) : (
            <View className="flex-row flex-wrap justify-center mt-4">
              <Text className="text-gray-600 font-medium text-lg">
                Продуктов нет
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* модальное окно фильтра */}
      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={setFilterModalVisible}
        onApply={applyFilters}
        showNew={showNew}
        setShowNew={setShowNew}
        showDiscounted={showDiscounted}
        setShowDiscounted={setShowDiscounted}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        maxProductOriginalPrice={maxProductOriginalPrice}
      />
    </SafeAreaView>
  );
};

export default SearchProduct;
