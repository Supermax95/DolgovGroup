// import { View, Text, Pressable } from 'react-native';
// import React, { FC } from 'react';
// import { IFooterItem } from './Footer';

// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { TypeRootStackParamList } from 'navigation/types';

// interface INavItem {
//   item: IFooterItem;
//   navigate: (screenName: keyof TypeRootStackParamList) => void;
// }

// const NavItem: FC<INavItem> = ({ item, navigate }) => {
//   const isActive = false;

//   return (
//     <Pressable
//       // onPress={() => navigate(item.title)}
//       className="items-center w-[20%]"
//     >
//       <FontAwesome
//         name={item.iconName}
//         style={{
//           fontSize: 20,
//           color: isActive ? 'blue' : 'gray',
//         }}
//       />
//       <Text
//         className={`text-sm mt-1 ${
//           isActive ? 'text-blue-500' : 'text-gray-500'
//         }`}
//       >
//         {item.title}
//       </Text>
//     </Pressable>
//   );
// };

// export default NavItem;
