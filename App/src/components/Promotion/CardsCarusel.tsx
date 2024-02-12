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
  FlatList,
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

const screenWidth = Math.round(Dimensions.get('window').width);
const cardWidth = screenWidth - 50;
const cardHeight = 200;
const cardWidthSpacing = cardWidth + 24;

const CardsCarusel = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const promotionsAll = useAppSelector<IPromotion[]>(
    (state) => state.promotiosSlice.data
  );

  const promotions = promotionsAll.filter(
    (promotion) => promotion.carousel === true && promotion.invisible === false
  );

  const navigateToPromoDetail = (promotionId: number): void => {
    navigation.navigate('PromoOneDetail', { promotionId });
  };
  return (
    <FlatList
      data={promotions}
      horizontal
      snapToInterval={cardWidthSpacing}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <Pressable
          key={item.id}
          onPress={() => navigateToPromoDetail(item.id)}
          className="ml-3"
          style={{
            marginLeft: 24,
            marginRight: index === promotions.length - 1 ? 24 : 0,
          }}
        >
          <View style={styles.card}>
            <View style={styles.imageBox}>
              <Image
                source={{ uri: `http://${IP}:${PORT}${item.photo}` }}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
          </View>
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    height: cardHeight,
    width: cardWidth,
    marginVertical: 10,
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  imageBox: {
    width: cardWidth,
    height: cardHeight,
    overflow: 'hidden',
    borderRadius: 16,
  },
  image: {
    width: cardWidth,
    height: cardHeight,
    resizeMode: 'cover',
  },
});

export default CardsCarusel;
