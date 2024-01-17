// import React from 'react';
// import {
//   ScrollView,
//   Image,
//   View,
//   Text,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// function CardCategory() {
//   // const screenWidth = Math.round(Dimensions.get('window').width);
//   // const cardWidth = screenWidth / 2 - 20;

//   return (
//     <TouchableOpacity
//       // onPress={handleClick}
//       className={`p-2 m-2 rounded-xl bg-white flex items-center justify-center`}
//     >
//       <Image
//         source={require('../assets/ChocoMilka.png')}
//         // resizeMode="contain"
//         className={`w-32 h-52`}
//       />

//       <View className={`flex items-start justify-start w-full`}>
//         <Text className={`text-sm font-semibold text-gray-500`}>Нейм</Text>
//         <Text className={`text-xs text-gray-500`}>Хз...</Text>
//       </View>

//       <View className={`flex-row items-center justify-between w-full`}>
//         <Text className={`text-sm font-semibold text-center text-gray-500`}>
//           ₹ 150
//         </Text>
//         <TouchableOpacity
//           className={`bg-black w-8 h-8 rounded-full flex items-center justify-center`}
//         >
//           <MaterialCommunityIcons name="heart" size={16} color="#fbfbfb" />
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );
// }

// export default CardCategory;

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

const CardCategory = () => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const cardWidth = screenWidth / 2 - 20;

  return (
    <>
      <TouchableOpacity
        // onPress={handleClick}
        style={[styles.cardContainer, { width: cardWidth }]}
      >
        <Image
          source={require('../assets/ChocoMilka.png')}
          resizeMode="contain"
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text style={styles.nameText}>Нейм</Text>
          <Text style={styles.descriptionText}>Хз...</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>₹ 150</Text>
          <TouchableOpacity style={styles.heartIconContainer}>
            <MaterialCommunityIcons name="heart" size={16} color="#fbfbfb" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={handleClick}
        style={[styles.cardContainer, { width: cardWidth }]}
      >
        <Image
          source={require('../assets/ChocoMilka.png')}
          resizeMode="contain"
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text style={styles.nameText}>Нейм</Text>
          <Text style={styles.descriptionText}>Хз...</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>₹ 150</Text>
          <TouchableOpacity style={styles.heartIconContainer}>
            <MaterialCommunityIcons name="heart" size={16} color="#fbfbfb" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 2,
    margin: 4,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  nameText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray',
  },
  descriptionText: {
    fontSize: 12,
    color: 'gray',
  },
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

export default CardCategory;
