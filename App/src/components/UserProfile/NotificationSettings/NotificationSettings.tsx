import { View, Text, Switch } from 'react-native';
import React, { FC, useState } from 'react';
import Padding from 'ui/Padding';

const NotificationSettings: FC = () => {
  const [isEnabledPush, setIsEnabledPush] = useState(false);
  const [isEnabledEmail, setIsEnabledEmail] = useState(false);

  const toggleSwitchPush = () =>
    setIsEnabledPush((previousStatePush) => !previousStatePush);

  const toggleSwitchEmail = () =>
    setIsEnabledEmail((previousStateEmail) => !previousStateEmail);

  return (
    <View className="bg-white h-full">
      <View className="mt-4 mb-2">
        <Text className="text-center text-xl font-bold text-zinc-800">
          Маркетинговые рассылки
        </Text>
      </View>
      <Padding>
        <View className="mb-2">
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
              ios_backgroundColor="#3e3e3e"
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
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchEmail}
                value={isEnabledEmail}
              />
            </View>
          </View>
        </Padding>
      </Padding>
    </View>
  );
};

export default NotificationSettings;
