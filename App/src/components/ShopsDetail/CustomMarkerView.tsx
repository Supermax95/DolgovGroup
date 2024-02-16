import React, { FC, ReactNode } from "react";
import { View, StyleProp, ViewStyle } from "react-native";

interface CustomMarkerViewProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const CustomMarkerView: FC<CustomMarkerViewProps> = ({ children, style }) => (
  <View style={[{ alignItems: 'center' }, style]}>
    {children}
  </View>
);

export default CustomMarkerView;
