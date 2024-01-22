import { FC, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Registration } from '../components/Registration/Registration';
import SignIn from 'components/SignIn/SignIn';
import Home from 'screens/Home/Home';
import { Auth } from 'screens/Auth/Auth';
import Catalog from 'screens/Catalog/Catalog';
import Shops from 'screens/Shops/Shops';
import Support from 'screens/Support/Support';
import Profile from 'screens/Profile/Profile';
import { NavigationContainer } from '@react-navigation/native';
import CheckMail from 'components/Registration/CheckMail';
import EditProfile from 'components/UserProfile/EditProfile/EditProfile';
import AccumulatedUserPoints from 'components/UserProfile/AccumulatedUserPoints/AccumulatedUserPoints';
import NotificationSettings from 'components/UserProfile/NotificationSettings/NotificationSettings';
import AboutApplication from 'components/UserProfile/AboutApplication/AboutApplication';
import { ResetPassword } from 'components/SignIn/ResetPassword';
import ChangeFullName from 'components/UserProfile/EditProfile/ChangeFullName/ChangeFullName';
import ShopsList from 'screens/Shops/ShopsList';
import ChangeBirthDate from 'components/UserProfile/EditProfile/ChangeBirthDate/ChangeBirthDate';
import ChangeEmail from 'components/UserProfile/EditProfile/ChangeEmail/ChangeEmail';
import ChangePassword from 'components/UserProfile/EditProfile/ChangePassword/ChangePassword';
import { RootStackParamList, TabNavigatorOptions } from './types';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import getCheck from 'Redux/thunks/User/check.api';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabNavigatorOptions>();

export const AppNavigator: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );
  useEffect(() => {
    dispatch(getCheck({ token }));
  }, [dispatch]);

  const user = useAppSelector((state) => state.userSlice.user.id);
  console.log('🚀 ~ user:', user);

  const renderLoggedInUserScreens = () => (
    <>
      <Stack.Screen
        name="FooterTabs"
        component={FooterTabs}
        options={{ headerShown: false }}
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
        name="ChangeFullName"
        component={ChangeFullName}
        options={{ title: 'Изменение профиля' }}
      />
      <Stack.Screen
        name="ChangeBirthDate"
        component={ChangeBirthDate}
        options={{ title: 'Изменение профиля' }}
      />
      <Stack.Screen
        name="ChangeEmail"
        component={ChangeEmail}
        options={{ title: 'Изменение профиля' }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ title: 'Изменение профиля' }}
      />
      <Stack.Screen
        name="ShopsList"
        component={ShopsList}
        options={{ title: 'Список магазинов' }}
      />
      <Stack.Screen
        name="CheckMail"
        component={CheckMail}
        options={{ title: 'Проверка активации' }}
      />
    </>
  );

  const renderNonLoggedInUserScreens = () => (
    <>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: 'Вход' }}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{ title: 'Регистрация' }}
      />
      <Stack.Screen
        name="AboutApplication"
        component={AboutApplication}
        options={{ title: 'О приложении' }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ title: 'Сброс пароля' }}
      />
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'FooterTabs' : 'SignIn'}>
        {user ? renderLoggedInUserScreens() : renderNonLoggedInUserScreens()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const FooterTabs: FC = () => {
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
          title: 'Магазины поблизости',
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

//////export const FooterTabs: FC = () => {

//   const dispatch = useAppDispatch();
//   const token = useAppSelector<string | undefined>(
//     (state) => state.userSlice.token?.refreshToken
//   );
//   useEffect(() => {
//     dispatch(getCheck({ token }));
//   }, [dispatch]);

//   const user = useAppSelector((state) => state.userSlice.user.id);

//   const renderTabs = () => {
//     if (user) {
//       return (
//         <>
//           <Tab.Screen
//             name="Home"
//             component={Home}
//             options={{
//               title: 'Главная',
//               tabBarIcon: ({ color, size }) => (
//                 <MaterialCommunityIcons
//                   name="credit-card-outline"
//                   color={color}
//                   size={27}
//                 />
//               ),
//             }}
//           />
//           <Tab.Screen
//             name="Catalog"
//             component={Catalog}
//             options={{
//               title: 'Каталог',
//               tabBarIcon: ({ color, size }) => (
//                 <MaterialCommunityIcons
//                   name="text-box-search-outline"
//                   color={color}
//                   size={25}
//                 />
//               ),
//             }}
//           />
//           <Tab.Screen
//             name="Shops"
//             component={Shops}
//             options={{
//               title: 'Магазины поблизости',
//               tabBarIcon: ({ color, size }) => (
//                 <MaterialCommunityIcons
//                   name="map-marker-outline"
//                   color={color}
//                   size={25}
//                 />
//               ),
//             }}
//           />
//           <Tab.Screen
//             name="Support"
//             component={Support}
//             options={{
//               title: 'Помощь',
//               tabBarIcon: ({ color, size }) => (
//                 <MaterialCommunityIcons
//                   name="chat-question-outline"
//                   color={color}
//                   size={25}
//                 />
//               ),
//             }}
//           />
//           <Tab.Screen
//             name="Profile"
//             component={Profile}
//             options={{
//               title: 'Профиль',
//               tabBarIcon: ({ color, size }) => (
//                 <MaterialCommunityIcons
//                   name="account-outline"
//                   color={color}
//                   size={25}
//                 />
//               ),
//             }}
//           />
//         </>
//       );
//     } else {
//       return (
//         <Tab.Screen
//           name="Auth"
//           component={Auth}
//           options={{
//             title: 'Auth',
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons
//                 name="account"
//                 color={color}
//                 size={size}
//               />
//             ),
//           }}
//         />
//       );
//     }
//   };

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarStyle: {
//           height: 55,
//           paddingTop: 5,
//           paddingBottom: 10,
//         },
//       }}
//     >
//       {renderTabs()}
//     </Tab.Navigator>
//   );
// };
