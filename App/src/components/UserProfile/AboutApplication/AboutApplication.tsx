import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { StackNavigationProp } from 'navigation/types';
import getLaws from 'Redux/thunks/Law/getLaws.api';
import Padding from 'ui/Padding';
import FieldDetail from 'ui/FieldDetail';
import UniversalHeader from 'ui/UniversalHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        {laws &&
          laws.map((law) => (
            <FieldDetail
              key={law.id}
              onPress={() => navigateToSingleLaw(law.id)}
              title={law.title}
            />
          ))}
      </Padding>
    </SafeAreaView>
  );
};

export default AboutApplication;
