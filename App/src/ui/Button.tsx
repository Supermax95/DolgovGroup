import { Text, TouchableHighlight } from 'react-native';
import React, { FC } from 'react';

interface IButton {
  onPress: () => void;
  title: string;
  colors?: [string, string];
}

const Button: FC<IButton> = ({
  onPress,
  title,
  colors = ['bg-yellow-300', 'bg-green-400'],
}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={colors[1]}
      className={`text-gray-800 rounded-xl w-full my-4 py-3 ${colors[0]}`}
    >
      <Text className="text-center">{title}</Text>
    </TouchableHighlight>
  );
};

export default Button;
