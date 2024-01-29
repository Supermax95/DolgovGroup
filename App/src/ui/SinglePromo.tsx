import { View, Text, Image, SafeAreaView, Dimensions } from 'react-native';
import React, { FC } from 'react';
import { PORT, IP } from '@env';
import { isToday, parseISO } from 'date-fns';

interface ISinglePromo {
  title: string;
  description: React.ReactNode;
  image?: string | undefined;
  dateStart: string;
  dateEnd: string;
}

const SinglePromo: FC<ISinglePromo> = ({
  title,
  description,
  image,
  dateStart,
  dateEnd,
}) => {
  const screenHeight = Math.round(Dimensions.get('window').height);

  const reverseDate = (dateString: string): string => {
    if (!dateString) {
      return ''; // or handle the case when dateString is undefined
    }

    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };

  return (
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
              source={{ uri: `http://${IP}:${PORT}${image}` }}
              resizeMode="contain"
              className={`w-80 h-80`}
            />
          </View>
        </View>
      </SafeAreaView>

      <View
        className={`w-full flex-1 h-full bg-white rounded-t-3xl px-6 py-2 bg-slate-100`}
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
        <View className="space-y-2">
          <View className={`flex items-start justify-start w-full`}>
            <Text className={`text-lg font-bold text-gray-800`}>{title}</Text>
          </View>
        </View>

        {/* //! на андроид нет отступа от текста и текст не переносится */}
        <SafeAreaView
          className={`mt-6 flex-col items-center justify-between w-full`}
        >
          <View className={`flex items-start justify-start w-full`}>
            {description}
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default SinglePromo;
