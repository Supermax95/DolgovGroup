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
          source={require('../assets/молоко_яйца.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.overlayText}>
          <Text style={styles.overlayNameText}>Колбасные изделия</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={handleClick}
        style={[styles.cardContainer, { width: cardWidth }]}
      >
        <Image
          source={require('../assets/pelmen.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.overlayText}>
          <Text style={styles.overlayNameText}>Колбасные изделия</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: 'relative',
    padding: 0,
    margin: 4,
    borderRadius: 20,
    backgroundColor: '#f1e1d2',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
  // nameText: {
  //   fontSize: 14,
  //   fontWeight: 'bold',
  //   color: 'black',
  //   marginHorizontal: 5,
  // },
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

export default CardCategory;
