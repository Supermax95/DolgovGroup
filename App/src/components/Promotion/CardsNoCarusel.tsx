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
    <View className=" mx-3">
      <ScrollView
        style={{ flex: 1, width: '100%', flexShrink: 0 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {promotions.length ? (
          promotions.map((promotion) => (
            <Pressable
              key={promotion.id}
              onPress={() => navigateToPromoDetail(promotion.id)}
              style={[styles.cardContainer, { width: cardWidth }]}
            >
              <Image
                source={{ uri: promotion.photo }}
                resizeMode="contain"
                style={styles.image}
              />
              <View style={styles.overlayText}>
                <Text style={styles.overlayNameText}>{promotion.title}</Text>
              </View>
            </Pressable>
          ))
        ) : (
          <View className="flex-row flex-wrap justify-center">
            <Text className="text-gray-600 font-medium text-lg mt-4">
              Акции отсутствуют
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    position: 'relative',
    padding: 0,
    margin: 4,
    borderRadius: 20,
    backgroundColor: '#f1e1d2',
    // flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 120,
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  overlayText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },
  overlayNameText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#292520',
  },
  overlayDescriptionText: {
    fontSize: 12,
    color: 'gray',
  },
});
