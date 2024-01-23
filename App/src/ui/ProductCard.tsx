import React from 'react';
import {
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ProductCard = () => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const cardWidth = screenWidth / 2 - 20;

  return (
    <>
      <TouchableOpacity
        // onPress={handleClick}
        style={[styles.cardContainer, { width: cardWidth }]}
      >
        <Image
          source={require('../assets/Teos.png')}
          resizeMode="contain"
          style={styles.image}
        />
        {/* <View className="px-2 py-1 bg-amber-400 rounded-full absolute justify-start items-center top-2 left-1.5">
          <Text className="text-xs font-light opacity-80">-47%</Text>
        </View> */}

        <View className="h-19 space-y-1">
          <View style={styles.textContainer}>
            <Text className="text-sm text-gray-700 font-medium">
            Колбаса сырокопчёная Ремит Trio mio в нарезке ассорти, 100г
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text className="text-lg font-medium">150 ₽</Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity
        // onPress={handleClick}
        style={[styles.cardContainer, { width: cardWidth }]}
      >
        <Image
          source={require('../assets/Teos.png')}
          resizeMode="contain"
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text className="text-sm text-gray-700 font-medium mx-2">Нейм</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>₹ 150</Text>
        </View>
      </TouchableOpacity> */}
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
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
    height: 256,
  },
  image: {
    width: 144,
    height: 128,
  },
  //* как в категориях
  //   image: {
  //     width: 200,
  //     height: 120,
  //   },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  //   nameText: {
  //     fontSize: 14,
  //     fontWeight: 'normal',
  //     color: 'gray',
  //     marginHorizontal: 8,
  //   },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
  },
  heartIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductCard;
