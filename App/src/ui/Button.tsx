import { Text, TouchableHighlight, Pressable } from 'react-native';
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
  colors = ['bg-green-300', 'bg-green-400'],
  disabled,
}) => {
  return (
    <Pressable
      onPress={onPress}
      // underlayColor={colors[1]}
      disabled={disabled}
      className={`text-gray-800 rounded-xl w-full mt-3 py-3 ${colors[0]}`}
    >
      <Text className="text-center text-base">{title}</Text>
    </Pressable>
  );
};

export default Button;
