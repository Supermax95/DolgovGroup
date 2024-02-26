import { Text, Pressable, TouchableHighlight } from 'react-native';
import React, { FC } from 'react';

interface IButton {
  onPress: () => void;
  title: string;
  colors?: [string, string];
  disabled?: boolean;
}

const Button: FC<IButton> = ({
  onPress,
  title,
  colors = ['bg-green-500', 'bg-green-400'],
}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={colors[1]}
      className={`first-letter:text-gray-800 rounded-xl w-full mt-3 py-3 ${colors[0]}`}
    >
      <Text className="text-white text-center font-normal text-base">
        {title}
      </Text>
    </TouchableHighlight>
  );
};

export default Button;
