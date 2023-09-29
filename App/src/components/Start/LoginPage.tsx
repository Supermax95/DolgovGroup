import React, { useEffect, useState } from 'react';
import { View, Button, Image, Text } from 'react-native';

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
      <View className="flex-1 items-center justify-center bg-white">
        <Image
          source={{
            uri: 'https://poisk-firm.ru/storage/employer/logo/70/ba/a9/abb46e24b581abb40de2b12ed1.jpg',
          }}
          className="h-[200px] w-[200px]"
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="flex-1 items-center justify-center">
        <Button title="Войти" onPress={handleLoginClick} />
        <Button title="Зарегистрироваться" onPress={handleRegisterClick} />
      </View>
    </View>
  );
};
