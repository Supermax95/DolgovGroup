// import { View, Text, Pressable } from 'react-native';
// import React, { FC } from 'react';
// import Padding from 'ui/Padding';

// interface IFieldEditProfile {
//   onPress?: () => void;
//   title: string;
//   lastName: object;
//   firstName: object;
//   middleName: object;
//   birthDate: object;
//   email: object;
//   fieldСhange: string;
//   isLast?: boolean;
// }

// const FieldEditProfile: FC<IFieldEditProfile> = ({
//   onPress,
//   title,
//   lastName,
//   firstName,
//   middleName,
//   birthDate,
//   email,
//   fieldСhange,
// }) => {
//   return (
//     <Padding>
//       <Pressable
//         onPress={onPress}
//         className={`py-4 flex-row border-b-[1px] border-zinc-200 justify-between`}
//       >
//         <View>
//           <Text>{title}</Text>
//         </View>
//         <View>
//           <Text className="text-zinc-500">
//             {lastName} {firstName} {middleName}
//           </Text>
//         </View>
//       </Pressable>
//     </Padding>
//   );
// };

// export default FieldEditProfile;
