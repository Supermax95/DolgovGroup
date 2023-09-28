import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const LoginPage = () => {
  const handleLoginClick = () => {
    alert('Вы вошли в систему!');
  };

  const handleRegisterClick = () => {
    alert('Вы зарегистрировались!');
  };

  return (
    <View style={styles.container}>
      <Button title="Войти" onPress={handleLoginClick} />
      <Button title="Зарегистрироваться" onPress={handleRegisterClick} />
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

export default LoginPage;
