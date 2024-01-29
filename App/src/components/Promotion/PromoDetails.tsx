import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { PORT, IP } from '@env';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import currentPromotion from 'Redux/thunks/Promotion/getcurrentPromotion.api';
import SinglePromo from 'ui/SinglePromo';

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

const PromoDetails = ({ route }: any) => {
  const { promotionId } = route.params;
  const { width } = useWindowDimensions();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(currentPromotion(promotionId));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch, promotionId]);

  const currentPromotionOpen =
    useAppSelector<IPromotion>(
      (state) => state.promotiosSlice.currentPromotion
    ) || ({} as IPromotion);

  console.log('currentPromotionOpen', currentPromotionOpen);

  const desc = (
    <RenderHtml
      source={{
        html: String(currentPromotionOpen.description),
      }}
      contentWidth={width}
      enableExperimentalMarginCollapsing={true}
    />
  );
  console.log('desc', desc);

  const reverseDate = (dateString: string): string => {
    if (!dateString) {
      return ''; // or handle the case when dateString is undefined
    }

    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };

  return (
    <SafeAreaView className={`flex-1 items-center justify-start bg-[#ffff] `}>
      <View
        className={`flex-row items-center justify-between px-4 py-0 w-full`}
      >
        <TouchableOpacity
        //   onPress={() => navigation.goBack()
        //   }
        >
          <Text>ИКОНКА</Text>
        </TouchableOpacity>

        <TouchableOpacity
        //   onPress={() => navigation.navigate('CartScreen')}
        >
          <Text>иконка</Text>
        </TouchableOpacity>
      </View>
      {/* Scrollable container start */}
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View className="flex-col flex-wrap justify-center">
          {currentPromotionOpen ? (
            <SinglePromo
              key={currentPromotionOpen.id}
              title={currentPromotionOpen.title}
              image={currentPromotionOpen.photo}
              description={desc}
              dateStart={reverseDate(currentPromotionOpen.dateStart)}
              dateEnd={reverseDate(currentPromotionOpen.dateEnd)}
            />
          ) : (
            <View className="flex-row flex-wrap justify-center mt-4">
              <Text className="text-gray-600 font-medium text-lg">
                Продукт отсутстует
              </Text>
            </View>
          )}
        </View>
        {/* {isLoading ? (
    <View className={`flex-1 h-80 items-center justify-center`}>
      <ActivityIndicator size={'large'} color={'teal'} />
    </View>
  ) : ( */}

        {/* // feeds={filtered || filtered?.length > 0 ? filtered : feeds?.feeds}
  // />
  )} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PromoDetails;
