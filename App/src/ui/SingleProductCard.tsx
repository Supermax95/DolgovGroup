import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { FC } from 'react';

interface ISingleProductCard {
  article: string;
  productName: string;
  image: string;
  description?: object | null;
}

const SingleProductCard: FC<ISingleProductCard> = ({
  article,
  productName,
  image,
  description,
}) => {
  const screenHeight = Math.round(Dimensions.get('window').height);

  return (
    <>
      <SafeAreaView className={`w-full`}>
        {/* Image Section */}

        <View
          style={[{ height: screenHeight / 2 }]}
          className="w-full flex items-center justify-center relative"
        >
          <View
            className={`w-full h-full absolute top-0 left-0 flex items-center justify-center`}
          >
            <Image
              source={{ uri: image }}
              //   source={require('../assets/Trio.webp')}
              resizeMode="contain"
              className={`w-80 h-80`}
            />
          </View>
        </View>
      </SafeAreaView>

      <View
        className={`w-full flex-1 h-full bg-white rounded-t-3xl px-6 mr-4  bg-slate-200`}
      >
        <View className={`flex-row items-center justify-between w-full`}>
          <View className={`flex items-start justify-start w-full`}>
            <View className={`flex items-end w-full`}>
              <Text className={`text-md font-normal text-gray-500`}>
                {article}
              </Text>
            </View>
            <Text className={`text-lg font-semibold text-gray-500`}>
              {productName}
            </Text>
            <Text className={`text-xs text-gray-500`}>{description}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default SingleProductCard;
