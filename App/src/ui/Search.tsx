// import { View, Pressable, TextInput } from 'react-native';
// import React from 'react';
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// const Search = () => {
//   return (
//     <View
//       className={`bg-purple-100 py-4 flex-row items-center justify-between px-4 w-full`}
//     >
//       <View className={`flex-row items-center mr-12`}>
//         <View
//           className={`px-4 py-2 bg-gray-100  rounded-xl flex-row items-center justify-center mr-2`}
//         >
//           <MaterialCommunityIcons name="magnify" size={23} color="#7f7f7f" />
//           <TextInput
//             className={`text-md font-normal flex-1 px-2 py-1`}
//             placeholderTextColor="#555"
//             placeholder="Найти продукты"
//             // value={searchTerm}
//             // onChangeText={handleSearchTerm}
//           />
//         </View>
//       </View>

//       <Pressable
//         className={`w-12 h-12 right-11 rounded-xl flex items-center justify-center bg-gray-100`}
//       >
//         <MaterialCommunityIcons name="filter" size={24} color="#7f7f7f" />
//       </Pressable>
//     </View>
//   );
// };

// export default Search;

import { View, Pressable, TextInput, Modal, Button, Text } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { isPast, isToday, parseISO } from 'date-fns';
import { useAppSelector } from 'Redux/hooks';

export interface IProduct {
  id: number;
  article: string;
  productName: string;
  promoStartDate: string;
  promoEndDate: string;
  originalPrice: number;
  customerPrice: number;
  employeePrice: number;
  isNew: boolean;
  isDiscounted: boolean;
  description: string;
  photo: string;
  subcategoryId: number;
  invisible: boolean;
}

const Search = () =>
  // { route }: any
  {
    // const { products } = route.params;
    const [searchText, setSearchText] = useState('');
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showDiscounted, setShowDiscounted] = useState(false);
    const [withoutIsDiscounted, setWithoutIsDiscounted] = useState(false);

    const products = useAppSelector<IProduct>(
      (state) => state.productSlice.data
    );
    const applyFilters = () => {
      let filtered = products;
      console.log(filtered);
      

      if (showNew) {
        filtered = filtered.filter((product) => product.isNew === true);
      }

      if (showDiscounted) {
        filtered = filtered.filter((product) => product.isDiscounted === true);
      }

      if (withoutIsDiscounted) {
        filtered = filtered.filter((product) => product.isDiscounted === false);
      }

      if (searchText !== '') {
        filtered = filtered.filter((product) => {
          const productFields = [
            String(product.productName),
            String(product.promoStartDate),
            String(product.promoEndDate),
            String(product.article),
          ];

          const searchTerms = searchText.toLowerCase().split(' ');

          const isPromoEnded =
            product.promoEndDate &&
            isPast(parseISO(product.promoEndDate)) &&
            !isToday(parseISO(product.promoEndDate));

          return (
            searchTerms.every((term) =>
              productFields.some((field) => field.toLowerCase().includes(term))
            ) ||
            (isPromoEnded && searchText.toLowerCase().includes('завершена'))
          );
        });
      }

      console.log('Отфильтрованные продукты:', filtered);
    };

    const clearFilters = () => {
      setSearchText('');
      setShowNew(false);
      setShowDiscounted(false);
      setWithoutIsDiscounted(false);
    };

    return (
      <View
        style={{
          backgroundColor: '#F8D3D3',
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#D1D5DB',
              borderRadius: 10,
              padding: 5,
            }}
          >
            <MaterialCommunityIcons name="magnify" size={23} color="#7f7f7f" />
            <TextInput
              style={{ fontSize: 16, marginLeft: 5 }}
              placeholderTextColor="#555"
              placeholder="Найти продукты"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>
        </View>

        <Pressable
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#D1D5DB',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setFilterModalVisible(true)}
        >
          <MaterialCommunityIcons name="filter" size={24} color="#7f7f7f" />
        </Pressable>

        <Modal
          visible={isFilterModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <View
              style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                width: 300,
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10 }}>Фильтры</Text>
              <Button
                title="Применить"
                onPress={() => {
                  applyFilters();
                  setFilterModalVisible(false);
                }}
              />
              <Button
                title="Сбросить"
                onPress={() => {
                  clearFilters();
                  setFilterModalVisible(false);
                }}
              />
              <Button
                title="Отмена"
                onPress={() => setFilterModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  };
export default Search;
