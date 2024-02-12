import { ScrollView, Text, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
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
import axios from 'axios';
import { encode } from 'base-64';

const Home: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();
  const [numberPoints, setNumberPoints] = useState<number | null>(null);
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
  console.log('=======>', typeof barcode);

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
  
  const handleGetClientBonuses = async () => {
    const credentials = 'Exchange:Exchange';
    const base64Credentials = encode(`${credentials}`);
    try {
      const response = await axios.get(
        `http://retail.dolgovagro.ru/rtnagaev/hs/loyaltyservice/getclientbonuses?ClientCardID=${barcode}`,
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );

      const bonusCount = response.data?.BonusCount || 0;
      setNumberPoints(bonusCount);
      console.log('Ответ на запрос бонусов клиента:=====>', bonusCount);
    } catch (error) {
      console.error('Ошибка при запросе бонусов:', error.message);
    }
  };

  useEffect(() => {
    if (token && barcode) {
      handleGetClientBonuses();
    }
  }, [token, barcode]);

  const numberPointsRub = formatPoints(numberPoints || 0);

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
            <View className="align-items-center">
              <Svg
              // style={{ transform: [{ scale: 0.6 }] }}
              >
                <Barcode value={'3200000694903' || ''} format="EAN13" />
              </Svg>
            </View>
            <Text className="ml-1 text-2xl font-extrabold text-lime-600">
              {numberPoints}
            </Text>
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
