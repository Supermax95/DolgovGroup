import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Linking,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import RenderHtml from 'react-native-render-html';
import currentLaw from 'Redux/thunks/Law/getCurrentLaw.api';
import { PORT, IP } from '@env';
import UniversalHeader from 'ui/UniversalHeader';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import Padding from 'ui/Padding';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useWindowDimensions } from 'react-native';

export interface ILaw {
  id: number;
  title: string;
  description: string;
  documentLink: string;
  dateFrom: string;
  updatedAt: Date | string;
}

const SingleLaw = ({ route }: any) => {
  const { lawId } = route.params;
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState(false);

  const currentLawOpen =
    useAppSelector<ILaw | null>((state) => state.lawSlice.currentLaw) || ({} as ILaw);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(currentLaw(lawId));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch, lawId]);

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(currentLaw(lawId));
    setRefreshing(false);
  };

  const desc = currentLawOpen.description ? (
    <RenderHtml
      source={{
        html: String(currentLawOpen.description),
      }}
      contentWidth={width}
      enableExperimentalMarginCollapsing={true}
    />
  ) : null;
  console.log(desc);

  const openDocumentLink = () => {
    if (currentLawOpen.documentLink) {
      Linking.openURL(`http://${IP}:${PORT}${currentLawOpen.documentLink}`);
    }
  };

  function truncateText(text: string, maxLength: number) {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  const maxLength = 25;
  const maxLengthDoc = 30;

  const truncated = truncateText(currentLawOpen.title, maxLength);
  // const truncatedDoc = truncateText(currentLawOpen.title, maxLengthDoc);

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="green" />
        </View>
      ) : (
        <>
          <UniversalHeader
            onPress={() => navigation.goBack()}
            title={truncated}
          />
          <ScrollView
            style={{ flex: 1, width: '100%' }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Padding>
              <Padding>
                {/* Если отсутсвует документ. Невозможно сделать проверку на отсутствие текста,
                 т.к. остаются теги в бд после удаления него */}

                {/* {!currentLawOpen.documentLink && (
                  <View className="items-center justify-center w-full mt-4">
                    <Text className="text-lg font-normal text-zinc-500">
                      Информация отсутствует
                    </Text>
                  </View>
                )} */}

                {currentLawOpen.documentLink && (
                  <Pressable
                    onPress={openDocumentLink}
                    className="flex-row justify-center items-center py-2 border-b-[1px] border-zinc-200"
                  >
                    <View className="w-7">
                      <MaterialCommunityIcons
                        name="file-document-outline"
                        size={23}
                        color="#047857"
                      />
                    </View>
                    <Text className="text-zinc-700 font-medium text-md">
                      {/* {truncatedDoc} */}
                      Документ (скачать)
                    </Text>
                  </Pressable>
                )}
                {currentLawOpen.description === '<p><br></p>' ? (
                  <View className="items-center justify-center w-full mt-4">
                    <Text className="text-lg font-normal text-zinc-500">
                      Информация отсутствует
                    </Text>
                  </View>
                ) : (
                  <View className="flex-1 flex-col items-center justify-center">
                    <View className="flex items-start justify-start w-full">
                      {desc}
                    </View>
                  </View>
                )}
              </Padding>
            </Padding>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default SingleLaw;
