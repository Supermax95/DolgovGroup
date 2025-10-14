import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
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
  oldPrice?: number | null;
  newPrice?: number | null;
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

  // Показываем только первые 4 акции для сетки 2x2
  const displayedPromotions = promotions.slice(0, 4);

  return (
    <View style={{ paddingHorizontal: 16 }}>
      {promotions.length ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {displayedPromotions.map((promotion, index) => (
            <CardNoCarusel
              key={promotion.id}
              onPress={() => navigateToPromoDetail(promotion.id)}
              promotionTitle={promotion.title}
              promotionImage={promotion.photo}
              isNew={false}
              isPromotion={true} // Все акции будут "АКЦИЯ!"
              oldPrice={promotion.oldPrice}
              newPrice={promotion.newPrice}
            />
          ))}
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 32 }}>
          <Text style={{ fontSize: 14, color: '#6B7280' }}>
            🎁 Новые акции скоро появятся
          </Text>
        </View>
      )}
    </View>
  );
}
