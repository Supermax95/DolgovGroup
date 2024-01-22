import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import CardCategory from 'ui/CardCategory';
import CardNoCarusel from 'components/ Action/CardNoCarusel/CardNoCarusel';
import Heading from 'ui/Heading';
import Search from 'ui/Search';

function CategoryDetail() {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView
      className={`flex-1 items-center justify-start py-2 bg-[#ffff] `}
    >
      <Search />

      {/* Scrollable container start */}
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View className="bg-green-100">
          <Heading title="Рекомендуем" />
          <ScrollView
            style={{ flex: 1, width: '100%', paddingHorizontal: 9 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <CardNoCarusel />
          </ScrollView>
        </View>

        <View className="">
          <Heading title="Или нет" />
          <View className="flex-row flex-wrap justify-center">
            <CardCategory />
          </View>
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
}

export default CategoryDetail;
