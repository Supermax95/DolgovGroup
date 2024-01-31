import { View, Text, Switch, Alert } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import Padding from 'ui/Padding';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import profileNotification from 'Redux/thunks/Profile/profileNotificationUpdate.api';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import UniversalHeader from 'ui/UniversalHeader';
import Button from 'ui/Button';

const NotificationSettings: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp>();
  const notificationPush = useAppSelector<boolean>(
    (state) => state.profileSlice.notificationPush
  );

  const notificationEmail = useAppSelector<boolean>(
    (state) => state.profileSlice.notificationEmail
  );
  const [isEnabledPush, setIsEnabledPush] = useState<boolean>(notificationPush);
  const [isEnabledEmail, setIsEnabledEmail] =
    useState<boolean>(notificationEmail);
  const [tempEnabledPush, setTempEnabledPush] =
    useState<boolean>(notificationPush);
  const [tempEnabledEmail, setTempEnabledEmail] =
    useState<boolean>(notificationEmail);
  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );

  const toggleSwitchPush = (): void =>
    setIsEnabledPush((previousStatePush) => !previousStatePush);

  const toggleSwitchEmail = (): void =>
    setIsEnabledEmail((previousStateEmail) => !previousStateEmail);

  const handleSaveSettings = () => {
    Alert.alert(
      'Подтверждение',
      'Вы уверены, что хотите сохранить данные настройки?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
          onPress: () => {
            setIsEnabledPush(tempEnabledPush);
            setIsEnabledEmail(tempEnabledEmail);
          },
        },
        {
          text: 'Сохранить',
          onPress: () => {
            setTempEnabledPush(isEnabledPush);
            setTempEnabledEmail(isEnabledEmail);
            navigation.navigate('Profile');
            dispatch(
              profileNotification({
                token,
                notificationPush: isEnabledPush,
                notificationEmail: isEnabledEmail,
              })
            );
          },
        },
      ]
    );
  };

  // Используем useEffect для обновления временных состояний при изменении notificationPush и notificationEmail
  useEffect(() => {
    setTempEnabledPush(notificationPush);
    setTempEnabledEmail(notificationEmail);
  }, [notificationPush, notificationEmail]);

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title="Настройка уведомлений"
      />
      {/* <View className="mt-4 mb-2">
        <Text className="text-center text-xl font-bold text-zinc-800">
          Маркетинговые рассылки
        </Text>
      </View> */}
      <Padding>
        <View className="mb-2 px-2">
          <Text className="text-lg font-molmal text-zinc-500">
            Своевременно информируем о персональных предложениях, изменениях
            уровня лояльности и лучших товарах.
          </Text>
        </View>
        <Padding>
          <View className="py-2 flex-row border-b-[1px] border-zinc-200 items-center justify-between">
            <View>
              <Text className="text-sm">PUSH-уведомления</Text>
            </View>
            <Switch
              trackColor={{ false: '#d6d3d1', true: '#a7f3d0' }}
              thumbColor={isEnabledPush ? '#22c55e' : '#f5f5f4'}
              ios_backgroundColor="#d6d3d1"
              onValueChange={toggleSwitchPush}
              value={isEnabledPush}
            />
          </View>
          <View className="py-2 flex-row border-b-[1px] border-zinc-200 items-center justify-between">
            <View>
              <Text className="text-sm">Получать E-mail письма</Text>
            </View>
            <View>
              <Switch
                trackColor={{ false: '#d6d3d1', true: '#a7f3d0' }}
                thumbColor={isEnabledEmail ? '#22c55e' : '#f5f5f4'}
                ios_backgroundColor="#d6d3d1"
                onValueChange={toggleSwitchEmail}
                value={isEnabledEmail}
              />
            </View>
          </View>
          <Button onPress={handleSaveSettings} title="Сохранить" />
        </Padding>
      </Padding>
    </SafeAreaView>
  );
};

export default NotificationSettings;
