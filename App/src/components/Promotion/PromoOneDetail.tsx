import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
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

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(currentPromotion(promotionId));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch, promotionId]);

  const currentPromotionOpen =
    useAppSelector<IPromotion>(
      (state) => state.promotiosSlice.currentPromotion
    ) || ({} as IPromotion);

  console.log('currentPromotionOpen', currentPromotionOpen);

  const desc = (
    <RenderHtml
      source={{
        html: String(currentPromotionOpen.description),
      }}
      contentWidth={width}
      enableExperimentalMarginCollapsing={true}
    />
  );
  console.log('desc', desc);

  return (
    // <SafeAreaView className={`flex-1 items-center justify-start bg-[#ffff] `}>
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader onPress={() => navigation.goBack()} />

      {/* Scrollable container start */}
      {currentPromotionOpen ? (
        <ScrollView style={{ flex: 1, width: '100%' }}>
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
  );
};

export default PromoOneDetail;
