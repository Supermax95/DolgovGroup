import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { StackNavigationProp } from 'navigation/types';
import Padding from 'ui/Padding';
import FieldDetail from 'ui/FieldDetail';
import { SafeAreaView } from 'react-native-safe-area-context';

const Support: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <Padding>
   
        <FieldDetail
          onPress={() => navigation.navigate('SupportMessage')}
          icon="account"
          title="Связаться с поддержкой"
        />
      </Padding>
    </SafeAreaView>
  );
};
export default Support;
