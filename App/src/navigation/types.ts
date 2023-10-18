import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  FooterTabs: undefined;
  Registration: undefined;
  SignIn: undefined;
  EditProfile: undefined;
  AccumulatedUserPoints: undefined;
  NotificationSettings: undefined;
  AboutApplication: undefined;
  CheckMail: undefined;
  ResetPassword: undefined;
  ChangeFullName: undefined;
  ChangeBirthDate: undefined;
  ChangeEmail: undefined;
  ChangePassword: undefined;
  ShopsList: undefined;
};

type IMaterialCommunityIcons = keyof typeof MaterialCommunityIcons.glyphMap;

type TabNavigatorOptions = {
  Auth: undefined;
  Home: undefined;
  Catalog: undefined;
  Shops: undefined;
  Support: undefined;
  Profile: undefined;
};

type StackNavigationProp = NativeStackNavigationProp<RootStackParamList>; // только навигации, не для TAB
//* ссылка на типизацию StackNavigationProp https://stackoverflow.com/questions/73328944/react-navigation-navigation-navigatesomescreen-error-in-typescript

type TabScreenNavigationProp = BottomTabNavigationProp<TabNavigatorOptions>;

export type {
  RootStackParamList,
  IMaterialCommunityIcons,
  TabNavigatorOptions,
  StackNavigationProp,
  TabScreenNavigationProp,
};
