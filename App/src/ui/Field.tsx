import { TextInput, TextInputProps } from 'react-native';
import React, { FC } from 'react';

interface IField {
  onChange: (value: string) => void;
  value?: string;
  placeholder: string;
  isSecure?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  keyboardType?: TextInputProps['keyboardType'];
}

const Field: FC<IField> = ({
  onChange,
  value,
  placeholder,
  isSecure,
  autoCapitalize,
  keyboardType,
}) => {
  return (
    <TextInput
      // showSoftInputOnFocus={false}
      onChangeText={onChange}
      placeholder={placeholder}
      value={value}
      secureTextEntry={isSecure}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      className="rounded-xl bg-gray-100 mt-3 p-3 w-full"
    />
  );
};

export default Field;
