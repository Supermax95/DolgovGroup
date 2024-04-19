import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SingleProductCard from 'ui/SingleProductCard';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';
import currentProduct from 'Redux/thunks/Catalog/getcurrentProduct';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UniversalHeader from 'ui/UniversalHeader';
import { StackNavigationProp } from 'navigation/types';
// import ArrowGoBack from 'ui/ArrowGoBack';

export interface IProduct {
  id: number;
  // article: string;
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

const SingleProduct = ({ route }: any) => {
  const { productId } = route.params;
  const dispatch = useAppDispatch();
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(true);
  const { width } = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp>();
  const userStatus = useAppSelector<string | undefined>(
    (state) => state.userSlice.user?.userStatus
  );
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await dispatch(currentProduct(productId));
  //     } catch (error) {
  //       Alert.alert('Ошибка при получении данных');
  //     }
  //   };

  //   fetchData();
  //   setIsLoadingPage(false);
  // }, [dispatch, productId]);

  const onRefresh = async () => {
    try {
      dispatch(currentProduct(productId));
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

  const currentProductOpen =
    useAppSelector<IProduct | null>(
      (state) => state.productSlice.currentProduct
    ) || ({} as IProduct);

  const desc = currentProductOpen.description ? (
    <RenderHtml
      source={{
        html: String(currentProductOpen.description),
      }}
      contentWidth={width}
      enableExperimentalMarginCollapsing={true}
    />
  ) : null;

  return (
    <>
      {/* {isLoadingPage ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="green" />
        </View>
      ) : ( */}
      <SafeAreaView
        className={`relative flex-1 items-center justify-start bg-[#ffff] `}
      >
        <UniversalHeader onPress={() => navigation.goBack()} />

        {/* Scrollable container start */}
        {currentProductOpen ? (
          <ScrollView
            style={{ flex: 1, width: '100%' }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {/* <View className="flex-col flex-wrap justify-center"> */}
            <SingleProductCard
              key={currentProductOpen.id}
              // article={currentProductOpen.article}
              productName={currentProductOpen.productName}
              originalPrice={currentProductOpen.originalPrice}
              isDiscount={currentProductOpen.isDiscounted}
              discountedPrice={
                userStatus === 'Сотрудник'
                  ? currentProductOpen.employeePrice
                  : currentProductOpen.customerPrice
              }
              discountPercentage={Math.round(
                ((currentProductOpen.originalPrice -
                  (userStatus === 'Сотрудник'
                    ? currentProductOpen.employeePrice
                    : currentProductOpen.customerPrice)) /
                  currentProductOpen.originalPrice) *
                  100
              )}
              isNew={currentProductOpen.isNew}
              image={`https://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}${currentProductOpen.photo}`}
              description={desc}
            />
            <View
              className={`items-center justify-center pb-10 ${
                Platform.OS === 'android' ? 'px-3' : 'px-2'
              }`}
            >
              <Text className="text-gray-600 font-medium text-xs italic text-center">
                *Информация о ценах и акциях может отличаться. Рекомендуем
                уточнить актуальную информацию в магазине.
              </Text>
            </View>
          </ScrollView>
        ) : (
          <View className="flex-row flex-wrap justify-center mt-4">
            <Text className="text-gray-600 font-medium text-lg">
              Продукт отсутстует
            </Text>
          </View>
        )}
      </SafeAreaView>
      {/* )} */}
    </>
  );
};

export default SingleProduct;
