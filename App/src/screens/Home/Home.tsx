import { ScrollView, Text, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import Padding from 'ui/Padding';
import LargeCard from 'ui/LargeCard';
import Heading from 'ui/Heading';
import NewGoods from 'screens/NewGoods/NewGoods';
import UniversalHeader from 'ui/UniversalHeader';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg } from 'react-native-svg';
import Barcode from 'react-native-barcode-svg';
import { BOX_SHADOW } from 'styles';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import getBarcode from 'Redux/thunks/User/barcode.api';


const Home: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();
  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );

  useEffect(() => {
    if (token) {
      dispatch(getBarcode({ token }));
    }
  }, [dispatch]);

  const barcode = useAppSelector<string | undefined>(
    (state) => state.userSlice.user.barcode
  );
  console.log('========>',barcode);
  
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
          {/* <LargeCard
            numberPoints={numberPointsRub}
            barcode={require('../../assets/shtrihkod.jpg')}
          /> */}

          {/* Example of EAN-13 barcode */}
          <View
            style={{ ...BOX_SHADOW }}
            className="bg-white rounded-2xl p-4 mt-6 w-[97%] h-56 mx-auto"
          >
            <View className="text-center mb-4">
              <Text className="ml-1 text-2xl font-extrabold text-lime-600">
            {numberPoints}
          </Text>
              <Svg>
                <Barcode value={barcode} format="EAN13" />
              </Svg>
            </View>
          </View>

          {/* Example of CODE128 barcode */}

          {/* Add more barcode types as needed */}

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
