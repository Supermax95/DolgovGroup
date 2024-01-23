import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { StackNavigationProp } from 'navigation/types';
import { View, SafeAreaView, ScrollView, TextInput } from 'react-native';

import Heading from 'ui/Heading';
import Search from 'ui/Search';
import Subcategory from 'ui/Subcategory';

const SubcagoryDetail = () => {
  return (
    <SafeAreaView
      className={`flex-1 items-center justify-start py-2 bg-[#ffff] `}
    >
      {/* поиск внутри подкатегории */}
      <Search />

      {/* Scrollable container для подкатегорий */}
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View className="my-4">
          <Subcategory title="Колбаса" />

          <View className="flex-row flex-wrap justify-center">
            {/* <CardCategory /> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubcagoryDetail;
