import { View, Text } from 'react-native';
import React, { FC } from 'react';

interface IHeading {
  title: string;
}

const Heading: FC<IHeading> = ({ title }) => {
  return (
    <View className="px-5 flex flex-row justify-start">
      <Text className="text-lg font-bold text-slate-800">{title}</Text>
    </View>
  );
};

export default Heading;
