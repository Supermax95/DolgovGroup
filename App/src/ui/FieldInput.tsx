import {
  NativeSyntheticEvent,
  Platform,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
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
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
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
  onFocus,
}) => {
  return (
    <>
      <TextInput
        onChangeText={onChange}
        placeholder={placeholder}
        value={value}
        secureTextEntry={isSecure}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        multiline={multiline}
        className={`rounded-xl bg-gray-100 mt-3 w-full
        ${Platform.OS === 'android' ? 'p-2' : 'p-4'}`}
        style={style}
        onFocus={onFocus}
      />
    </>
  );
};

export default FieldInput;
