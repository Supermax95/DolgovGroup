// import { View } from 'react-native';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import React, { FC } from 'react';

// import { TypeRootStackParamList } from '../../navigation/types';
// import NavItem from './NavItem';

// export interface IFooterItem {
//   iconName: keyof typeof FontAwesome.glyphMap;
//   title: keyof TypeRootStackParamList | string;
// }

// export const menu: IFooterItem[] = [
//   {
//     iconName: 'credit-card',
//     //  title: 'Главная',
//     title: 'Home',
//   },
//   {
//     iconName: 'th-large',
//     //  title: 'Каталог',
//     title: 'Catalog',
//   },
//   {
//     iconName: 'map-marker',
//     // title: 'Магазины',
//     title: 'Shops',
//   },
//   {
//     iconName: 'comments',
//     //title: 'Помощь',
//     title: 'Support',
//   },
//   {
//     iconName: 'user',
//     // title: 'Профиль',
//     title: 'Profile',
//   },
// ];

// interface IFooter {
//   navigate: (screenName: keyof TypeRootStackParamList) => void;
// }

// const Footer: FC<IFooter> = ({}) => {
//   return (
//     <View
//       className={`p-4 flex-row justify-between items-center w-full bg-gray-10 px-0 pb-4 pt-2 border-t-2  border-neutral-100 border-x-1`}
//     >
//       {/* <Text>Footer</Text> */}
//       {menu.map((item) => (
//         <NavItem key={item.title} item={item} navigate={navigate} />
//       ))}
//     </View>
//   );
// };

// const Footer: FC = ({}) => {
//   return (
//     <View
//       className={`p-4 flex-row justify-between items-center w-full bg-gray-10 px-0 pb-4 pt-2 border-t-2  border-neutral-100 border-x-1`}
//     ></View>
//   );
// };

// export default Footer;
