// import { View, Text, Pressable, Platform } from 'react-native';
// import React, { FC } from 'react';
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// interface IUniversalHeader {
//   onPress: () => void;
//   title: string;
//   onPressSearch: () => void;
// }

// const UniversalHeader: FC<IUniversalHeader> = ({
//   onPress,
//   title,
//   onPressSearch,
// }) => {
//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingVertical: 2,
//         paddingHorizontal: 4,
//         marginTop: Platform.OS === 'android' ? 26 : 0, // Добавляем mt-6 только на Android
//         width: '100%',
//       }}
//     >
//       <Pressable onPress={onPress}>
//         <View className="w-7">
//           <MaterialCommunityIcons
//             name="chevron-left"
//             size={36}
//             color="#71716F"
//           />
//         </View>
//       </Pressable>
//       <View className="px-5 flex flex-row justify-start">
//         <Text className="text-lg font-bold text-slate-800">{title}</Text>
//       </View>
//       <Pressable onPress={onPressSearch}>
//         <View className="w-10">
//           <MaterialCommunityIcons name="magnify" size={26} color="#71716F" />
//         </View>
//       </Pressable>
//     </View>
//   );
// };

// export default UniversalHeader;

import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import React, { FC } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface IUniversalHeader {
  onPress?: () => void | undefined;
  title?: string | undefined;
  onPressSearch?: () => void | undefined;
}

const UniversalHeader: FC<IUniversalHeader> = ({
  onPress,
  title,
  onPressSearch,
}) => {
  return (
    <>
      {onPress && title && onPressSearch ? (
        <View style={styles.container}>
          <Pressable onPress={onPress} style={styles.chevronContainer}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={36}
              color="#71716F"
            />
          </Pressable>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
          <Pressable onPress={onPressSearch} style={styles.searchContainer}>
            <MaterialCommunityIcons name="magnify" size={26} color="#71716F" />
          </Pressable>
        </View>
      ) : onPress && title ? (
        <View style={styles.container}>
          <Pressable onPress={onPress} style={styles.chevronContainer}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={36}
              color="#71716F"
            />
          </Pressable>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
          <Pressable onPress={onPressSearch} style={styles.searchContainer}>
            <View className="w-10"></View>
          </Pressable>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
    paddingHorizontal: 4,
    width: '100%',
    height: 55,
  },
  chevronContainer: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    padding: 8,
  },
});

export default UniversalHeader;
