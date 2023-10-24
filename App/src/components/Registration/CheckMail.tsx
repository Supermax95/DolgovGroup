import React, { FC, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { TabScreenNavigationProp } from 'navigation/types';
import userActivate from 'Redux/thunks/User/activated.api';
import { useNavigation } from '@react-navigation/native';
import Button from 'ui/Button';

const styleCenter = 'h-full w-full bg-white ';

type IToken =
  | {
      accessToken: string;
      refreshToken: string;
    }
  | undefined;

const CheckMail: FC = () => {
  const navigation = useNavigation<TabScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const userId = useAppSelector<number>((state) => state.userSlice.user.id);
  const userToken = useAppSelector<IToken | undefined>(
    (state) => state.userSlice.token
  );

  const [activationMessage, setActivationMessage] = useState<string>('');

  useEffect(() => {
    if (userId) {
      dispatch(userActivate({ userId, token: userToken }));
    }
  }, [dispatch, userId, userToken]);

  const handleCheckActivation = async () => {
    try {
      const result = await dispatch(
        userActivate({ userId, token: userToken, force: true })
      );
      if (result.meta.requestStatus === 'fulfilled') {
        navigation.navigate('Home');
      } else {
        setActivationMessage('Аккаунт не активирован, проверьте почту/спам.');
      }
    } catch (error) {
      console.error('Ошибка при проверке активации:', error);
      setActivationMessage('Произошла ошибка при проверке активации.');
    }
  };

  return (
    <>
      <View className={styleCenter}>
        <View className="mx-1 justify-center items-center h-full">
          <View className="w-10/12">
            <Text className="text-center text-gray-800 text-lg font-normal">
              На вашу почту отправлено письмо
            </Text>
            <Button
              title="Проверить активацию"
              onPress={handleCheckActivation}
            />
            <Text className="text-red-500 ml-1 mt-1 text-xs ">
              {activationMessage}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default CheckMail;
