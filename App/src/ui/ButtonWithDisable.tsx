import { Text, TouchableHighlight, Pressable } from 'react-native';
import React, { FC } from 'react';

interface IButtonWithDisable {
  onPress: () => void;
  title: string;
  colors?: [string, string];
  disabled?: boolean;
}

const ButtonWithDisable: FC<IButtonWithDisable> = ({
  onPress,
  title,
  colors = ['bg-green-500', 'bg-gray-300'],
  disabled,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`text-gray-800 rounded-xl w-full mt-3 py-3 ${
        disabled ? colors[1] : colors[0]
      }`}
    >
      <Text className="text-white text-center text-base">{title}</Text>
    </Pressable>
  );
};

export default ButtonWithDisable;
