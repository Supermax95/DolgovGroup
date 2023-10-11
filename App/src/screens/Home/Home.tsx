import { Image, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import Padding from 'ui/Padding';
import LargeCard from 'ui/LargeCard';
import Heading from 'ui/Heading';
import NewGoods from 'screens/NewGoods/NewGoods';

const Home = () => {
  function formatPoints(numberPoints: number) {
    if (numberPoints === 0) {
      return '0 баллов';
    }
    const user = useSelector((state: RootState) => state.userSlice.user);
    // console.log('я user на home', user);
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

  return (
    <ScrollView alwaysBounceVertical 
    showsVerticalScrollIndicator={false}>
      <View className="bg-white h-full">

        <Padding>
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
    </View>
  );
};

export default Home;
