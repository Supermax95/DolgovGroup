import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import SingleProductCard from 'ui/SingleProductCard';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { PORT, IP } from '@env';
import currentProduct from 'Redux/thunks/Catalog/getcurrentProduct';
import RenderHtml from 'react-native-render-html';
import { Dimensions } from 'react-native';

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
  console.log('productId', productId);
  const dispatch = useAppDispatch();
  // const allProducts = useAppSelector<IProduct[]>(
  //   (state) => state.productSlice.data
  // );
  // const currentProductOpen1 = useAppSelector<IProduct>(
  //   (state) =>
  //     state.productSlice.data.find((prod) => prod.id === productId) ||
  //     ({} as IProduct)
  // );

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
  // console.log('currentProductOpen=====>',currentProductOpen);

  // console.log('add==>', add);

  // const t = product.map((el) => el.description);
  // console.log('product-=-==-=-=--=+++++>', t);

  // const descObject = JSON.parse(currentProductOpen.description);
  // console.log('descObject', descObject);

  // const desc = <RenderHtml source={{ html: currentProductOpen.description }} />;
  const desc = currentProductOpen.description ? (
    <RenderHtml
      source={{ html: currentProductOpen.description }}
      contentWidth={Dimensions.get('window').width}
    />
  ) : null;

  // console.log('desc', desc);

  return (
    <SafeAreaView className={`flex-1 items-center justify-start bg-[#ffff] `}>
      <View
        className={`flex-row items-center justify-between px-4 py-0 w-full`}
      >
        <TouchableOpacity
        //   onPress={() => navigation.goBack()
        //   }
        >
          <Text>ИКОНКА</Text>
        </TouchableOpacity>

        <TouchableOpacity
        //   onPress={() => navigation.navigate('CartScreen')}
        >
          <Text>иконка</Text>
        </TouchableOpacity>
      </View>
      {/* Scrollable container start */}
      <ScrollView style={{ flex: 1, width: '100%' }}>
        {/* <View className=""> */}
        <View className="flex-row flex-wrap justify-center">
          {currentProductOpen ? (
            <SingleProductCard
              key={currentProductOpen.id}
              article={currentProductOpen.article}
              productName={currentProductOpen.productName}
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
