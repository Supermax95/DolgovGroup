// import React from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context'; // Обновленный импорт
// import { PersistGate } from 'redux-persist/integration/react';
// import { Provider } from 'react-redux';
// import { AppNavigator } from './src/navigation/Navigation';
// import { store, persistor } from './src/Redux/store';
// import { StatusBar } from 'react-native';

// // //!!!!Для сброса состояния не удалять
// // persistor
// //   .purge()
// //   .then(() => {
// //     console.log('Состояние успешно сброшено');
// //   })
// //   .catch((error) => {
// //     console.error('Ошибка сброса состояния:', error);
// //   });

// export default function App() {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <SafeAreaView style={{ flex: 1 }}>
//           <AppNavigator />
//         <StatusBar backgroundColor="#FFFF" barStyle="dark-content" />
//         </SafeAreaView>
//       </PersistGate>
//     </Provider>
//   );
// }

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { AppNavigator } from './src/navigation/Navigation';
import { store, persistor } from './src/Redux/store';
import { StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// //!!!!Для сброса состояния не удалять
// persistor
//   .purge()
//   .then(() => {
//     console.log('Состояние успешно сброшено');
//   })
//   .catch((error) => {
//     console.error('Ошибка сброса состояния:', error);
//   });

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LinearGradient
          colors={['#FAF9F9', '#FAFAFA', '#EBEBEB']}
          className="flex-1"
        >
          <SafeAreaView style={{ flex: 1 }}>
            <AppNavigator />
            <StatusBar
              backgroundColor="white"
              translucent
              barStyle="dark-content"
            />
          </SafeAreaView>
        </LinearGradient>
      </PersistGate>
    </Provider>
  );
}
