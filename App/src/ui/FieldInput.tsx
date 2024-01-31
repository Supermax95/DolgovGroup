import { TextInput, TextInputProps } from 'react-native';
import React, { FC } from 'react';

interface IFieldInput {
  onChange: (value: string) => void;
  value?: string;
  placeholder: string;
  isSecure?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  keyboardType?: TextInputProps['keyboardType'];
  style?: TextInputProps['style'];
  multiline?: boolean;
}

const FieldInput: FC<IFieldInput> = ({
  onChange,
  value,
  placeholder,
  isSecure,
  autoCapitalize,
  keyboardType,
  style,
  multiline,
}) => {
  return (
    <TextInput 
      onChangeText={onChange}
      placeholder={placeholder}
      value={value}
      secureTextEntry={isSecure}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      multiline={multiline} // Устанавливаем параметр multiline
      className="rounded-xl bg-gray-100 mt-3 p-3 w-full"
      style={style}
    />
  );
};

export default FieldInput;
