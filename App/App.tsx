import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LogoHello from './components/LogoHello'; 

export default function App() {
  return (
    <View style={styles.container}>
      <LogoHello /> 
      <StatusBar style="auto" /> 
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
