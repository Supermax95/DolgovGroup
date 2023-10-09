import { View } from 'react-native';
import React, { FC } from 'react';

// interface IPadding {
//   style?: any;
// }

const Padding: FC<{ children: any; style?: any }> = ({
  children,
  style = {},
}) => {
  return <View className={`px-2 ${style}`}>{children}</View>;
};

export default Padding;
