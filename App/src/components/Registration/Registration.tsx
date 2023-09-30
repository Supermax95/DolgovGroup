// import Calendar from './Calendar';
import React, { FC, useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import Field from 'ui/Field';
import Calendar from './Calendar';

interface IData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthdate: string;
}

export const Registration: FC = () => {
  const [data, setData] = useState<IData>({} as IData);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const handleFieldChange = (field: keyof IData, value: string) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = () => {
    setEmailError('');
    setPasswordError('');

    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.password ||
      !passwordCheck ||
      !data.birthdate
    ) {
      console.log('Заполните все поля');
      return;
    }

    if (data.password !== passwordCheck) {
      setPasswordError('Пароли не совпадают');
      return;
    }

    if (data.password.length < 6) {
      setPasswordError('Пароль слишком короткий');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(data.email)) {
      setEmailError('Введите корректный email');
      return;
    }

    console.log('Имя:', data.firstName);
    console.log('Фамилия:', data.lastName);
    console.log('Отчество:', data.middleName);
    console.log('Email:', data.email);
    console.log('Пароль:', data.password);
    console.log('Проверка пароля:', passwordCheck);
    console.log('День рождения', data.birthdate);

    setAllFieldsFilled(true);
  };

  return (
    <View style={styles.container}>
      <Field
        value={data.firstName}
        placeholder="Имя"
        onChange={(value) => handleFieldChange('firstName', value)}
        autoCapitalize="words"
      />
      <Field
        value={data.lastName}
        placeholder="Фамилия"
        onChange={(value) => handleFieldChange('lastName', value)}
        autoCapitalize="words"
      />
      <Field
        value={data.middleName}
        placeholder="Отчество"
        onChange={(value) => handleFieldChange('middleName', value)}
        autoCapitalize="words"
      />
      <Field
        value={data.email}
        placeholder="Email"
        onChange={(value) => handleFieldChange('email', value)}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
      <Field
        value={data.password}
        placeholder="Пароль"
        onChange={(value) => handleFieldChange('password', value)}
        isSecure={true}
        autoCapitalize="none"
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      <Field
        value={passwordCheck}
        placeholder="Подтвердите пароль"
        onChange={(value) => setPasswordCheck(value)}
        isSecure={true}
        autoCapitalize="none"
      />
      {/* <Field
        value={data.birthdate}
        placeholder="День рождения"
        onChange={(value) => handleFieldChange('birthdate', value)}
        keyboardType="numeric"
      /> */}
      <Calendar
        onDateChange={(selectedDate) =>
          handleFieldChange('birthdate', selectedDate)
        }
      />
      <Field
        value={data.birthdate ? data.birthdate.toLocaleDateString() : ''}
        placeholder="День рождения"
        keyboardType="numeric"
      />

      <Button title="Зарегистрироваться" onPress={handleSubmit} />
      {allFieldsFilled && (
        <Text style={styles.success}>Вы зарегистрированы</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  error: {
    color: 'red',
  },
  success: {
    color: 'green',
    marginTop: 10,
  },
});
