import React, { FC, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import userActivate from 'Redux/thunks/User/activated.api';
import { useNavigation } from '@react-navigation/native';
import Button from 'ui/Button';

const styleCenter = 'h-full w-full bg-white pt-16';

const CheckMail: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userId = useSelector(
    (state: RootState) => state.userSlice.user?.newUser?.id
  );
  console.log(userId);

  const isActivated = useSelector((state) => state.userSlice.isActivated);
  console.log('===>', isActivated);

  const [activationMessage, setActivationMessage] = useState('');

  useEffect(() => {
    if (userId) {
      dispatch(userActivate(userId));
    }
  }, [dispatch, userId]);

  const handleCheckActivation = async () => {
    try {
      const response = await dispatch(userActivate(userId, { force: true }));

      if (response.payload === true) {
        navigation.navigate('Home');
      } else {
        setActivationMessage(
          'Пожалуйста, проверьте свою почту и активируйте аккаунт.'
        );
      }
    } catch (error) {
      console.error('Ошибка при проверке активации:', error);
      setActivationMessage('Произошла ошибка при проверке активации.');
    }
  };

  return (
    <View className={styleCenter}>
      <View className="mx-1 justify-center items-center h-full">
      <Button title="Проверить активацию" onPress={handleCheckActivation} />
      <Text className="text-red-500 ml-1 mt-1 text-xs">{activationMessage}</Text>
      </View>
    </View>
  );
};

export default CheckMail;
