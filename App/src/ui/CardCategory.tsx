import { useAppSelector } from 'Redux/hooks';
import React, { FC } from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  Dimensions,
  StyleSheet,
} from 'react-native';

// export interface ICategory {
//   id: number;
//   categoryName: string;
// }

interface ICardCategory {
  onPress: () => void;
  categoryName: string;
  imageCategory: string;
}

const CardCategory: FC<ICardCategory> = ({
  onPress,
  categoryName,
  imageCategory,
}) => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const cardWidth = screenWidth / 2 - 20;

  return (
    <>
      <Pressable
        onPress={onPress}
        style={[styles.cardContainer, { width: cardWidth }]}
      >
        <Image
          source={{ uri: imageCategory }}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.overlayText}>
          <Text style={styles.overlayNameText}>{categoryName}</Text>
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
