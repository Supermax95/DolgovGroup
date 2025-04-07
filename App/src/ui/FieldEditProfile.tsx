import { View, Text, Pressable } from 'react-native';
import React, { FC } from 'react';
import Padding from 'ui/Padding';
import MaterialCommunityIcons from '@expo/vector-icons/AntDesign';

interface IFieldEditProfile {
  onPress?: () => void;
  title: string;
  children?: React.ReactNode;
  warningIcon?: string | undefined;
}

const FieldEditProfile: FC<IFieldEditProfile> = ({
  onPress,
  title,
  children,
  warningIcon,
}) => {
  return (
    <>
      {(title === 'Email' && warningIcon) ||
      (title === 'Дата рождения' && warningIcon) ? (
        <Padding>
          <Pressable
            onPress={onPress}
            className="py-4 flex-row items-center border-b-[1px] border-zinc-200 justify-between relative"
          >
            <View className="flex-row items-center">
              <Text className="text-zinc-800 font-normal text-md">{title}</Text>
            </View>
            <View className="flex-row items-center">
              <View className="mr-1.5">
                <MaterialCommunityIcons
                  name="exclamationcircleo"
                  color="red"
                  size={15}
                />
              </View>
              <Text className="text-zinc-500 font-normal text-md">
                {children}
              </Text>
            </View>
          </Pressable>
        </Padding>
      ) : (
        <Padding>
          <Pressable
            onPress={onPress}
            className="py-4 flex-row items-center border-b-[1px] border-zinc-200 justify-between"
          >
            <View>
              <Text className="text-zinc-800 font-normal text-md">{title}</Text>
            </View>
            <View>
              <Text className="text-zinc-500 font-normal text-md">
                {children}
              </Text>
            </View>
          </Pressable>
        </Padding>
      )}
    </>
  );
};

export default FieldEditProfile;
