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
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAppSelector } from 'Redux/hooks';
import ProductCard from './ProductCard';
import { PORT, IP } from '@env';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import UniversalHeader from './UniversalHeader';

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

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showDiscounted, setShowDiscounted] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [initialRender, setInitialRender] = useState(true);
  const [modalOffset, setModalOffset] = useState(new Animated.Value(0));

  const navigation = useNavigation<StackNavigationProp>();

  const products = useAppSelector<IProduct>(
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

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        Animated.event([null, { dy: modalOffset }], {
          useNativeDriver: false,
        })(_, gestureState);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 50) {
        Animated.timing(modalOffset, {
          toValue: 400, // Изменено на 400, но может потребоваться другое значение
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          applyFilters();
          setFilterModalVisible(false);
          setModalOffset(new Animated.Value(0)); // Сброс смещения
        });
      } else {
        Animated.timing(modalOffset, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const displayedProducts = applyFilters();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 16,
        backgroundColor: '#fff',
      }}
    >
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title={'Поиск'}
      />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          padding: 16,
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: '#f0f0f0',
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={23}
              color="#7f7f7f"
              style={{ marginRight: 8 }}
            />
            <TextInput
              style={{ flex: 1, fontSize: 16 }}
              placeholderTextColor="#555"
              placeholder="Найти продукты"
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                applyFilters();
              }}
            />
          </View>
        </View>
        <Pressable
          onPress={() => setFilterModalVisible(true)}
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: '#f0f0f0',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 8,
          }}
        >
          <MaterialCommunityIcons name="filter" size={24} color="#7f7f7f" />
        </Pressable>
      </View>
      <Modal
        visible={isFilterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          applyFilters();
          setFilterModalVisible(false);
        }}
      >
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.0)',
            transform: [{ translateY: modalOffset }],
          }}
        >
          <View
            style={{
              position: 'absolute',
              height: '50%',
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
                  Animated.timing(modalOffset, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false,
                  }).start(() => {
                    applyFilters();
                    setFilterModalVisible(false);
                    setModalOffset(new Animated.Value(0)); // Сброс смещения
                  });
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
        </Animated.View>
      </Modal>
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
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
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: 16,
              }}
            >
              <Text
                style={{ color: 'gray', fontWeight: 'bold', fontSize: 16 }}
              >
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
