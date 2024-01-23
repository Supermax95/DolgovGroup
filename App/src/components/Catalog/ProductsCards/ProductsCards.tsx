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
import ProductCard from 'ui/ProductCard';

const ProductsCards = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView
      className={`flex-1 items-center justify-start py-2 bg-[#ffff] `}
    >
      <Heading title="тайтл подкатегории" />
      <Search />
      {/* Scrollable container start */}
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View className="">
          <View className="flex-row flex-wrap justify-center">
            <ProductCard />
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
};

export default ProductsCards;
