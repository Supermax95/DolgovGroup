import { View, Text, Pressable } from 'react-native';
import React, { FC } from 'react';
import Padding from 'ui/Padding';
import { RootStackParamList } from 'navigation/types';

interface IFieldEditProfile {
  //onPress?: () => void;
  onPress: (screenName: keyof RootStackParamList | string) => void;
  title: string;
  children?: React.ReactNode;
}

const FieldEditProfile: FC<IFieldEditProfile> = ({
  onPress,
  title,
  children,
}) => {
  return (
    <Padding>
      <Pressable
        onPress={onPress}
        className="py-4 flex-row border-b-[1px] border-zinc-200 justify-between"
      >
        <View>
          <Text>{title}</Text>
        </View>
        <View>
          <Text className="text-zinc-500">{children}</Text>
        </View>
      </Pressable>
    </Padding>
  );
};

export default FieldEditProfile;
