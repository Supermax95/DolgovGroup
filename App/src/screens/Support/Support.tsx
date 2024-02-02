import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import Padding from 'ui/Padding';
import { SafeAreaView } from 'react-native-safe-area-context';
import UniversalHeader from 'ui/UniversalHeader';
import { Linking, Pressable, ScrollView, Text, View } from 'react-native';
import FieldDetailArrow from 'ui/FieldDetailArrow';
import PopularQuestions from 'components/SupportDetail/PopularQuestions/PopularQuestions';

const makePhoneCall = () => {
  Linking.openURL('tel:+7 800 700-00-00');
};

const Support: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title="Служба поддержки"
      />
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <Padding>
          <View className="mb-2 px-2">
            <Text className="text-base font-molmal text-zinc-500">
              На звонки отвечаем в такое-то время... Вы можете оставить
              обращение в разделе "Связаться с поддержкой"...
            </Text>
          </View>

          <FieldDetailArrow
            onPress={() => navigation.navigate('SupportMessage')}
            icon="chat-processing"
            title="Связаться с поддержкой"
          />

          <FieldDetailArrow
            onPress={makePhoneCall}
            icon="phone-in-talk"
            title="Горячая линия"
          />
          <FieldDetailArrow
            onPress={() => navigation.navigate('EmployeeConfirm')}
            icon="account"
            title="Получить доступ сотрудника"
          />

          <PopularQuestions />
        </Padding>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Support;
