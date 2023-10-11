import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { LogoHello } from '../components/HelloPage/LogoHello';
//import { LoginPage } from '../components/LoginPage/LoginPage';
import { Registration } from '../components/Registration/Registration';
import SignIn from 'components/SignIn/SignIn';
import Home from 'screens/Home/Home';
import { Auth } from 'screens/Auth/Auth';
import Catalog from 'screens/Catalog/Catalog';
import Shops from 'screens/Shops/Shops';
import Support from 'screens/Support/Support';
import Profile from 'screens/Profile/Profile';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import CheckMail from 'components/Registration/CheckMail';
import EditProfile from 'components/UserProfile/EditProfile/EditProfile';
import AccumulatedUserPoints from 'components/UserProfile/AccumulatedUserPoints/AccumulatedUserPoints';
import NotificationSettings from 'components/UserProfile/NotificationSettings/NotificationSettings';
import AboutApplication from 'components/UserProfile/AboutApplication/AboutApplication';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AppNavigator: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FooterTabs">
        <Stack.Screen
          name="FooterTabs"
          component={FooterTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ title: 'Регистрация' }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ title: 'Вход' }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ title: 'Редактирование данных' }}
        />
        <Stack.Screen
          name="AccumulatedUserPoints"
          component={AccumulatedUserPoints}
          options={{ title: 'Накопленные баллы' }}
        />
        <Stack.Screen
          name="NotificationSettings"
          component={NotificationSettings}
          options={{ title: 'Настройка уведомлений' }}
        />
        <Stack.Screen
          name="AboutApplication"
          component={AboutApplication}
          options={{ title: 'О приложении' }}
        />
        <Stack.Screen
          name="CheckMail"
          component={CheckMail}
          options={{ title: 'Проверка активации' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const FooterTabs: FC = ({}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 55,
          paddingTop: 5,
          paddingBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="Auth"
        component={Auth}
        options={{
          title: 'Auth',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Главная',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="credit-card-outline"
              color={color}
              size={27}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Catalog"
        component={Catalog}
        options={{
          title: 'Каталог',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="text-box-search-outline"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Shops"
        component={Shops}
        options={{
          title: 'Магазины',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map-marker-outline"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Support"
        component={Support}
        options={{
          title: 'Помощь',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="chat-question-outline"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
