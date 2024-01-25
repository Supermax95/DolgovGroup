import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { AppNavigator } from './src/navigation/Navigation';
import { store, persistor } from './src/Redux/store';
import * as Notifications from 'expo-notifications';

// //!!!!Для сброса состояния не удалять
// persistor
//   .purge()
//   .then(() => {
//     console.log('Состояние успешно сброшено');
//   })
//   .catch((error) => {
//     console.error('Ошибка сброса состояния:', error);
//   });

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
      title: 'Вы давно к нам не заходили',
      body: 'Ждем вас в нашем приложении',
      data: { someData: '' },
      vibrate: [0, 250, 250, 250],
    };

    await Notifications.scheduleNotificationAsync({
      content: message,
      trigger: { seconds: 5, repeats: false },
    });
  }
}

export default function App() {
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     console.log('=====>');
  //     sendPushNotification();
  //   }, 100000);
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
        <StatusBar style="auto" />
      </PersistGate>
    </Provider>
  );
}

// import React, { useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaView } from 'react-native';
// import { PersistGate } from 'redux-persist/integration/react';
// import { Provider } from 'react-redux';
// import { AppNavigator } from './src/navigation/Navigation';
// import { store, persistor } from './src/Redux/store';
// import * as Notifications from 'expo-notifications';

// // //!!!!Для сброса состояния не удалять
// persistor
//   .purge()
//   .then(() => {
//     console.log('Состояние успешно сброшено');
//   })
//   .catch((error) => {
//     console.error('Ошибка сброса состояния:', error);
//   });

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

// async function sendPushNotification() {
//   const message = {
//     sound: 'default',
//     title: 'Заходи в приложение!',
//     body: 'Не пропусти акции',
//     data: { someData: 'goes here' },
//     vibrate: [0, 250, 250, 250],
//   };

//   await Notifications.scheduleNotificationAsync({
//     content: message,
//     trigger: { minute: 1, repeats: true },
//   });
// }

// export default function App() {
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       sendPushNotification();
//     }, 60000); // 60000 миллисекунд = 1 минута

//     return () => {
//       // Очистка интервала при размонтировании компонента
//       clearInterval(intervalId);
//     };
//   }, []);

//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <AppNavigator />
//         <StatusBar style="auto" />
//       </PersistGate>
//     </Provider>
//   );
// }
