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
        className="relative p-0 m-1 rounded-xl flex-col items-center justify-center bg-[#FBECDE]"
        style={{ width: cardWidth }}
      >
        <Image
          source={{ uri: `http://${IP}:${PORT}${imageCategory}` }}
          resizeMode="cover"
          style={styles.image}
        />
        <View className="absolute top-0 right-0 bottom-0 left-0 justify-start items-start pl-2 pt-2">
          <Text className="text-md font-bold text-[#292520]">
            {categoryName}
          </Text>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12, // Установка радиуса скругления для изображения
  },
});

export default CardCategory;

