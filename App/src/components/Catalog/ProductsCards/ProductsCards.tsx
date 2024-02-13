import React, { FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import ProductCard from 'ui/ProductCard';
import { PORT, IP } from '@env';
import UniversalHeader from 'ui/UniversalHeader';
import FilterModal from 'ui/FilterModal';
import SearchAndFilter from 'ui/SearchAndFilter';
import { LinearGradient } from 'expo-linear-gradient';

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

const ProductsCards: FC = ({ route }: any) => {
  const { subcategoryIdArray, subcategoryId, subcategoryName, categoryName } =
    route.params;

  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();

  const [searchText, setSearchText] = useState<string>('');
  const [isFilterModalVisible, setFilterModalVisible] =
    useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [showDiscounted, setShowDiscounted] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [initialRender, setInitialRender] = useState<boolean>(true);

  const allProducts = useAppSelector<IProduct[]>(
    (state) => state.productSlice.data
  );

  const products = allProducts.filter(
    (prod) =>
      prod.invisible === false &&
      (prod.subcategoryId === subcategoryId ||
        subcategoryIdArray?.includes(prod.subcategoryId))
  );

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
  console.log('displayedProducts', displayedProducts);

  const navigateToSingleProduct = (productId: number): void => {
    navigation.navigate('SingleProduct', { productId });
  };

  return (
    <SafeAreaView className={`flex-1 h-full bg-[#ffff] `}>
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title={subcategoryName ? subcategoryName : categoryName}
      />

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

      <View className="flex-1 bg-[#EBEBEB]">
        {/* Scrollable container start */}
        <ScrollView
          alwaysBounceVertical
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, width: '100%' }}
          bounces={false}
        >
          {/* <View className="mb-4 py-4 flex-1 rounded-b-3xl bg-white"> */}
          <LinearGradient
            colors={['#FAF9F9', '#FAFAFA', '#FAF9F9']}
            className="mb-4 py-4 flex-1 rounded-b-3xl"
          >
            <View className="flex-row flex-wrap justify-center">
              {displayedProducts.length ? (
                displayedProducts.map((product) => (
                  <ProductCard
                    onPress={() => navigateToSingleProduct(product.id)}
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
                ))
              ) : (
                <View className="flex-row flex-wrap justify-center mt-4">
                  <Text className="text-gray-600 font-medium text-lg">
                    Продуктов нет
                  </Text>
                </View>
              )}
            </View>
          </LinearGradient>

          {/* </View> */}
        </ScrollView>
      </View>

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

export default ProductsCards;
