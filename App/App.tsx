import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { AppNavigator } from './src/navigation/Navigation';
import { store, persistor } from './src/Redux/store';
// //!!!!Для сброса состояния не удалять 
persistor.purge()
  .then(() => {
    console.log('Состояние успешно сброшено');
  })
  .catch((error) => {
    console.error('Ошибка сброса состояния:', error);
  });

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <SafeAreaView style={{ flex: 1 }}> */}
        <AppNavigator />
        {/* </SafeAreaView> */}
        <StatusBar style="auto" />
      </PersistGate>
    </Provider>
  );
}
