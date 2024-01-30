import { View, Text, Platform, Pressable } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';

const ArrowGoBack = () => {
  const navigation = useNavigation<StackNavigationProp>();

  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 999,
        top: Platform.OS === 'android' ? 0 : 60,
      }}
      className="flex-row items-center justify-between w-full"
    >
      <Pressable onPress={() => navigation.goBack()}>
        <View className="w-8">
          <MaterialCommunityIcons
            name="chevron-left"
            size={36}
            color="#71716F"
          />
        </View>
      </Pressable>
    </View>
  );
};

export default ArrowGoBack;
