import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export const Registration = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [passwordError, setPasswordError] = useState(''); 
  const [emailError, setEmailError] = useState('');

  const handleFirstNameChange = (text) => {
    setFirstName(text);
  };

  const handleLastNameChange = (text) => {
    setLastName(text);
  };

  const handleMiddleNameChange = (text) => {
    setMiddleName(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(text)) {
      setEmailError('Введите корректный email');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text.length < 6) {
      setPasswordError('Пароль должен быть длиннее 6 символов');
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordCheck = (text) => {
    setPasswordCheck(text);
  };

  const handleBirthdateChange = (text) => {
    setBirthdate(text);
  };

  const handleSubmit = () => {
    if (password !== passwordCheck) {
      console.log('Пароли не совпадают');
      return;
    }

    if (password.length < 6) {
      console.log('Пароль слишком короткий');
      return;
    }

    console.log('Имя:', firstName);
    console.log('Фамилия:', lastName);
    console.log('Отчество:', middleName);
    console.log('Email:', email);
    console.log('Пароль:', password);
    console.log('Проверка пароля:', passwordCheck);
    console.log('День рождения', birthdate);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Имя"
        onChangeText={handleFirstNameChange}
        value={firstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Фамилия"
        onChangeText={handleLastNameChange}
        value={lastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Отчество"
        onChangeText={handleMiddleNameChange}
        value={middleName}
      />
  <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={handleEmailChange}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? (
        <Text style={styles.error}>{emailError}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry
        autoCapitalize="none"
      />
      {passwordError ? (
        <Text style={styles.error}>{passwordError}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Подтвердите пароль"
        onChangeText={handlePasswordCheck}
        value={passwordCheck}
        secureTextEntry
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="День рождения"
        onChangeText={handleBirthdateChange}
        value={birthdate}
        keyboardType="email-address"
      />

      <Button title="Отправить" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
  },
});
