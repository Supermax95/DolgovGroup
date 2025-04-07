import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import React from 'react';
import {
  Image,
  View,
  Pressable,
  Dimensions,
  StyleSheet,
  FlatList,
  Platform,
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
const cardWidth = screenWidth - 60;
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
        // <Pressable
        //   key={item.id}
        //   onPress={() => navigateToPromoDetail(item.id)}
        //   className="ml-8"
        //   style={{
        //     marginLeft: 24,
        //     marginRight: index === promotions.length - 1 ? 24 : 0,
        //   }}
        // >
        //   {Platform.OS === 'android' ? (
        //     <View style={styles.card}>
        //       <View style={styles.imageBox}>
        //         <Image
        //           source={{
        //             uri: `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_PORT}${item.photo}`,
        //           }}
        //           resizeMode="contain"
        //           style={styles.image}
        //         />
        //       </View>
        //     </View>
        //   ) : (
        //     <View style={styles.cardIOS}>
        //       <View style={styles.imageBoxIOS}>
        //         <Image
        //           source={{
        //             uri: `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_PORT}${item.photo}`,
        //           }}
        //           resizeMode="contain"
        //           style={styles.image}
        //         />
        //       </View>
        //     </View>
        //   )}
        // </Pressable>
        <Pressable
          onPress={() => navigateToPromoDetail(item.id)}
          className="m-1 rounded-xl flex-col items-center justify-start bg-white"
          style={{
            width: cardWidth,
            shadowColor: '#000',
            shadowRadius: 2,
            shadowOpacity: 0.1,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            elevation: 3,
            marginLeft: 20,
            marginRight: index === promotions.length - 1 ? 24 : 0,
          }}
        >
          <Image
            source={{
              uri: `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_PORT}${item.photo}`,
            }}
            resizeMode="cover"
            style={styles.image}
          />
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
  },
  imageBox: {
    width: cardWidth,
    height: cardHeight,
    overflow: 'hidden',
    borderRadius: 16,
    elevation: 2,
  },
  // // cardIOS: {
  // //   height: cardHeight,
  // //   width: cardWidth,
  // //   marginVertical: 10,
  // //   shadowColor: '#000',
  // //   shadowRadius: 2,
  // //   shadowOpacity: 0.2,
  // //   shadowOffset: {
  // //     width: 0,
  // //     height: 2,
  // //   },
  // // },
  // // imageBoxIOS: {
  // //   width: cardWidth,
  // //   height: cardHeight,
  // //   overflow: 'hidden',
  // //   borderRadius: 16,
  // //   elevation: 2,
  // // },
  image: {
    width: cardWidth,
    height: cardHeight,
    resizeMode: 'cover',
    borderRadius: 12,
  },
});

export default CardsCarusel;
