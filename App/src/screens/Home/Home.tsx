import { ScrollView } from 'react-native';
import React, { FC } from 'react';
import Padding from 'ui/Padding';
import LargeCard from 'ui/LargeCard';
import Heading from 'ui/Heading';
import NewGoods from 'screens/NewGoods/NewGoods';
import UniversalHeader from 'ui/UniversalHeader';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();

  function formatPoints(numberPoints: number) {
    if (numberPoints === 0) {
      return '0 баллов';
    }

    const lastDigit = numberPoints % 10;
    const lastTwoDigits = numberPoints % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return `${numberPoints} баллов`;
    } else if (lastDigit === 1) {
      return `${numberPoints} балл`;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return `${numberPoints} балла`;
    } else {
      return `${numberPoints} баллов`;
    }
  }

  const numberPoints = 15;

  const numberPointsRub = formatPoints(numberPoints);
  //console.log(numberPointsRub);

  //* боже, хз, что это за код. наверное, надо его пересмотреть и скрол и хединг и пр.

  // const handleSearchPress = () => {
  //   navigation.navigate('Search');
  // };

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        title="Главная"
        // onPressSearch={handleSearchPress}
      />
      <ScrollView alwaysBounceVertical showsVerticalScrollIndicator={false}>
        <Padding>
          {/* здесь должен быть штрих-код */}
          <LargeCard
            numberPoints={numberPointsRub}
            barcode={require('../../assets/shtrihkod.jpg')}
          />
          <Heading title="Акции" />
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="px-1"
          >
            <NewGoods />
          </ScrollView>
          <Heading title="Персональные предложения" />

          <NewGoods />
        </Padding>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
