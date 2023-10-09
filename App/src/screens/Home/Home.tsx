import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import React from 'react';

import NewGoods from 'screens/NewGoods/NewGoods';
import { BOX_SHADOW } from 'styles';
import LargeCard from 'ui/LargeCard';
import { useSelector } from 'react-redux';
import Heading from 'ui/Heading';

const Home = () => {
  function formatPoints(numberPoints: number) {
    if (numberPoints === 0) {
      return '0 баллов';
    }
    const user = useSelector((state: RootState) => state.userSlice.user);
    console.log('я юзуер на хосме', user);
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
  console.log(numberPointsRub);

  return (
    <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
      <View className="bg-white h-full">
        <LargeCard
          numberPoints={numberPointsRub}
          barcode={require('../../assets/shtrihkod.jpg')}
        />
        <Heading title="Акции" />

        <NewGoods />
      </View>
    </ScrollView>
  );
};

export default Home;
