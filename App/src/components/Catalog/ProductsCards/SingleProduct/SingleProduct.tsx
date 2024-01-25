import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import SingleProductCard from 'ui/SingleProductCard';
import { useAppSelector } from 'Redux/hooks';

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

  const allProducts = useAppSelector<IProduct[]>(
    (state) => state.productSlice.data
  );

  const product = allProducts.filter((prod) => prod.id === productId);

  console.log('productId==>', productId);

  console.log('product-=-==-=-=--=+++++>', product);

  return (
    <SafeAreaView
      className={`flex-1 items-center justify-start py-2 bg-[#ffff] `}
    >
      {/* Scrollable container start */}
      <ScrollView style={{ flex: 1, width: '100%' }}>
        {/* <View className=""> */}
        <View className="flex-row flex-wrap justify-center">
          {product.length ? (
            product.map((prod) => <SingleProductCard key={prod.id} />)
          ) : (
            <View className="flex-row flex-wrap justify-center mt-4">
              <Text className="text-gray-600 font-medium text-lg">
                Продукт отсутстует
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

export default SingleProduct;
