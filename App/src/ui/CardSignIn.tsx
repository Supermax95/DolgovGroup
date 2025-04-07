import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import Button from './Button';

const screenWidth = Math.round(Dimensions.get('window').width);
const cardWidth = screenWidth - 40;
const cardHeight = 150;

interface ICardSignIn {
  onPress: () => void;
}

const CardSignIn: FC<ICardSignIn> = ({ onPress }) => {
  return (
    <>
      <View
        style={{
          shadowOpacity: 0.2,
          shadowOffset: {
            width: 0,
            height: 2,
          },
        }}
        className="relative"
      >
        <View
          style={[styles.card, styles.imageBox]}
          className="flex flex-col justify-between p-4 bg-white rounded-3xl"
        >
          <View className="flex-1 flex justify-center items-center">
            <Text className="text-base text-center font-bold text-slate-800">
              Войдите, чтобы воспользоваться бонусной картой
            </Text>
          </View>
          <View className="flex-1 flex justify-center items-center">
            <Button onPress={onPress} title="Войти" />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    height: cardHeight,
    width: cardWidth,
    marginVertical: 10,
    shadowColor: '#000',
    shadowRadius: 4,
    // shadowOpacity: 0.2,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
  },
  imageBox: {
    width: cardWidth,
    height: cardHeight,
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: 'white',
    elevation: 5,
  },
});

export default CardSignIn;
