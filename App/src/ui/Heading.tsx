import { View, Text } from 'react-native';
import React, { FC } from 'react';

interface IHeading {
  title: string;
}

const Heading: FC<IHeading> = ({ title }) => {
  return (
    <View className="px-1">
      <View className="ml-[12px] px-1 mt-4 flex flex-row justify-start">
        <Text className="text-2xl font-nolmal">{title}</Text>
      </View>
    </View>
  );
};

export default Heading;
