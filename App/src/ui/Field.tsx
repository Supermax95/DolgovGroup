import { View, Text, TextInput } from 'react-native';
import React, { FC } from 'react';

interface IField {
  onChange: (value: string) => void;
  value: string;
  placeholder: string;
  isSecure?: boolean;
}

const Field: FC<IField> = ({ onChange, value, placeholder, isSecure }) => {
  return (
    <TextInput
      onChangeText={onChange}
      placeholder={placeholder}
      value={value}
      secureTextEntry={isSecure}
      autoCapitalize="none"
      className="rounded-xl bg-gray-100 mt-3 p-3 w-full"
    />
  );
};

export default Field;
