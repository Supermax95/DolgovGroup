import { View, Text } from 'react-native';
import React from 'react';
import { useAppSelector } from 'Redux/hooks';
import FieldDetailArrow from 'ui/FieldDetailArrow';
import { StackNavigationProp } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';

interface IQuestion {
  id: number;
  title: string;
  description: string;
}

const PopularQuestions = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const questions = useAppSelector<IQuestion[]>(
    (state) => state.questionSlice.data
  );

  const navigateToQuestionAndAnswer = (questionId: number): void => {
    navigation.navigate('QuestionAndAnswer', { questionId });
  };

  return (
    <>
      <View className="mt-6">
        <Text className="text-lg font-bold text-emerald-700 px-2">
          Популярные вопросы
        </Text>
      </View>
      <View className="my-1">
        {questions.length ? (
          questions.map((question) => (
            <FieldDetailArrow
              key={question.id}
              onPress={() => navigateToQuestionAndAnswer(question.id)}
              title={question.title}
            />
          ))
        ) : (
          <View className="items-center justify-center w-full mt-4">
            <Text className="text-lg font-normal text-zinc-500">
              Информация отсутствует
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default PopularQuestions;
