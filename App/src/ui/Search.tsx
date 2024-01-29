import {
  View,
  Pressable,
  TextInput,
  Modal,
  Text,
  Switch,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// import { isPast, isToday, parseISO } from 'date-fns';
import { useAppSelector } from 'Redux/hooks';
import ProductCard from './ProductCard';
import { PORT, IP } from '@env';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';

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

const Search = () =>
  // { route }: any
  {
    // const { products } = route.params;
    const [searchText, setSearchText] = useState('');
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [isCardVisible, setCardVisible] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showDiscounted, setShowDiscounted] = useState(false);
    const navigation = useNavigation<StackNavigationProp>();

    const products = useAppSelector<IProduct>(
      (state) => state.productSlice.data
    );

    const navigateToSingleProduct = (
      productId: number
      // categoryName: string
    ): void => {
      navigation.navigate('SingleProduct', { productId });
    };

    const applyFilters = () => {
      // let filtered = products;
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

      console.log('Отфильтрованные продукты:', filtered);

      return filtered;
    };

    const displayedProducts = applyFilters();

    //     const isPromoEnded =
    //       product.promoEndDate &&
    //       isPast(parseISO(product.promoEndDate)) &&
    //       !isToday(parseISO(product.promoEndDate));

    //     return (
    //       searchTerms.every((term) =>
    //         productFields.some((field) => field.toLowerCase().includes(term))
    //       ) ||
    //       (isPromoEnded && searchText.toLowerCase().includes('завершена'))
    //     );
    //   });
    // }

    return (
      // <View
      //   style={{
      //     backgroundColor: '#F8D3D3',
      //     padding: 10,
      //     flexDirection: 'row',
      //     justifyContent: 'space-between',
      //     alignItems: 'center',
      //   }}
      // >

      <SafeAreaView
        className={`bg-purple-100 py-4 flex-row items-center justify-between px-4 w-full`}
      >
        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#D1D5DB',
              borderRadius: 10,
              padding: 5,
            }}
          > */}
        <View className={`flex-row items-center mr-12`}>
          <View
            className={`px-4 py-2 bg-gray-100  rounded-xl flex-row items-center justify-center mr-2`}
          >
            <MaterialCommunityIcons name="magnify" size={23} color="#7f7f7f" />
            {/* <Pressable onPress={() => setCardVisible(true)}>
              <MaterialCommunityIcons
                name="magnify"
                size={23}
                color="#7f7f7f"
              />
            </Pressable> */}
            <TextInput
              className={`text-md font-normal flex-1 px-2 py-1`}
              placeholderTextColor="#555"
              placeholder="Найти продукты"
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                // setCardVisible(true)
                applyFilters();
              }}
            />
          </View>
        </View>
        {/* <Pressable
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#D1D5DB',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setFilterModalVisible(true)}
        > */}
        <Pressable
          onPress={() => setFilterModalVisible(true)}
          className={`w-12 h-12 right-11 rounded-xl flex items-center justify-center bg-gray-100`}
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
            </View>
          </View>
        </Modal>

        <MaterialCommunityIcons name="close" size={24} color="black" />

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
      </SafeAreaView>
    );
  };
export default Search;
