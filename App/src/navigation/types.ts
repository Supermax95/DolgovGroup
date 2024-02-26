import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ISelectedShop } from 'components/ShopsDetail/ShopsList';

type NavigationParams = {
  productId?: number;
  subcategoryId?: number;
  subcategoryName?: string;
  promotionId?: number;
  categoryId?: number;
  categoryName?: string;
  subcategoryIdArray?: number[];
  selectedShop?: ISelectedShop;
  questionId?: number;
  lawId?: number;
};

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
  ChangePhoneNumber: undefined;
  ChangeEmail: undefined;
  ChangePassword: undefined;
  ShopsList: undefined | NavigationParams;
  SubcategoryDetail: undefined | NavigationParams;
  ProductsCards: undefined | NavigationParams;
  SingleProduct: undefined | NavigationParams;
  PromoOneDetail: undefined | NavigationParams;
  SearchProduct: undefined | NavigationParams;
  SingleLaw: undefined | NavigationParams;
  SupportMessage: undefined | NavigationParams;
  Support: undefined | NavigationParams;
  EmployeeConfirm: undefined | NavigationParams;
  MarketMap: undefined | NavigationParams;
  QuestionAndAnswer: undefined | NavigationParams;
};

type IMaterialCommunityIcons = keyof typeof MaterialCommunityIcons.glyphMap;

type TabNavigatorOptions = {
  Auth: undefined;
  Home: undefined;
  Catalog: undefined;
  Shops: undefined | NavigationParams;
  Support: undefined;
  Profile: undefined;
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
