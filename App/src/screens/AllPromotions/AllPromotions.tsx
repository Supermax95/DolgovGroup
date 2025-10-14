import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  View,
  Text,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import UniversalHeader from 'ui/UniversalHeader';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import getPromotions from 'Redux/thunks/Promotion/getPromotion.api';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import CardNoCarusel from 'ui/CardNoCarucel';

export interface IPromotion {
  id: number;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  carousel: boolean;
  invisible: boolean;
  photo: string;
  oldPrice?: number | null;
  newPrice?: number | null;
}

const AllPromotions: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp>();

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const promotionsAll = useAppSelector<IPromotion[]>(
    (state) => state.promotiosSlice.data
  );

  // Фильтруем только видимые акции из каталога (без карусели)
  const promotions = promotionsAll.filter(
    (promotion) => promotion.carousel === false && promotion.invisible === false
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await dispatch(getPromotions());
    } catch (error) {
      Alert.alert('Ошибка при обновлении данных');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(getPromotions());
      } catch (error) {
        Alert.alert('Ошибка при загрузке акций');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  const navigateToPromoDetail = (promotionId: number): void => {
    navigation.navigate('PromoOneDetail', { promotionId });
  };

  return (
    <SafeAreaView
      style={{ 
        backgroundColor: 'white', 
        height: '100%', 
        flex: 1,
      }}
    >
      <UniversalHeader title="Все акции" />

      {isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#62B237" />
        </View>
      ) : (
        <ScrollView
          alwaysBounceVertical
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, width: '100%', backgroundColor: '#FAFAFA' }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 }}>
            {promotions.length ? (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {promotions.map((promotion, index) => (
                  <CardNoCarusel
                    key={promotion.id}
                    onPress={() => navigateToPromoDetail(promotion.id)}
                    promotionTitle={promotion.title}
                    promotionImage={promotion.photo}
                    isNew={false}
                    isPromotion={true} // Все акции будут "АКЦИЯ!"
                    oldPrice={promotion.oldPrice}
                    newPrice={promotion.newPrice}
                  />
                ))}
              </View>
            ) : (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 64 }}>
                <Text style={{ fontSize: 16, color: '#6B7280', textAlign: 'center' }}>
                  🎁 Новые акции скоро появятся
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default AllPromotions;

