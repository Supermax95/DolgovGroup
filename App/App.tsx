import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { AppNavigator } from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView className="flex-1">
        <AppNavigator />
        <StatusBar style="auto" />
      </SafeAreaView>
    </NavigationContainer>
  );
}
