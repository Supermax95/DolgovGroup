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
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CardCategory from 'ui/CardCategory';

const Catalog: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView
      className={`flex-1 items-center justify-start py-2 bg-[#ffff] `}
    >
      <View
        className={`flex-row items-center justify-between px-4 py-2 w-full`}
      >
        <View className={`flex-row items-center mr-12`}>
          <View
            className={`px-4 py-2 bg-gray-100  rounded-xl flex-row items-center justify-center mr-2`}
          >
            <MaterialCommunityIcons name="magnify" size={23} color="#7f7f7f" />
            <TextInput
              className={`text-md font-normal flex-1 px-2 py-1`}
              placeholderTextColor="#555"
              placeholder="Найти продукты"
              // value={searchTerm}
              // onChangeText={handleSearchTerm}
            />
          </View>
        </View>

        <TouchableOpacity
          className={`w-12 h-12 right-11 rounded-xl flex items-center justify-center bg-gray-100`}
        >
          <MaterialCommunityIcons name="filter" size={24} color="#7f7f7f" />
        </TouchableOpacity>
      </View>

      {/* Scrollable container start */}

      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <CardCategory />
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

export default Catalog;
