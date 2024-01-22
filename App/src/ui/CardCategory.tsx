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

const CardCategory = () => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const cardWidth = screenWidth / 2 - 20;

  return (
    <>
      <Pressable
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
      </Pressable>
      <Pressable
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
      </Pressable>
      <Pressable
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
      </Pressable>
      <Pressable
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
      </Pressable>
      <Pressable
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
      </Pressable>
      <Pressable
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
      </Pressable>
      <Pressable
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
      </Pressable>
      <Pressable
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
      </Pressable>
      <Pressable
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
      </Pressable>
      <Pressable
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
      </Pressable>
      <Pressable
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
      </Pressable>
      <Pressable
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
      </Pressable>
      <Pressable
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
      </Pressable>
      <Pressable
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
      </Pressable>
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
