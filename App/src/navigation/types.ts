import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
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
  SubcategoryDetail: undefined;
  ProductsCards: undefined;
  SingleProduct: undefined;
  PromoDetails: undefined;
  Search: undefined;
  SingleLaw: undefined;
  SupportMessage: undefined;
  Support: undefined;
  EmployeeConfirm:undefined;
};

type IMaterialCommunityIcons = keyof typeof MaterialCommunityIcons.glyphMap;

type TabNavigatorOptions = {
  Auth: undefined;
  Home: undefined;
  Catalog: undefined;
  Shops: undefined;
  Support: undefined;
  Profile: undefined;
  // SignIn:undefined;
};

type StackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type TabScreenNavigationProp = BottomTabNavigationProp<TabNavigatorOptions>;
//* ссылка на типизацию StackNavigationProp https://stackoverflow.com/questions/73328944/react-navigation-navigation-navigatesomescreen-error-in-typescript
//* https://benjaminwoojang.medium.com/react-navigation-with-typescript-270dfa8d5cad

export type {
  RootStackParamList,
  IMaterialCommunityIcons,
  TabNavigatorOptions,
  StackNavigationProp,
  TabScreenNavigationProp,
};
