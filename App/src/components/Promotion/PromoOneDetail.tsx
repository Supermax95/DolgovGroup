import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import currentPromotion from 'Redux/thunks/Promotion/getcurrentPromotion.api';
import SinglePromo from 'ui/SinglePromo';
import UniversalHeader from 'ui/UniversalHeader';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';

export interface IPromotion {
  id: number;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  carousel: boolean;
  invisible: boolean;
  photo?: string;
}

const PromoOneDetail = ({ route }: any) => {
  const { promotionId } = route.params;
  const { width } = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp>();
  // const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(true);
  const dispatch = useAppDispatch();

  const onRefresh = async () => {
    try {
      dispatch(currentPromotion(promotionId));
    } catch (error) {
      Alert.alert('Ошибка при обновлении данных');
    } finally {
      setTimeout(() => {
        setRefreshing(false);
      }, 500);
    }
  };
  useEffect(() => {
    onRefresh();
  }, []);

  const currentPromotionOpen =
    useAppSelector<IPromotion | null>(
      (state) => state.promotiosSlice.currentPromotion
    ) || ({} as IPromotion);

  const desc = (
    <RenderHtml
      source={{
        html: String(currentPromotionOpen.description),
      }}
      contentWidth={width}
      enableExperimentalMarginCollapsing={true}
    />
  );

  return (
    <>
      <SafeAreaView className="bg-white h-full flex-1">
        <UniversalHeader onPress={() => navigation.goBack()} />

        {currentPromotionOpen ? (
          <ScrollView
            style={{ flex: 1, width: '100%' }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <SinglePromo
              key={currentPromotionOpen.id}
              title={currentPromotionOpen.title}
              image={currentPromotionOpen.photo}
              description={desc}
              dateStart={currentPromotionOpen.dateStart}
              dateEnd={currentPromotionOpen.dateEnd}
              carusel={currentPromotionOpen.carousel}
            />
            <View
              className={`items-center justify-center pb-10 ${
                Platform.OS === 'android' ? 'px-3' : 'px-2'
              }`}
            >
              <Text className="text-gray-600 font-medium text-xs italic text-center">
                *Информация о ценах и акциях может изменяться. Рекомендуем
                уточнить актуальную информацию в магазине.
              </Text>
            </View>
          </ScrollView>
        ) : (
          <View className="flex-row flex-wrap justify-center mt-4">
            <Text className="text-gray-600 font-medium text-lg">
              Продукт отсутстует
            </Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default PromoOneDetail;
