import { View, Text, SafeAreaView, ScrollView, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import currentPromotion from 'Redux/thunks/Promotion/getcurrentPromotion.api';
import SinglePromo from 'ui/SinglePromo';
import UniversalHeader from 'ui/UniversalHeader';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';

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

const PromoOneDetail = ({ route }: any) => {
  const { promotionId } = route.params;
  const { width } = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp>();
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(currentPromotion(promotionId));
      } catch (error) {
        Alert.alert('Ошибка при получении данных');
      }
    };

    fetchData();
    setIsLoadingPage(false);
  }, [dispatch, promotionId]);

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(currentPromotion(promotionId));
    setRefreshing(false);
  };


  const currentPromotionOpen =
    useAppSelector<IPromotion | null>(
      (state) => state.promotiosSlice.currentPromotion
    ) || ({} as IPromotion);


  const desc = (
    <RenderHtml
      source={{
        html: String(currentPromotionOpen.description),
      }}
      contentWidth={width}
      enableExperimentalMarginCollapsing={true}
    />
  );

  return (
    <>
    {isLoadingPage ? (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="green" />
      </View>
    ) : (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader onPress={() => navigation.goBack()} />
      {currentPromotionOpen ? (
        <ScrollView style={{ flex: 1, width: '100%' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <SinglePromo
            key={currentPromotionOpen.id}
            title={currentPromotionOpen.title}
            image={currentPromotionOpen.photo}
            description={desc}
            dateStart={currentPromotionOpen.dateStart}
            dateEnd={currentPromotionOpen.dateEnd}
            carusel={currentPromotionOpen.carousel}
          />
        </ScrollView>
      ) : (
        <View className="flex-row flex-wrap justify-center mt-4">
          <Text className="text-gray-600 font-medium text-lg">
            Продукт отсутстует
          </Text>
        </View>
      )}
    </SafeAreaView>
          )}
          </>
  );
};

export default PromoOneDetail;
