import {
  View,
  Text,
  Platform,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, { FC } from 'react';
import { Feather } from '@expo/vector-icons';
import { Svg } from 'react-native-svg';
import Barcode from 'react-native-barcode-svg';

interface IBonusCard {
  onPressBonuses: () => void;
  onPressBrightness: () => void;
  numberPoints: number | null;
  barcode: string | undefined;
  isResendDisabled: boolean;
  secondsRemaining: number;
  isLoading: boolean;
}

const screenWidth = Math.round(Dimensions.get('window').width);
const cardWidth = screenWidth - 40;
const cardHeight = 220;

const BonusCard: FC<IBonusCard> = ({
  onPressBonuses,
  onPressBrightness,
  numberPoints,
  barcode,
  isResendDisabled,
  secondsRemaining,
  isLoading,
}) => {
  return (
    <>
      <View className="relative">
        <View className="mx-2 absolute z-10 left-4 top-8">
          <Text className=" text-2xl font-extrabold text-lime-600">
            {numberPoints} ₽
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.imageBox}>
            <View className="absolute top-5 right-5">
              <Svg>
                <Barcode value={barcode || ''} format="EAN13" />
              </Svg>
            </View>
          </View>
          <View className="absolute bottom-20 right-6">
            <Text className={`text-gray-700 text-center text-base`}>
              {barcode}
            </Text>
          </View>
        </View>

        {/* та самая полоска */}
        <View className="mx-2 z-50 left-0 bottom-12 border-t-2 border-zinc-100 "></View>

        {/* яркость */}
        <Pressable
          onPress={onPressBrightness}
          className="absolute bottom-14 right-24 flex-row space-x-2 items-center  "
        >
          <Text className="text-green-700 font-normal text-sm">
            Увеличить яркость
          </Text>
          <Feather name="sun" size={18} color="green" />
        </Pressable>

        {/* баланс */}
        {isResendDisabled ? (
          <View
            className={`
        ${
          Platform.OS === 'android'
            ? 'absolute bottom-5 left-10'
            : 'absolute bottom-5 left-10'
        }`}
          >
            <Text className="text-xs font-molmal text-zinc-500">
              Повторно обновить возможно через {secondsRemaining % 60} секунд
            </Text>
          </View>
        ) : isLoading ? (
          <View
            className={`
              ${
                Platform.OS === 'android'
                  ? 'absolute bottom-5 right-36'
                  : 'absolute bottom-5 right-40'
              }`}
          >
            <ActivityIndicator size={25} color="green" />
          </View>
        ) : (
          <View
            className={`
              ${
                Platform.OS === 'android'
                  ? 'absolute bottom-5 right-24'
                  : 'absolute bottom-5 right-24'
              }`}
          >
            <Pressable onPress={onPressBonuses} disabled={isResendDisabled}>
              <Text className="text-center text-md text-gray-800">
                Обновить баланс карты
              </Text>
            </Pressable>
          </View>
        )}
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
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  imageBox: {
    width: cardWidth,
    height: cardHeight,
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: 'white',
    elevation: 5,
  },
  image: {
    width: cardWidth,
    height: cardHeight,
    resizeMode: 'cover',
  },
});

export default BonusCard;
