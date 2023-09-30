import React, { useEffect, useState } from 'react';
import { View, Button, Image } from 'react-native';
import Loading from '../Loading/Loading';

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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View className="flex-1 items-center justify-center bg-white">
          <View className="flex-1 items-center justify-center">
            <Button title="Войти" onPress={handleLoginClick} />
            <Button title="Зарегистрироваться" onPress={handleRegisterClick} />
          </View>
        </View>
      )}
    </>
  );
};
