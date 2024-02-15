import { ActivityIndicator, Platform, RefreshControl, ScrollView, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import Padding from 'ui/Padding';
import Heading from 'ui/Heading';
import UniversalHeader from 'ui/UniversalHeader';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from 'navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import getBarcode from 'Redux/thunks/User/barcode.api';
import CardsNoCarusel from 'components/Promotion/CardsNoCarusel';
import CardsCarusel from 'components/Promotion/CardsCarusel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Brightness from 'expo-brightness';
import { encode } from 'base-64';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BonusCard from 'ui/BonusCard';
import { LinearGradient } from 'expo-linear-gradient';
import getCategory from 'Redux/thunks/Catalog/categoryGet.api';
import getProducts from 'Redux/thunks/Catalog/productGet.api';
import getSubcategory from 'Redux/thunks/Catalog/subcategoryGet.api';

const HomeDetail: FC = () => {
  // const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();
  const [numberPoints, setNumberPoints] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResendDisabled, setResendDisabled] = useState<boolean>(false);
  const [originalBrightness, setOriginalBrightness] = useState<number | null>(
    null
  );
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);

  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getProducts(), getCategory(), getSubcategory());
    setRefreshing(false);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        const initialBrightness = await Brightness.getSystemBrightnessAsync();
        setOriginalBrightness(initialBrightness);
      }
    })();
  }, []);

  const increaseBrightness = async () => {
    const { status } = await Brightness.requestPermissionsAsync();
    if (status === 'granted') {
      try {
        await Brightness.setBrightnessAsync(1.0);
        setTimeout(async () => {
          await Brightness.setBrightnessAsync(originalBrightness || 0.5);
        }, 10000);
      } catch (error) {
        console.error('Ошибка при установке яркости:', error);
      }
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(getBarcode({ token }));
    }
  }, [dispatch]);

  const barcode = useAppSelector<string | undefined>(
    (state) => state.userSlice.user.barcode
  );

  //*функция склоняет баллы
  //   function formatPoints(numberPoints: number) {
  //     if (numberPoints === 0) {
  //       return '0 баллов';
  //     }

  //     const lastDigit = numberPoints % 10;
  //     const lastTwoDigits = numberPoints % 100;

  //     if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
  //       return `${numberPoints} баллов`;
  //     } else if (lastDigit === 1) {
  //       return `${numberPoints} балл`;
  //     } else if (lastDigit >= 2 && lastDigit <= 4) {
  //       return `${numberPoints} балла`;
  //     } else {
  //       return `${numberPoints} баллов`;
  //     }
  //   }

  //   const numberPointsRub = formatPoints(numberPoints || 0);

  const checkResendAvailability = async () => {
    const lastSentTime = await AsyncStorage.getItem('bonusCheck');
    console.log('lastSentTime', lastSentTime);
    if (lastSentTime) {
      const currentTime = Date.now();
      const timeDifference = currentTime - parseInt(lastSentTime, 10);
      const minutesPassed = timeDifference / (1000 * 60);
      if (minutesPassed < 1) {
        // Если прошло менее одной минуты, блокируем повторную отправку
        setResendDisabled(true);
        const remainingTime = Math.floor((1 - minutesPassed) * 60); // Изменилось с 3 на 1
        // Оставшееся время в секундах
        setSecondsRemaining(remainingTime);
        startResendTimer();
      }
    }
  };

  const startResendTimer = () => {
    const interval = setInterval(() => {
      setSecondsRemaining((prevSeconds) => {
        if (prevSeconds === 1) {
          clearInterval(interval);
          setResendDisabled(false);
          AsyncStorage.removeItem('bonusCheck');
        }
        return prevSeconds - 1;
      });
    }, 1000);
  };
  const handleGetClientBonuses = async () => {
    setIsLoading(true);
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
      AsyncStorage.setItem('bonusCheck', Date.now().toString());
      setNumberPoints(bonusCount);
      checkResendAvailability();
      setIsLoading(false);
      console.log('Ответ на запрос бонусов клиента:=====>', bonusCount);
    } catch (error) {
      console.error('Ошибка при запросе бонусов');
    }
  };

  useEffect(() => {
    if (token && barcode) {
      handleGetClientBonuses();
    }
  }, [token, barcode]);

  // const numberPointsRub = formatPoints(numberPoints || 0);

  const insets = useSafeAreaInsets();

  return (
    <>
      <SafeAreaView
        className="bg-white h-full flex-1"
        style={{ paddingBottom: Platform.OS === 'ios' ? -100 : 0 }}
      >
        <UniversalHeader title="Главная" />

        {/* Scrollable container start */}
        <LinearGradient
          colors={['#FAF9F9', '#FAFAFA', '#EBEBEB']}
          className="flex-1"
        >
          <ScrollView
            alwaysBounceVertical
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, width: '100%' }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {/* Бонусная карта */}
            <View className="mb-4 py-4 flex-1 rounded-b-3xl ">
              <Padding>
                <View className="pt-4 flex justify-center items-center">
                  <BonusCard
                    onPressBonuses={handleGetClientBonuses}
                    onPressBrightness={increaseBrightness}
                    numberPoints={numberPoints}
                    barcode={barcode}
                    isResendDisabled={isResendDisabled}
                    secondsRemaining={secondsRemaining}
                    isLoading={isLoading}
                  />
                </View>
              </Padding>
            </View>

            {/* акции вне карусели */}
            <View className="py-2">
              <Heading title="Акции вне карусели" />
              <CardsNoCarusel />
            </View>

            {/* акции В карусели */}
            <View>
              {/* <Heading title="Акции в карусели" /> */}
              <CardsCarusel />
            </View>

            <View>
              <Heading title="Акции вне карусели" />
              <CardsNoCarusel />
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </>
    // </LinearGradient>
    // </View>
  );
};

export default HomeDetail;
