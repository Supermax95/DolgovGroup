import React, { FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import Padding from 'ui/Padding';
import { SafeAreaView } from 'react-native-safe-area-context';
import UniversalHeader from 'ui/UniversalHeader';
import {
  Alert,
  Linking,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import FieldDetailArrow from 'ui/FieldDetailArrow';
import PopularQuestions from 'components/SupportDetail/PopularQuestions/PopularQuestions';
import EmployeeConfirm from 'components/SupportDetail/EmployeeConfirm/EmployeeConfirm';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import getQuestions from 'Redux/thunks/Question/getQuestions.api';

// const makePhoneCall = () => {
//   Linking.openURL('tel:89219458686');
// };

const Support: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState<boolean>(true);

  const userStatus = useAppSelector<string | undefined>(
    (state) => state.userSlice.user?.userStatus
  );

  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const onRefresh = async () => {
    try {
      dispatch(getQuestions());
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

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title="Служба поддержки"
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
          <View className="mb-2 px-2">
            <Text className="text-base font-molmal text-zinc-500">
              Вы можете оставить обращение в разделе "Связаться с поддержкой"
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
