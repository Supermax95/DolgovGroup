import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import getLaws from 'Redux/thunks/Law/getLaws.api';
import Padding from 'ui/Padding';
import UniversalHeader from 'ui/UniversalHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import FieldDetailArrow from 'ui/FieldDetailArrow';

const AboutApplication: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLaws());
  }, [dispatch]);

  const laws = useAppSelector<string | undefined>(
    (state) => state.lawSlice.data
  );

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
          {laws &&
            laws.map((law) => (
              <FieldDetailArrow
                key={law.id}
                onPress={() => navigateToSingleLaw(law.id)}
                icon="file-document-outline"
                title={truncateText(law.title, maxLength)}
              />
            ))}
        </Padding>
      </Padding>
    </SafeAreaView>
  );
};

export default AboutApplication;
