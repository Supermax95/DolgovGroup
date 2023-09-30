import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

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
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return null;
};

export default Loading;
