import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import SingleProductCard from 'ui/SingleProductCard';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { PORT, IP } from '@env';
import currentProduct from 'Redux/thunks/Catalog/getcurrentProduct';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UniversalHeader from 'ui/UniversalHeader';
import { StackNavigationProp } from 'navigation/types';
// import ArrowGoBack from 'ui/ArrowGoBack';

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

const SingleProduct = ({ route }: any) => {
  const { productId } = route.params;
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp>();
  const userStatus = useAppSelector<string>(
    (state) => state.userSlice.user.userStatus
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(currentProduct(productId));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch, productId]);

  const currentProductOpen =
    useAppSelector<IProduct>((state) => state.productSlice.currentProduct) ||
    ({} as IProduct);

  const desc = currentProductOpen.description ? (
    <RenderHtml
      source={{
        html: String(currentProductOpen.description),
      }}
      contentWidth={width}
      enableExperimentalMarginCollapsing={true}
    />
  ) : null;

  console.log('desc', desc);

  return (
    <SafeAreaView
      className={`relative flex-1 items-center justify-start bg-[#ffff] `}
    >
      <UniversalHeader onPress={() => navigation.goBack()} />
      {/* <ArrowGoBack /> */}

      {/* Scrollable container start */}
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View className="flex-col flex-wrap justify-center">
          {currentProductOpen ? (
            <SingleProductCard
              key={currentProductOpen.id}
              article={currentProductOpen.article}
              productName={currentProductOpen.productName}
              originalPrice={currentProductOpen.originalPrice}
              isDiscount={currentProductOpen.isDiscounted}
              discountedPrice={
                userStatus === 'Сотрудник'
                  ? currentProductOpen.employeePrice
                  : currentProductOpen.customerPrice
              }
              discountPercentage={Math.round(
                currentProductOpen.originalPrice -
                ((userStatus === 'Сотрудник'
                  ? currentProductOpen.employeePrice
                  : currentProductOpen.customerPrice) /
                  currentProductOpen.originalPrice) *
                  100
              )}
              isNew={currentProductOpen.isNew}
              image={`http://${IP}:${PORT}${currentProductOpen.photo}`}
              description={desc}
            />
          ) : (
            <View className="flex-row flex-wrap justify-center mt-4">
              <Text className="text-gray-600 font-medium text-lg">
                Продукт отсутстует
              </Text>
            </View>
          )}
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

export default SingleProduct;
