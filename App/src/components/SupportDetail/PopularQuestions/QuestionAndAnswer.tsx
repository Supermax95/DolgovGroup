import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import UniversalHeader from 'ui/UniversalHeader';
import Padding from 'ui/Padding';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

interface IQuestion {
  id: number;
  title: string;
  description: string;
}

const QuestionAndAnswer = ({ route }: any) => {
  const { questionId } = route.params;
  console.log('questionId', questionId);
  const { width } = useWindowDimensions();

  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const questions = useAppSelector<IQuestion[]>(
    (state) => state.questionSlice.data
  );

  const answer = questions.find((el) => el.id === questionId);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         await dispatch(getAnswer(questionId));
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     fetchData();
  //   }, [dispatch, questionId]);

  const answerDesk = answer?.description ? (
    <RenderHtml
      source={{
        html: String(answer?.description),
      }}
      contentWidth={width}
      enableExperimentalMarginCollapsing={true}
    />
  ) : null;

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
            title="Популярные вопросы"
          />
          <ScrollView style={{ flex: 1, width: '100%' }} bounces={false}>
            <Padding>
              <Padding>
                <View className="flex-1 flex-col items-center justify-center">
                  <View className="my-2 items-start justify-start w-full">
                    <Text className="text-lg font-bold text-zinc-800">
                      {answer?.title}
                    </Text>
                  </View>
                  <View className="mt-2 items-start justify-start w-full">
                    {answerDesk}
                  </View>
                </View>
              </Padding>
            </Padding>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default QuestionAndAnswer;
