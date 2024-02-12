import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import Padding from 'ui/Padding';
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
import CardsNoCarusel from 'components/Promotion/CardsNoCarusel';
import CardsCarusel from 'components/Promotion/CardsCarusel';
import ButtonWithDisable from 'ui/ButtonWithDisable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import { encode } from 'base-64';

const HomeDetail: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();
  const [numberPoints, setNumberPoints] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResendDisabled, setResendDisabled] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
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

  const numberPointsRub = formatPoints(numberPoints || 0);

  return (
    <SafeAreaView className="bg-[#f3f4f6] h-full flex-1">
      <UniversalHeader
        title="Главная"
        // onPressSearch={handleSearchPress}
      />

      {/* Scrollable container start */}
      <ScrollView
        alwaysBounceVertical
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width: '100%' }}
      >
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="green" />
          </View>
        ) : (
          <>
            <ButtonWithDisable
              title="Обновить балланс"
              onPress={handleGetClientBonuses}
              disabled={isResendDisabled}
            />
            {isResendDisabled && (
              <View className="mt-2 justify-center items-center">
                <Text className="text-xs font-molmal text-zinc-500">
                  Возможность повторного обновления через{' '}
                  {secondsRemaining % 60} секунд
                </Text>
              </View>
            )}
          </>
        )}

        {/* Бонусная карта */}
        <Padding>
          <View
            style={{ ...BOX_SHADOW }}
            className="bg-white rounded-2xl p-4 mt-6 w-[97%] h-56 mx-auto"
          >
            <View className="align-items-center">
              <Svg
              // style={{ transform: [{ scale: 0.6 }] }}
              >
                <Barcode value={barcode || ''} format="EAN13" />
              </Svg>
            </View>
            <Text className="ml-1 text-2xl font-extrabold text-lime-600">
              {numberPoints}
            </Text>
          </View>
        </Padding>

        {/* акции вне карусели */}
        <View>
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
    </SafeAreaView>
  );
};

export default HomeDetail;
