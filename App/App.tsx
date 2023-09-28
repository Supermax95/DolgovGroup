import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LogoHello from './src/components/Start/LogoHello'; 
import LoginPage from './src/components/Start/LoginPage';
import React, { useEffect, useState } from 'react';


export default function App() {
  const [isLoading, setIsLoading] = useState(true); 
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  useEffect(() => {

    
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
    }, 3000); 
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? ( 
        <LoadingIndicator />
      ) : isAuthenticated ? ( 
        <LogoHello />
      ) : ( 
        <LoginPage />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    {/* Здесь можно добавить индикатор загрузки */}
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});