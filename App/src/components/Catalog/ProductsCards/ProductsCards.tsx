import React, { FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import {
  View,
  Text,
  SafeAreaView,
  RefreshControl,
  FlatList,
  Alert,
} from 'react-native';
import ProductCard from 'ui/ProductCard';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';
import UniversalHeader from 'ui/UniversalHeader';
import FilterModal from 'ui/FilterModal';
import SearchAndFilter from 'ui/SearchAndFilter';
import { LinearGradient } from 'expo-linear-gradient';
// import getCategory from 'Redux/thunks/Catalog/categoryGet.api';
import getProducts from 'Redux/thunks/Catalog/productGet.api';
// import getSubcategory from 'Redux/thunks/Catalog/subcategoryGet.api';

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
  const [refreshing, setRefreshing] = useState(true);

  const onRefresh = async () => {
    try {
      await dispatch(getProducts());
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

  const allProducts = useAppSelector<IProduct[]>(
    (state) => state.productSlice.data
  );
  const userStatus = useAppSelector<string | undefined>(
    (state) => state.userSlice.user?.userStatus
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
        ];

        const searchTerms = searchText.toLowerCase().split(' ');

        return searchTerms.every((term) =>
          productFields.some((field) => field.toLowerCase().includes(term))
        );
      });
    }

    filtered = filtered.filter((product) => {
      if (userStatus === 'Клиент' || userStatus === 'Новый сотрудник') {
        return (
          product.customerPrice >= minPrice && product.customerPrice <= maxPrice
        );
      } else if (userStatus === 'Сотрудник') {
        return (
          product.employeePrice >= minPrice && product.employeePrice <= maxPrice
        );
      } else {
        return false;
      }
    });
    return filtered;
  };

  useEffect(() => {
    if (initialRender) {
      setMaxPrice(maxProductOriginalPrice);
      setInitialRender(false);
    }
  }, [initialRender, maxProductOriginalPrice]);

  const displayedProducts = applyFilters();

  const navigateToSingleProduct = (productId: number): void => {
    navigation.navigate('SingleProduct', { productId });
  };

  return (
    <SafeAreaView className={`flex-1 h-full bg-[#ffff] marginBottom: 0 `}>
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title={subcategoryName ? subcategoryName : categoryName}
      />

      {/* Поиск и фильтр */}
      <View className="bg-[#FAF9F9] pb-0.2">
        <SearchAndFilter
          value={searchText}
          placeholder="  Найти продукт"
          onChangeText={(text) => {
            setSearchText(text);
            applyFilters();
          }}
          onPressFilter={() => setFilterModalVisible(true)}
        />
      </View>

      <View className="flex-1 bg-[#F5F5F5] ">
        {/* Scrollable container start */}
        <LinearGradient colors={['#FAF9F9', '#FAFAFA', '#F5F5F5']}>
          <FlatList
            data={displayedProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCard
                onPress={() => navigateToSingleProduct(item.id)}
                key={item.id}
                productName={item.productName}
                originalPrice={item.originalPrice}
                isDiscount={item.isDiscounted}
                discountedPrice={
                  userStatus === 'Сотрудник'
                    ? item.employeePrice
                    : item.customerPrice
                }
                discountPercentage={Math.round(
                  ((item.originalPrice -
                    (userStatus === 'Сотрудник'
                      ? item.employeePrice
                      : item.customerPrice)) /
                    item.originalPrice) *
                    100
                )}
                isNew={item.isNew}
                imageProduct={`http://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}${item.photo}`}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            numColumns={2}
            columnWrapperStyle={{ marginLeft: 7.5, width: '100%' }}
            extraData={displayedProducts.length}
            contentContainerStyle={{
              paddingVertical: 15,
            }}
            ListEmptyComponent={
              <View className="flex-row justify-center items-center mt-4">
                <Text className="text-lg font-normal text-zinc-500">
                  Ничего не найдено
                </Text>
              </View>
            }
          />
        </LinearGradient>
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
