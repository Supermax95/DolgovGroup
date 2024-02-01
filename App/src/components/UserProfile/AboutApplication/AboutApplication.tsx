import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable } from 'react-native';
import { StackNavigationProp } from 'navigation/types';
import getLaws from 'Redux/thunks/Law/getLaws.api';
import Padding from 'ui/Padding';
import UniversalHeader from 'ui/UniversalHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const AboutApplication: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLaws());
  }, [dispatch]);

  const laws = useAppSelector<string | undefined>(
    (state) => state.lawSlice.data
  );
  console.log('laws', laws);

  const navigateToSingleLaw = (lawId: number): void => {
    navigation.navigate('SingleLaw', { lawId });
  };

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title="О приложении"
      />
      <Padding>
        <Padding>
          {laws &&
            laws.map((law) => (
              <Pressable
                key={law.id}
                onPress={() => navigateToSingleLaw(law.id)}
                className="px-2 py-3 flex-row justify-between border-b-[1px] border-gray-100"
              >
                <View>
                  <Text className="text-zinc-800 font-medium text-md">
                    {law.title}
                  </Text>
                </View>
                <View className="w-7">
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={26}
                    color="#b7b7b6"
                  />
                </View>
              </Pressable>
            ))}
        </Padding>
      </Padding>
    </SafeAreaView>
  );
};

export default AboutApplication;
