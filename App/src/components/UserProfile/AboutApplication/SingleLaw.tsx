import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Linking,
  Pressable,
  RefreshControl,
  Alert,
} from 'react-native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import RenderHtml from 'react-native-render-html';
import currentLaw from 'Redux/thunks/Law/getCurrentLaw.api';
import { EXPO_PUBLIC_PORT, EXPO_PUBLIC_API_URL } from '@env';
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

  const [refreshing, setRefreshing] = useState(true);

  const currentLawOpen =
    useAppSelector<ILaw | null>((state) => state.lawSlice.currentLaw) ||
    ({} as ILaw);

  const onRefresh = async () => {
    try {
      dispatch(currentLaw(lawId));
    } catch (error) {
      Alert.alert('Ошибка при обновлении данных');
    } finally {
      setTimeout(() => {
        setRefreshing(false);
      }, 500);
    }
  };

  useEffect(() => {
    onRefresh();
  }, []);
  const desc = currentLawOpen.description ? (
    <RenderHtml
      source={{
        html: String(currentLawOpen.description),
      }}
      contentWidth={width}
      enableExperimentalMarginCollapsing={true}
    />
  ) : null;

  const openDocumentLink = () => {
    if (currentLawOpen.documentLink) {
      Linking.openURL(
        `${EXPO_PUBLIC_API_URL}:${EXPO_PUBLIC_PORT}${currentLawOpen.documentLink}`
      );
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
                <View className="mb-2">
                  <View className="w-full">{desc}</View>
                </View>
              )}
            </Padding>
          </Padding>
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default SingleLaw;
