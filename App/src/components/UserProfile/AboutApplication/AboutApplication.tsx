import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import getLaws from 'Redux/thunks/Law/getLaws.api';
import Padding from 'ui/Padding';
import UniversalHeader from 'ui/UniversalHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import FieldDetailArrow from 'ui/FieldDetailArrow';
import {
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Alert,
} from 'react-native';

interface ILaw {
  id: number;
  title: string;
  description: string;
  dateFrom: string;
  documentLink: string;
}

const AboutApplication: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  // const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(true);

  // useEffect(() => {
  //   dispatch(getLaws());
  //   setIsLoadingPage(false);
  // }, [dispatch]);

  const onRefresh = async () => {

    try {
      dispatch(getLaws());
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

  const laws = useAppSelector<ILaw[]>((state) => state.lawSlice.data);

  const navigateToSingleLaw = (lawId: number): void => {
    navigation.navigate('SingleLaw', { lawId });
  };

  function truncateText(text: string, maxLength: number): string {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  const maxLength = 35;

  return (
    <>
      {/* {isLoadingPage ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="green" />
        </View>
      ) : ( */}
        <SafeAreaView className="bg-white h-full flex-1">
          <UniversalHeader
            onPress={() => navigation.goBack()}
            title="Правовая информация"
          />
          <ScrollView
            alwaysBounceVertical
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, width: '100%' }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Padding>
              <Padding>
                {laws.length ? (
                  laws.map((law) => (
                    <FieldDetailArrow
                      key={law.id}
                      onPress={() => navigateToSingleLaw(law.id)}
                      icon="file-document-outline"
                      title={truncateText(law.title, maxLength)}
                    />
                  ))
                ) : (
                  <View className="items-center justify-center w-full mt-4">
                    <Text className="text-lg font-normal text-zinc-500">
                      Информация отсутствует
                    </Text>
                  </View>
                )}
              </Padding>
            </Padding>
          </ScrollView>
        </SafeAreaView>
      {/* )} */}
    </>
  );
};

export default AboutApplication;
