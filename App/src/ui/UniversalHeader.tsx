import { View, Text, Pressable, Platform } from 'react-native';
import React, { FC } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface IUniversalHeader {
  onPress?: () => void | undefined;
  title?: string | undefined;
  onPressSearch?: () => void | undefined;
}

const UniversalHeader: FC<IUniversalHeader> = ({
  onPress,
  title,
  onPressSearch,
}) => {
  return (
    <>
      {onPress && title && onPressSearch ? (
        <View className="flex-row items-center justify-between p-2 w-full h-12">
          <Pressable onPress={onPress} className="w-10">
            <MaterialCommunityIcons
              name="chevron-left"
              size={36}
              color="#71716F"
            />
          </Pressable>
          <View className="flex-1 px-3 flex-row justify-center">
            <Text className="text-lg font-bold text-emerald-700">{title}</Text>
          </View>
          <Pressable onPress={onPressSearch} className="w-10">
            <MaterialCommunityIcons name="magnify" size={26} color="#71716F" />
          </Pressable>
        </View>
      ) : onPress && title && !onPressSearch ? (
        <View className="flex-row items-center justify-between p-2 w-full h-12">
          <Pressable onPress={onPress} className="w-10">
            <MaterialCommunityIcons
              name="chevron-left"
              size={36}
              color="#71716F"
            />
          </Pressable>
          <View className="flex-1 px-3 flex-row justify-center">
            <Text className="text-lg font-bold text-emerald-700">{title}</Text>
          </View>
          <Pressable onPress={onPressSearch} className="w-10">
            <View className="w-10"></View>
          </Pressable>
        </View>
      ) : onPress && !title && !onPressSearch ? (
        <View
          style={{
            position: 'absolute',
            zIndex: 999,
            top: Platform.OS === 'android' ? 10 : 70,
          }}
          className="flex-row items-center justify-between w-full px-2"
        >
          <Pressable onPress={onPress} className="w-10">
            {/* <View className="w-10"> */}
            <MaterialCommunityIcons
              name="chevron-left"
              size={36}
              color="#71716F"
            />
            {/* </View> */}
          </Pressable>
        </View>
      ) : !onPress && title && onPressSearch ? (
        <View className="flex-row items-center justify-between p-2 w-full h-12">
          <View className="flex-1 px-3 flex-row justify-start">
            <Text className="text-lg font-bold text-emerald-700">{title}</Text>
          </View>
          <Pressable onPress={onPressSearch} className="w-10">
            <MaterialCommunityIcons name="magnify" size={26} color="#71716F" />
          </Pressable>
        </View>
      ) : (
        <View className="flex-row items-center justify-between p-2 w-full h-12">
          <View className="flex-1 px-3 flex-row justify-center">
            <Text className="text-lg font-bold text-emerald-700">{title}</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default UniversalHeader;
