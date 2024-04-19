import React, { FC } from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';

interface ICardNoCarusel {
  onPress: () => void;
  promotionTitle: string;
  promotionImage: string;
}

const CardNoCarusel: FC<ICardNoCarusel> = ({
  onPress,
  promotionTitle,
  promotionImage,
}) => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const cardWidth = screenWidth / 2 - 20;

  return (
    <>
      <Pressable
        onPress={onPress}
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
        }}
      >
        <Image
          source={{
            uri: `https://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}${promotionImage}`,
          }}
          resizeMode="cover"
          style={styles.image}
        />
        <View className="justify-start items-start py-2">
          <Text
            className="text-md font-semibold text-zinc-900"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {promotionTitle}
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

export default CardNoCarusel;
