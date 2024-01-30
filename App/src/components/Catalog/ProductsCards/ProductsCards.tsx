import React, { FC, useEffect, useState } from 'react';
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
  Modal,
  Switch,
} from 'react-native';
import Heading from 'ui/Heading';
import Search from 'ui/Search';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import ProductCard from 'ui/ProductCard';
import { PORT, IP } from '@env';
import UniversalHeader from 'ui/UniversalHeader';

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

const ProductsCards = ({ route }: any) => {
  const { subcategoryIdArray, subcategoryId, subcategoryName, categoryName } =
    route.params;

  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showDiscounted, setShowDiscounted] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [initialRender, setInitialRender] = useState(true);
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

  const applyFilters = () => {
    // let filtered = products;
    let filtered: IProduct[] = Array.isArray(products) ? products : [];

    if (showNew) {
      filtered = filtered.filter((product) => product.isNew === true);
    }

    if (showDiscounted) {
      filtered = filtered.filter((product) => product.isDiscounted === true);
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

  const navigateToSingleProduct = (
    productId: number
    // categoryName: string
  ): void => {
    navigation.navigate('SingleProduct', { productId });
  };
  return (
    <SafeAreaView
      className={`flex-1 items-center justify-start py-2 bg-[#ffff] `}
    >
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title={subcategoryName ? subcategoryName : categoryName}
        onPressSearch={() => navigation.navigate('Search')}
      />

      {/* <Heading title={subcategoryName} /> */}
      {/* <Search /> */}
      <Pressable
        onPress={() => setFilterModalVisible(true)}
        className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gray-100`}
      >
        <MaterialCommunityIcons name="filter" size={24} color="#7f7f7f" />
      </Pressable>
      <Modal
        visible={isFilterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          applyFilters();
          setFilterModalVisible(false);
        }}
      >
        <View
          style={{
            position: 'absolute',
            height: '85%',
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              width: '100%',
              height: '100%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: -2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Pressable
              onPress={() => {
                applyFilters();
                setFilterModalVisible(false);
              }}
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                zIndex: 1,
                padding: 5,
              }}
            >
              <MaterialCommunityIcons name="close" size={24} color="black" />
            </Pressable>
            {/* <Text style={{ fontSize: 18, marginBottom: 10 }}>Фильтры</Text> */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <Text>Новые продукты</Text>
              <Switch
                trackColor={{ false: '#d6d3d1', true: '#a7f3d0' }}
                thumbColor={showNew ? '#22c55e' : '#f5f5f4'}
                ios_backgroundColor="#d6d3d1"
                onValueChange={() => setShowNew(!showNew)}
                value={showNew}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <Text>Продукты со скидкой</Text>
              <Switch
                trackColor={{ false: '#d6d3d1', true: '#a7f3d0' }}
                thumbColor={showDiscounted ? '#22c55e' : '#f5f5f4'}
                ios_backgroundColor="#d6d3d1"
                onValueChange={() => setShowDiscounted(!showDiscounted)}
                value={showDiscounted}
              />
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text>
                  Цена: от {minPrice}&#8381; до {maxPrice}&#8381;
                </Text>
                <Slider
                  style={{ width: '100%', height: 40 }}
                  minimumValue={0}
                  maximumValue={maxProductOriginalPrice}
                  step={10}
                  value={maxPrice}
                  minimumTrackTintColor="#a7f3d0"
                  onValueChange={(value) => setMaxPrice(value)}
                />
            </View>
          </View>
        </View>
      </Modal>
      {/* Scrollable container start */}
      <ScrollView style={{ flex: 1, width: '100%' }}>
        {/* <View className=""> */}
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
