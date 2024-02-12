import {
  View,
  Text,
  Image,
  Platform,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, { FC, useState } from 'react';
import { BOX_SHADOW } from 'styles';
import { Feather } from '@expo/vector-icons';
import { Svg } from 'react-native-svg';
import Barcode from 'react-native-barcode-svg';

interface ILargeCard {
  numberPoints: string;
  barcode: string | undefined;
  isResendDisabled: boolean;
  secondsRemaining: number;
}

const LargeCard: FC<ILargeCard> = ({
  numberPoints,
  barcode,
  isResendDisabled,
  secondsRemaining,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  s;
  return (
    <View
      style={{ ...BOX_SHADOW }}
      className="bg-white rounded-2xl p-4 my-6 w-[95%] h-56 mx-auto relative"
    >
      <View className="mx-2">
        <Text className=" text-2xl font-extrabold text-lime-600">
          {numberPoints} ₽
        </Text>
      </View>

      <View className="absolute top-5 right-5">
        <Svg>
          <Barcode value={barcode || ''} format="EAN13" />
        </Svg>
      </View>
      <View className="absolute bottom-20 right-6">
        <Text className={`text-gray-700 text-center text-base`}>{barcode}</Text>
      </View>

      {isResendDisabled ? (
        <View className="absolute bottom-5 left-12">
          <Text className="text-xs font-molmal text-zinc-500">
            Повторно обновить возмонжо через {secondsRemaining % 60} секунд
          </Text>
        </View>
      ) : isLoading ? (
        <View className="absolute bottom-5 right-40">
          <ActivityIndicator size={25} color="green" />
        </View>
      ) : (
        <View
          className={`absolute bottom-5
              ${Platform.OS === 'android' ? 'right-20' : 'right-24'}`}
        >
          <Pressable
            onPress={handleGetClientBonuses}
            disabled={isResendDisabled}
            className="text-gray-800 rounded-xl w-full"
          >
            <Text
              className={` ${
                isResendDisabled ? 'text-green-800' : 'text-gray-500'
              } text-center text-base`}
            >
              Обновить баланс карты
            </Text>
          </Pressable>
        </View>
      )}

      <View
        className={`
              ${Platform.OS === 'android' ? 'mt-[35%]' : 'mt-[30%]'}
               py-3 border-b-[1px] border-zinc-200`}
      ></View>

      <Pressable
        onPress={increaseBrightness}
        className="absolute bottom-14 right-24 flex-row space-x-2 items-center  "
      >
        <Text className="text-green-700 font-normal text-sm">
          Увеличить яркость
        </Text>
        <Feather name="sun" size={19} color="green" />
      </Pressable>
    </View>
  );
};

export default LargeCard;
