import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

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
  Auth: {
    title: string;
    tabBarIcon: IMaterialCommunityIcons;
  };
  Home: {
    title: string;
    tabBarIcon: IMaterialCommunityIcons;
  };
  Catalog: {
    title: string;
    tabBarIcon: IMaterialCommunityIcons;
  };
  Shops: {
    title: string;
    tabBarIcon: IMaterialCommunityIcons;
  };
  Support: {
    title: string;
    tabBarIcon: IMaterialCommunityIcons;
  };
  Profile: {
    title: string;
    tabBarIcon: IMaterialCommunityIcons;
  };
};

//* новая типизация  const tabProps: TabProps[]
type TabProps = {
  name: keyof TabNavigatorOptions;
  component: React.ComponentType<any>;
  options: BottomTabNavigationOptions;
};

export type {
  RootStackParamList,
  IMaterialCommunityIcons,
  TabNavigatorOptions,
  TabProps,
};
