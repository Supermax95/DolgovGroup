import React, { FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import Padding from 'ui/Padding';
import { SafeAreaView } from 'react-native-safe-area-context';
import UniversalHeader from 'ui/UniversalHeader';
import { Linking, ScrollView, Text, View } from 'react-native';
import FieldDetailArrow from 'ui/FieldDetailArrow';
import PopularQuestions from 'components/SupportDetail/PopularQuestions/PopularQuestions';
import EmployeeConfirm from 'components/SupportDetail/EmployeeConfirm/EmployeeConfirm';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';

// const makePhoneCall = () => {
//   Linking.openURL('tel:89219458686');
// };

const Support: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();

  const userStatus = useAppSelector<string | undefined>(
    (state) => state.userSlice.user.userStatus
  );

  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title="Служба поддержки"
      />
      <ScrollView style={{ flex: 1, width: '100%' }} bounces={false}>
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

          {/* <FieldDetailArrow
            onPress={makePhoneCall}
            icon="phone-in-talk"
            title="Горячая линия"
          /> */}

          <PopularQuestions />

          <View className="mt-6">
            <Text className="text-lg font-bold text-emerald-700 px-2">
              Доступ сотрудника
            </Text>
            {userStatus === 'Сотрудник' ? (
              <FieldDetailArrow icon="account" title="Сотрудник компании" />
            ) : userStatus === 'Новый сотрудник' ? (
              <FieldDetailArrow
                onPress={() => setModalVisible(true)}
                icon="account-clock"
                title="Запрос находится в обработке"
              />
            ) : (
              <FieldDetailArrow
                onPress={() => setModalVisible(true)}
                icon="account"
                title="Получить доступ сотрудника"
              />
            )}
          </View>
        </Padding>
      </ScrollView>

      {/* модальное окно */}
      <EmployeeConfirm
        visible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
};
export default Support;
