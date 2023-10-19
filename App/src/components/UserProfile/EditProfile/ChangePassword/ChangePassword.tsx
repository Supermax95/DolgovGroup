import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import { View, Text, Alert } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Field from 'ui/Field';
import Button from 'ui/Button';
import changeProfilePass from 'Redux/thunks/Profile/profileChangePass.api';
import Padding from 'ui/Padding';

interface PasswordChangeData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp>();
  const userId = useAppSelector<number>((state) => state.userSlice.user.id);

  const [data, setData] = useState<PasswordChangeData>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [errorMessages, setErrorMessages] = useState<PasswordChangeData>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleFieldChange = (
    field: keyof PasswordChangeData,
    value: string
  ): void => {
    setData((prevData) => ({ ...prevData, [field]: value }));
    setErrorMessages((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const handleSubmit = async (): Promise<void> => {
    if (!data.oldPassword || !data.newPassword || !data.confirmPassword) {
      setErrorMessages({
        oldPassword: !data.oldPassword ? 'Введите старый пароль' : '',
        newPassword: !data.newPassword ? 'Введите новый пароль' : '',
        confirmPassword: !data.confirmPassword
          ? 'Подтвердите новый пароль'
          : '',
      });
    } else if (data.newPassword !== data.confirmPassword) {
      setErrorMessages({ newPassword: 'Пароли не совпадают' });
    } else {
      try {
        const result = await dispatch(
          changeProfilePass({
            userId,
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
          })
        );
        if (result.meta.requestStatus === 'rejected') {
          Alert.alert(
            'Ошибка',
            'Произошла ошибка при изменении пароля. Пожалуйста, попробуйте ещё раз.'
          );
        } else if (result.meta.requestStatus === 'fulfilled') {
          Alert.alert(
            'Пароль успешно изменен',
            'Ваш пароль был успешно изменен.',
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('EditProfile');
                },
              },
            ]
          );
        }
      } catch (error) {
        Alert.alert(
          'Ошибка',
          'Данного пользователя не существует или произошла ошибка'
        );
      }
    }
  };

  return (
    <View className="bg-white h-full">
      <Padding>
        <Padding>
          <View className="flex-row items-center">
            <Field
              value={data.oldPassword}
              placeholder="Старый пароль"
              onChange={(value) => handleFieldChange('oldPassword', value)}
              isSecure={!showPassword}
              autoCapitalize="none"
            />
            <MaterialCommunityIcons
              name={showPassword ? 'eye' : 'eye-off'}
              size={25}
              color="gray"
              onPress={toggleShowPassword}
              style={{
                position: 'absolute',
                right: 15,
                transform: [{ translateY: 5 }],
              }}
            />
          </View>
          {errorMessages.oldPassword && (
            <Text className="text-red-500 ml-1 mt-1 text-xs">
              {errorMessages.oldPassword}
            </Text>
          )}
          <View className="flex-row items-center">
            <Field
              value={data.newPassword}
              placeholder="Новый пароль"
              onChange={(value) => handleFieldChange('newPassword', value)}
              isSecure={!showPassword}
              autoCapitalize="none"
            />
            <MaterialCommunityIcons
              name={showPassword ? 'eye' : 'eye-off'}
              size={25}
              color="gray"
              onPress={toggleShowPassword}
              style={{
                position: 'absolute',
                right: 15,
                transform: [{ translateY: 5 }],
              }}
            />
          </View>
          {errorMessages.newPassword && (
            <Text className="text-red-500 ml-1 mt-1 text-xs">
              {errorMessages.newPassword}
            </Text>
          )}
          <View className="flex-row items-center">
            <Field
              value={data.confirmPassword}
              placeholder="Подтвердите новый пароль"
              onChange={(value) => handleFieldChange('confirmPassword', value)}
              isSecure={!showPassword}
              autoCapitalize="none"
            />
            <MaterialCommunityIcons
              name={showPassword ? 'eye' : 'eye-off'}
              size={25}
              color="gray"
              onPress={toggleShowPassword}
              style={{
                position: 'absolute',
                right: 15,
                transform: [{ translateY: 5 }],
              }}
            />
          </View>
          {errorMessages.confirmPassword && (
            <Text className="text-red-500 ml-1 mt-1 text-xs">
              {errorMessages.confirmPassword}
            </Text>
          )}
          <Button onPress={handleSubmit} title="Сохранить" />
        </Padding>
      </Padding>
    </View>
  );
};

export default ChangePassword;
