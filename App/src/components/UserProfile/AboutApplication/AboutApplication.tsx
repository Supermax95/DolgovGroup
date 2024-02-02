import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import getLaws from 'Redux/thunks/Law/getLaws.api';
import Padding from 'ui/Padding';
import UniversalHeader from 'ui/UniversalHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import FieldDetailArrow from 'ui/FieldDetailArrow';
import { View, Text } from 'react-native';

interface ILaw {
  id: number;
  title: string;
  description: string;
  dateFrom: string;
  documentLink: string;
}

const AboutApplication: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLaws());
  }, [dispatch]);

  const laws = useAppSelector<ILaw[]>((state) => state.lawSlice.data);

  const navigateToSingleLaw = (lawId: number): void => {
    navigation.navigate('SingleLaw', { lawId });
  };

  function truncateText(text: string, maxLength: number) {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  const maxLength = 35;

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title="О приложении"
      />
      <Padding>
        <Padding>
          {laws.length ? (
            laws.map((law) => (
              <FieldDetailArrow
                key={law.id}
                onPress={() => navigateToSingleLaw(law.id)}
                icon="file-document-outline"
                title={truncateText(law.title, maxLength)}
              />
            ))
          ) : (
            <View className="items-center justify-center w-full mt-4">
              <Text className="text-lg font-normal text-zinc-500">
                Информация отсутствует
              </Text>
            </View>
          )}
        </Padding>
      </Padding>
    </SafeAreaView>
  );
};

export default AboutApplication;
