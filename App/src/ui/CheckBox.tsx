import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Checkbox = ({ title, checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <MaterialCommunityIcons
        name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
        size={24}
        color="#007BFF"
      />
      <Text style={{ marginLeft: 8 }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Checkbox;
