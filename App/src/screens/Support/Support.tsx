import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import Padding from 'ui/Padding';
import FieldDetail from 'ui/FieldDetail';
import { SafeAreaView } from 'react-native-safe-area-context';
import UniversalHeader from 'ui/UniversalHeader';
import { Pressable, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Support: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();

  return (
    <SafeAreaView className="bg-white h-full flex-1">
      <UniversalHeader
        onPress={() => navigation.goBack()}
        title="Служба поддержки"
      />
      <Padding>
        <View className="mb-2 px-2">
          <Text className="text-base font-molmal text-zinc-500">
            На звонки отвечаем в такое-то время...
          </Text>
        </View>

        <FieldDetail
          onPress={() => navigation.navigate('SupportMessage')}
          icon="chat-processing"
          title="Связаться с поддержкой"
        />
        <FieldDetail
          // onPress={() => navigation.navigate('SupportMessage')}
          //! сюда прокинуть редирект на номер, чтобы вёл в телефон юзера
          icon="phone-in-talk"
          title="Горячая линия"
        />
        <View className="h-16"></View>
        <FieldDetail
          onPress={() => navigation.navigate('EmployeeConfirm')}
          icon="account"
          title="Получить доступ сотрудника"
        />

        {/* <Pressable
          // onPress={() => navigateToSingleLaw(law.id)}
          className="py-3 flex-row items-center justify-between border-b-[1px] border-gray-100"
        >
          <View>
            <Text className="text-zinc-800 font-medium text-md">
              Получить доступ сотрудника
            </Text>
          </View>
          <View className="w-7">
            <MaterialCommunityIcons
              name="chevron-right"
              size={26}
              color="#b7b7b6"
            />
          </View>
        </Pressable> */}

        <View className="mt-6">
          <Pressable
            // onPress={onPress}
            className="py-4 flex-row items-center justify-around border-b-[1px] border-zinc-200"
          >
            <MaterialCommunityIcons
              name="chat-processing"
              size={19}
              color="#71716F"
            />
            {/* </Pressable> */}
            <View className="flex-1 px-3 flex-row justify-center">
              <Text className="text-zinc-800 font-medium text-md">
                Связаться с поддержкой
              </Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              size={26}
              color="#b7b7b6"
            />
          </Pressable>
        </View>

        <View className="mt-6">
          <Text className="text-lg font-medium text-zinc-700 px-2">
            Популярные вопросы
          </Text>
        </View>
      </Padding>
    </SafeAreaView>
  );
};
export default Support;
