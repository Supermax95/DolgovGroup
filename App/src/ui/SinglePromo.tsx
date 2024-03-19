import {
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, { FC } from 'react';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_IP } from '@env';
import { isToday, parseISO } from 'date-fns';

interface ISinglePromo {
  title: string;
  description: React.ReactNode;
  image?: string | undefined;
  dateStart: string;
  dateEnd: string;
  carusel: boolean;
}

const screenWidth = Math.round(Dimensions.get('window').width);
const cardWidth = screenWidth - 40;
const cardHeight = 200;

const SinglePromo: FC<ISinglePromo> = ({
  title,
  description,
  image,
  dateStart,
  dateEnd,
  carusel,
}) => {
  const screenHeight = Math.round(Dimensions.get('window').height);

  const reverseDate = (dateString: string): string => {
    if (!dateString) {
      return '';
    }

    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };

  return (
    <>
      {carusel ? (
        <>
          <View
            style={{
              marginLeft: 20,
              marginTop: 44,
            }}
          >
            <View style={styles.card}>
              <View style={styles.imageBox}>
                <Image
                  source={{ uri: `http://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}${image}` }}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            </View>
          </View>

          <View
            className={`w-full flex-1 h-full bg-white rounded-t-3xl px-6 py-2`}
          >
            {dateStart && dateEnd ? (
              isToday(parseISO(dateEnd)) ? (
                <>
                  <View className="flex-row items-center">
                    <Text className="text-base font-normal text-red-600">
                      Последний день акции
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-base font-normal text-slate-600">
                      C {reverseDate(dateStart)} по {reverseDate(dateEnd)}
                    </Text>
                  </View>
                </>
              ) : (
                <View className="flex-row items-center">
                  <Text className="text-base font-normal text-slate-600">
                    C {reverseDate(dateStart)} по {reverseDate(dateEnd)}
                  </Text>
                </View>
              )
            ) : (
              <View className="flex-row items-center">
                <Text className="text-base font-normal text-slate-600">
                  Акция бессрочная
                </Text>
              </View>
            )}

            <View className="mt-2 flex items-start justify-start w-full">
              <Text className="text-lg font-bold text-gray-800">{title}</Text>
            </View>

            <SafeAreaView className="mt-4 flex-col items-center justify-between w-full">
              <View className={`flex items-start justify-start w-full`}>
                {description}
              </View>
            </SafeAreaView>
          </View>
        </>
      ) : (
        <>
          <SafeAreaView className={`w-full`}>
            {/* Image Section */}

            <View
              style={[{ height: screenHeight / 2.5 }]}
              className="w-full flex items-center justify-center relative"
            >
              <View
                className={`w-full h-full absolute top-0 left-0 flex items-center justify-center`}
              >
                <Image
                  source={{ uri: `http://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}${image}` }}
                  resizeMode="contain"
                  className={`w-80 h-80`}
                />
              </View>
            </View>
          </SafeAreaView>

          <View className="w-full flex-1 h-full bg-white rounded-t-3xl px-6 py-2">
            {dateStart && dateEnd ? (
              isToday(parseISO(dateEnd)) ? (
                <>
                  <View className="flex-row items-center">
                    <Text className="text-base font-normal text-red-600">
                      Последний день акции
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-base font-normal text-slate-600">
                      C {reverseDate(dateStart)} по {reverseDate(dateEnd)}
                    </Text>
                  </View>
                </>
              ) : (
                <View className="flex-row items-center">
                  <Text className="text-base font-normal text-slate-600">
                    C {reverseDate(dateStart)} по {reverseDate(dateEnd)}
                  </Text>
                </View>
              )
            ) : (
              <View className="flex-row items-center">
                <Text className="text-base font-normal text-slate-600">
                  Акция бессрочная
                </Text>
              </View>
            )}

            <View className="mt-2 flex items-start justify-start w-full">
              <Text className="text-lg font-bold text-gray-800">{title}</Text>
            </View>

            <SafeAreaView className="mt-4 flex-col items-center justify-between w-full">
              <View className={`flex items-start justify-start w-full pr-4`}>
                {description}
              </View>
            </SafeAreaView>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    height: cardHeight,
    width: cardWidth,
    marginVertical: 10,
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  imageBox: {
    width: cardWidth,
    height: cardHeight,
    overflow: 'hidden',
    borderRadius: 16,
  },
  image: {
    width: cardWidth,
    height: cardHeight,
    resizeMode: 'cover',
  },
});

export default SinglePromo;
