import { PORT, IP } from '@env';
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

export default function CardsNoCarusel() {
  const navigation = useNavigation<StackNavigationProp>();
  const screenWidth = Math.round(Dimensions.get('window').width);
  const cardWidth = screenWidth / 2 - 20;

  const promotionsAll = useAppSelector<IPromotion[]>(
    (state) => state.promotiosSlice.data
  );

  const promotions = promotionsAll.filter(
    (promotion) => promotion.carousel === false && promotion.invisible === false
  );
  console.log('promotionspromotionspromotions', promotions);

  const navigateToPromoDetail = (promotionId: number): void => {
    navigation.navigate('PromoDetails', { promotionId });
  };

  //! возможно, нужны другие карточки под акции вне карусели, более квадратные

  return (
    <ScrollView
      style={{ flex: 1, width: '100%', flexShrink: 0, margin: 2 }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {promotions.length ? (
        <View className="flex-row flex-wrap justify-center mx-3">
          {promotions.map((promotion) => (
            <Pressable
              key={promotion.id}
              onPress={() => navigateToPromoDetail(promotion.id)}
              style={[styles.cardContainer, { width: cardWidth }]}
            >
              <Image
                source={{ uri: `http://${IP}:${PORT}${promotion.photo}` }}
                resizeMode="contain"
                style={styles.image}
              />

              <View className="h-19 w-full space-y-1 mt-2 px-1">
                <View className="flex-col items-center justify-center w-full h-8">
                  <Text className="text-xs text-gray-700 font-medium">
                    {promotion.title}
                  </Text>
                </View>
              </View>
            </Pressable>
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

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    //
    position: 'relative',
    padding: 2,
    margin: 4,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  image: {
    width: 144,
    height: 128,
  },
});
