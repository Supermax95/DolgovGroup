import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { AppNavigator } from './src/navigation/Navigation';
import { store, persistor } from './src/Redux/store';
import { StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import registerNNPushToken from 'native-notify';


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

  
  registerNNPushToken(20294, 'GdT8ZAf6ZMwPPqd1E5x5DU');
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
