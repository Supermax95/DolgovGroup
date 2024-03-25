import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import React from 'react';
import {
  ScrollView,
  Image,
  View,
  Text,
  Pressable,
  Dimensions,
  StyleSheet,
} from 'react-native';
import CardCategory from 'ui/CardCategory';
import CardNoCarusel from 'ui/CardNoCarucel';

export interface IPromotion {
  id: number;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  carousel: boolean;
  invisible: boolean;
  photo: string;
}

export default function CardsNoCarusel() {
  const navigation = useNavigation<StackNavigationProp>();

  const promotionsAll = useAppSelector<IPromotion[]>(
    (state) => state.promotiosSlice.data
  );

  const promotions = promotionsAll.filter(
    (promotion) => promotion.carousel === false && promotion.invisible === false
  );

  const navigateToPromoDetail = (promotionId: number): void => {
    navigation.navigate('PromoOneDetail', { promotionId });
  };

  return (
    <ScrollView
      style={{ flex: 1, width: '100%', flexShrink: 0, margin: 2 }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {promotions.length ? (
        <View className="flex-row flex-wrap justify-center mx-3">
          {promotions.map((promotion) => (
            <CardNoCarusel
              key={promotion.id}
              onPress={() => navigateToPromoDetail(promotion.id)}
              promotionTitle={promotion.title}
              promotionImage={promotion.photo}
            />
          ))}
        </View>
      ) : (
        <View className="flex-row flex-wrap justify-center">
          <Text className="text-gray-600 font-medium text-lg mt-4">
            Акции отсутствуют
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
