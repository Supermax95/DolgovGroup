// import React, { useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaView } from 'react-native';
// import { PersistGate } from 'redux-persist/integration/react';
// import { Provider } from 'react-redux';
// import { AppNavigator } from './src/navigation/Navigation';
// import { store, persistor } from './src/Redux/store';

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
//         <AppNavigator />
//         <StatusBar style="auto" />
//       </PersistGate>
//     </Provider>
//   );
// }

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'; // Обновленный импорт
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { AppNavigator } from './src/navigation/Navigation';
import { store, persistor } from './src/Redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppNavigator />
          <StatusBar style="auto" />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}