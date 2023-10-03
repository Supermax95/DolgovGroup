// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaView } from 'react-native';
// import { AppNavigator } from './src/navigation/Navigation';
// import { NavigationContainer } from '@react-navigation/native';
// import { Provider } from 'react-redux';
// import store from '../App/src/Redux/store';
// export default function App() {
//   return (
//     <NavigationContainer>
//       <SafeAreaView className="flex-1">
//         <AppNavigator />
//         <StatusBar style="auto" />
//       </SafeAreaView>
//     </NavigationContainer>
//   );
// }

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import { AppNavigator } from './src/navigation/Navigation';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <AppNavigator />
        </SafeAreaView>
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}
