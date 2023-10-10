import { View, Text, Image } from 'react-native';
import React, { FC } from 'react';
import { BOX_SHADOW } from 'styles';

interface ILargeCard {
  numberPoints: string;
  barcode: object;
}

const LargeCard: FC<ILargeCard> = ({ numberPoints, barcode }) => {
  return (
    <View
      style={{ ...BOX_SHADOW }}
      className="bg-white rounded-2xl p-4 mt-6 w-[97%] h-52 mx-auto"
    >
      <View className="text-center mb-4">
        <Image source={barcode} className="mt-2 h-14 w-full" />
      </View>
      <View className="mt-2">
        <View className="flex-row justify-between">
          <Text className="ml-1 text-2xl font-extrabold text-lime-600">
            {numberPoints}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LargeCard;
