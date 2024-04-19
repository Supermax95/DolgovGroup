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
import Padding from './Padding';

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
      <View
        style={{
          marginLeft: 20,
          marginTop: 44,
        }}
      >
        <View style={styles.card}>
          <View style={styles.imageBox}>
            <Image
              source={{
                uri: `https://${EXPO_PUBLIC_IP}:${EXPO_PUBLIC_PORT}${image}`,
              }}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
        </View>
      </View>
      <Padding>
        <Padding>
          <View className="px-1">
            {dateStart && dateEnd ? (
              isToday(parseISO(dateEnd)) ? (
                <>
                  <View className="flex-row items-center mt-2">
                    <Text className="text-md font-medium text-red-600">
                      Последний день акции
                    </Text>
                  </View>
                  <View className="flex-row items-center mt-2">
                    <Text className="text-md font-medium text-slate-600">
                      C {reverseDate(dateStart)} по {reverseDate(dateEnd)}
                    </Text>
                  </View>
                </>
              ) : (
                <View className="flex-row items-center mt-2">
                  <Text className="text-md font-medium text-slate-600">
                    C {reverseDate(dateStart)} по {reverseDate(dateEnd)}
                  </Text>
                </View>
              )
            ) : (
              // <View className="flex-row items-center mt-2">
              //   <Text className="text-md font-medium text-slate-600">
              //     Акция бессрочная
              //   </Text>
              // </View>
              <></>
            )}
            <View className="mt-2 flex items-start justify-start w-full">
              <Text className="text-md font-black text-green-800">{title}</Text>
            </View>

            <View className="mb-2">
              <View className="w-full">{description}</View>
            </View>
          </View>
        </Padding>
      </Padding>
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
