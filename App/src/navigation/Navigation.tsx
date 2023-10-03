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
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AppNavigator: FC = () => {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen name="Auth" component={Auth} options={{ title: 'Вход' }} />

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

      <Stack.Screen name="FooterTabs" component={FooterTabs} />
    </Stack.Navigator>
  );
};

export const FooterTabs: FC = ({}) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Главная',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="credit-card" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Catalog"
        component={Catalog}
        options={{
          title: 'Каталог',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="th-large" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Shops"
        component={Shops}
        options={{
          title: 'Магазины',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="map-marker" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Support"
        component={Support}
        options={{
          title: 'Помощь',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="comments" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
