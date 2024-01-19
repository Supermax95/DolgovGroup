import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import { AppNavigator } from './src/navigation/Navigation';

export default function App() {
  
  return (
    <Provider store={store}>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <AppNavigator />
      {/* </SafeAreaView> */}
      <StatusBar style="auto" />
    </Provider>
  );
}
