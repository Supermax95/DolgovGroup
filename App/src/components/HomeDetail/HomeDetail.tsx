import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import Padding from 'ui/Padding';
import Heading from 'ui/Heading';
import { Feather } from '@expo/vector-icons';
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
import * as Brightness from 'expo-brightness';
import { encode } from 'base-64';
import { StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const HomeDetail: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
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

  //   const numberPointsRub = formatPoints(numberPoints || 0);

  const insets = useSafeAreaInsets();

  return (
    // <SafeAreaView className="bg-[#f3f4f6] h-full flex-1" >
    //   <View
    //   style={{
    //     flex: 1,
    //     backgroundColor: '#f3f4f6',
    //     paddingBottom: Platform.OS === 'ios' ? 0 : insets.bottom,
    //   }}
    // >
    <LinearGradient
      colors={['#00FF00', '#FFFFFF']}
      style={{
        flex: 1,
        paddingBottom: Platform.OS === 'ios' ? 0 : insets.bottom,
      }}
    >
      <StatusBar backgroundColor="#f3f4f6" barStyle="dark-content" />

      {Platform.OS === 'ios' && (
        <SafeAreaView style={{ flex: 0, backgroundColor: '#f3f4f6' }} />
      )}
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
        {/* Бонусная карта */}
        <Padding>
          <View
            style={{ ...BOX_SHADOW }}
            className="bg-white rounded-2xl p-4 my-6 w-[95%] h-56 mx-auto relative"
          >
            <View className="mx-2">
              <Text className=" text-2xl font-extrabold text-lime-600">
                {numberPoints} ₽
              </Text>
            </View>

            <View className="absolute top-5 right-5">
              <Svg>
                <Barcode value={barcode || ''} format="EAN13" />
              </Svg>
            </View>
            <View className="absolute bottom-20 right-6">
              <Text className={`text-gray-700 text-center text-base`}>
                {barcode}
              </Text>
            </View>

            {isResendDisabled ? (
              <View className="absolute bottom-5 left-12">
                <Text className="text-xs font-molmal text-zinc-500">
                  Повторно обновить возмонжо через {secondsRemaining % 60}{' '}
                  секунд
                </Text>
              </View>
            ) : isLoading ? (
              <View className="absolute bottom-5 right-40">
                <ActivityIndicator size={25} color="green" />
              </View>
            ) : (
              <View
                className={`absolute bottom-5
              ${Platform.OS === 'android' ? 'right-20' : 'right-24'}`}
              >
                <Pressable
                  onPress={handleGetClientBonuses}
                  disabled={isResendDisabled}
                  className="text-gray-800 rounded-xl w-full"
                >
                  <Text
                    className={` ${
                      isResendDisabled ? 'text-green-800' : 'text-gray-500'
                    } text-center text-base`}
                  >
                    Обновить баланс карты
                  </Text>
                </Pressable>
              </View>
            )}

            <View
              className={`
              ${Platform.OS === 'android' ? 'mt-[35%]' : 'mt-[30%]'}
               py-3 border-b-[1px] border-zinc-200`}
            ></View>

            <Pressable
              onPress={increaseBrightness}
              className="absolute bottom-14 right-24 flex-row space-x-2 items-center  "
            >
              <Text className="text-green-700 font-normal text-sm">
                Увеличить яркость
              </Text>
              <Feather name="sun" size={19} color="green" />
            </Pressable>
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
    </LinearGradient>
    // </View>
  );
};

export default HomeDetail;
