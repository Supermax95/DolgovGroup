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
import { useWindowDimensions } from 'react-native';

export interface IPromotion {
  id: number;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  carousel: boolean;
  invisible: boolean;
  photo?: string;
}

const PromoDetails = ({ route }: any) => {
  const { productId } = route.params;

  const dispatch = useAppDispatch();

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
        <View className="flex-col flex-wrap justify-center">
          {currentProductOpen ? (
            <SingleProductCard
              key={currentProductOpen.id}
              article={currentProductOpen.article}
              productName={currentProductOpen.productName}
              originalPrice={currentProductOpen.originalPrice}
              isDiscount={currentProductOpen.isDiscounted}
              discountedPrice={299}
              discountPercentage={15}
              isNew={currentProductOpen.isNew}
              image={`http://${IP}:${PORT}${currentProductOpen.photo}`}
              // description={desc}
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

export default PromoDetails;
