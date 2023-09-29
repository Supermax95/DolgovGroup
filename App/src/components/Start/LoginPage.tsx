import React, { useEffect, useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  Image,
  Text,
} from 'react-native';
// import styled from 'styled-components/native';

// const PostView = styled.View`
//   flex: 1;
//   alignItems: center;
//   justifyContent: center;
//   background-color: white;
// `;

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const handleLoginClick = () => {
    alert('Вы вошли в систему!');
  };

  const handleRegisterClick = () => {
    alert('Вы зарегистрировались!');
  };

  // if (isLoading) {
  //   return (
  //     <View>
  //       <ActivityIndicator size="large" color="green" />
  //     </View>
  //   );
  // }

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <Image
          source={{
            uri: 'https://poisk-firm.ru/storage/employer/logo/70/ba/a9/abb46e24b581abb40de2b12ed1.jpg',
          }}
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <View style={styles.container}>
        <Button title="Войти" onPress={handleLoginClick} />
        <Button title="Зарегистрироваться" onPress={handleRegisterClick} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
