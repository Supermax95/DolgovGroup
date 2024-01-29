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
import { PORT, IP } from '@env';

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
        // style={[styles.cardContainer, { width: cardWidth }]}
        className="relative p-0 m-1 rounded-xl flex-col items-center justify-center bg-[#f1e1d2]"
        style={{ width: cardWidth }}
      >
        <Image
          source={{ uri: `http://${IP}:${PORT}${imageCategory}` }}
          resizeMode="contain"
          style={styles.image}
        />
        <View
          // style={styles.overlayText}
          className="absolute top-0 right-0 bottom-0 left-0 justify-start items-start pl-2 pt-2"
        >
          <Text
            // style={styles.overlayNameText}
            className="text-md font-bold text-[#292520]"
          >
            {categoryName}
          </Text>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  // cardContainer: {
  //   position: 'relative',
  //   padding: 0,
  //   margin: 4,
  //   borderRadius: 15,
  //   backgroundColor: '#f1e1d2',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  image: {
    width: 200,
    height: 120,
  },
});

export default CardCategory;
