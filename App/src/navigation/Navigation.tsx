import { FC, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Registration } from '../components/Registration/Registration';
import SignIn from 'components/SignIn/SignIn';
import Home from 'screens/Home/Home';
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
import ChangeFullName from 'components/UserProfile/EditProfile/ChangeFullName/ChangeFullName';
import ChangeBirthDate from 'components/UserProfile/EditProfile/ChangeBirthDate/ChangeBirthDate';
import ChangeEmail from 'components/UserProfile/EditProfile/ChangeEmail/ChangeEmail';
import ChangePassword from 'components/UserProfile/EditProfile/ChangePassword/ChangePassword';
import { RootStackParamList, TabNavigatorOptions } from './types';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import getCheck from 'Redux/thunks/User/check.api';
import ProductsCards from 'components/Catalog/ProductsCards/ProductsCards';
import SubcategoryDetail from 'components/Catalog/SubcategoryDetail/SubcategoryDetail';
import SingleProduct from 'components/Catalog/ProductsCards/SingleProduct/SingleProduct';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';
import getProfileInfo from 'Redux/thunks/Profile/profileInfo.api';
import SingleLaw from 'components/UserProfile/AboutApplication/SingleLaw';
import PromoOneDetail from 'components/Promotion/PromoOneDetail';
import ShopsList from 'components/ShopsDetail/ShopsList';
import MarketMap from 'components/ShopsDetail/MarketMap';
import SupportMessage from 'components/SupportDetail/SupportMessage/SupportMessage';
import QuestionAndAnswer from 'components/SupportDetail/PopularQuestions/QuestionAndAnswer';
import SearchProduct from 'components/Catalog/ProductsCards/SearchProduct/SearchProduct';
import ChangePhoneNumber from 'components/UserProfile/EditProfile/ChangePhoneNumber/ChangePhoneNumber';
import { ResetPassword } from 'components/SignIn/ResetPassword/ResetPassword';
import { setupInterceptors } from 'Redux/thunks/Logout401/axios.api';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabNavigatorOptions>();

const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Вам нужно разрешить отправку уведомлений');
    return false;
  }
  return true;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function sendPushNotification() {
  const permissionGranted = await requestNotificationPermission();

  if (permissionGranted) {
    const message = {
      sound: 'default',
      title: 'Уважаемый покупатель!',
      body: 'Вы давно не заходили в приложение.Не пропустите акции! ',
      data: { someData: '' },
      vibrate: [0, 250, 250, 250],
      // attachments: [
      //   {
      //     identifier: 'attachment-identifier',
      //     asset: require('../assets/images/adaptive-icon.png'),
      //     type: '.png',
      //   },
      // ],
    };
    await Notifications.cancelAllScheduledNotificationsAsync();
    // ../src/assets/images/adaptive-icon.png
    await Notifications.scheduleNotificationAsync({
      content: message,
      trigger: { seconds: 86400, repeats: false },
    });
  }
}

export const AppNavigator: FC = () => {
  const dispatch = useAppDispatch();

  const notificationPush = useAppSelector<boolean>(
    (state) => state.profileSlice.notificationPush
  );

  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );

  // useEffect(() => {
  //   if (token) {
  //     setupInterceptors(token, dispatch);
  //   }
  // }, [token]);

  const [delayedToken, setDelayedToken] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDelayedToken(token);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [token]);

  useEffect(() => {
    if (delayedToken) {
      console.log('Setting up interceptors with token:', delayedToken);
      setupInterceptors(delayedToken, dispatch);
    }
  }, [delayedToken, dispatch]);

  useEffect(() => {
    const performActions = async () => {
      if (delayedToken) {
        try {
          console.log('Fetching profile info with token:', delayedToken);
          await dispatch(getProfileInfo({ token: delayedToken }));

          console.log('Checking user with token:', delayedToken);
          await dispatch(getCheck({ token: delayedToken }));

          if (notificationPush) {
            setTimeout(() => {
              console.log('Sending push notification');
              sendPushNotification();
            }, 2000);
          }
        } catch (error) {
          console.error('Error performing actions:', error);
        }
      } else {
        console.log('Token is not available yet.');
      }
    };

    performActions();
  }, [delayedToken, notificationPush, dispatch]);

  // useEffect(() => {
  //   if (token) {
  //     dispatch(getProfileInfo({ token }));
  //   }

  //   const timeoutId = setTimeout(() => {
  //     if (notificationPush) {
  //       // console.log('======>через 3 дня будет уведомление');
  //       sendPushNotification();
  //     }
  //     // console.log('упало уведомление');
  //   }, 2000);

  //   return () => clearTimeout(timeoutId);
  // }, [notificationPush]);

  // useEffect(() => {
  //   if (token) {
  //     dispatch(getCheck({ token }));
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getCheck({ token }));
  // }, []);

  const user = useAppSelector((state) => state.userSlice.user?.isActivated);

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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AccumulatedUserPoints"
        component={AccumulatedUserPoints}
        options={{ title: 'Накопленные баллы' }}
      />
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AboutApplication"
        component={AboutApplication}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangeFullName"
        component={ChangeFullName}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangeBirthDate"
        component={ChangeBirthDate}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangeEmail"
        component={ChangeEmail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePhoneNumber"
        component={ChangePhoneNumber}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShopsList"
        component={ShopsList}
        options={{ title: 'Список магазинов' }}
      />
      <Stack.Screen
        name="MarketMap"
        component={MarketMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductsCards"
        component={ProductsCards}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SubcategoryDetail"
        component={SubcategoryDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SingleProduct"
        component={SingleProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PromoOneDetail"
        component={PromoOneDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchProduct"
        component={SearchProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SingleLaw"
        component={SingleLaw}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Support"
        component={Support}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SupportMessage"
        component={SupportMessage}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="EmployeeConfirm"
        component={EmployeeConfirm}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="QuestionAndAnswer"
        component={QuestionAndAnswer}
        options={{ headerShown: false }}
      />

      {/* <Stack.Screen
        name="CheckMail"
        component={CheckMail}
        options={{ title: 'Проверка активации' }}
      /> */}
    </>
  );

  const renderNonLoggedInUserScreens = () => (
    <>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AboutApplication"
        component={AboutApplication}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CheckMail"
        component={CheckMail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SingleLaw"
        component={SingleLaw}
        options={{ headerShown: false }}
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
    <Tab.Navigator>
      {/* <Tab.Screen
        name="Auth"
        component={Auth}
        options={{
          title: 'Auth',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      /> */}
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
          headerShown: false,
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
          headerShown: false,
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
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="Support"
        component={Support}
        options={{
          title: 'Служба поддержки',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="chat-question-outline"
              color={color}
              size={25}
            />
          ),
          headerShown: false,
        }}
      /> */}
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
          headerShown: false,
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
