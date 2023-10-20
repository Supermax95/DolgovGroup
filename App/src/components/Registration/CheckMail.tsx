import React, { FC, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { TabScreenNavigationProp } from 'navigation/types';
import userActivate from 'Redux/thunks/User/activated.api';
import { useNavigation } from '@react-navigation/native';
import Button from 'ui/Button';

const styleCenter = 'h-full w-full bg-white ';

const CheckMail: FC = () => {
  const navigation = useNavigation<TabScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const userSlice = useAppSelector((state) => state.userSlice);
  console.log('userSlice', userSlice);
  
  const userId = useAppSelector((state) => state.userSlice.user.id);
  console.log('userid', userId);
  const token = useAppSelector<string>((state) => state.userSlice.token.accessToken);
  const [activationMessage, setActivationMessage] = useState<string>('');

  const user = useAppSelector((state) => state.userSlice);
  console.log('юзер на активации', user);
  // const isActivated = useAppSelector((state) => state.userSlice.isActivated);

  useEffect(() => {
    if (userId) {
      console.log('диспатч', {userId});

      dispatch(userActivate({ userId ,token}));
    }
  }, [dispatch, userId]);

  const handleCheckActivation = async () => {
    try {
      const result = await dispatch(
        userActivate({ token, userId, force: true })
      );
      if (result.meta.requestStatus === 'fulfilled') {
        navigation.navigate('Home');
      }
      else {
        setActivationMessage('Аккаунт не активирован ,проверьте почту/спам.');
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
              На вашу почту отправленно письмо
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

// import React, { FC, useEffect, useState } from 'react';
// import { View, Text } from 'react-native';
// import { useDispatch } from 'react-redux';
// import userActivate from 'Redux/thunks/User/activated.api';
// import Button from 'ui/Button';
// import { useAppSelector } from 'Redux/hooks';

// const styleCenter = 'h-full w-full bg-white ';

// const CheckMail: FC = () => {
//   const dispatch = useDispatch();

//   const userId = useAppSelector<number>((state) => state.userSlice.user.id);
//   // console.log('UserID', userId);
//   const userSlice = useAppSelector((state) => state.userSlice);
//   console.log('userSlice', userSlice);
//   const userActivated = useAppSelector((state) => state.userSlice.user.isActivated);
//   // console.log('userActivated', userActivated);

//   const token = useAppSelector<string>((state) => state.userSlice.token);
//   const [activationMessage, setActivationMessage] = useState<string>('');

//   useEffect(() => {
//     if (userId) {
//       dispatch(userActivate({ userId }));
//     }
//   }, [dispatch, userId]);

//   const handleCheckActivation = async () => {
//     try {
//       const result = await dispatch(
//         userActivate({ token, userId, force: true })
//       );
//       if (result.meta.requestStatus === 'fulfilled') {
//         setActivationMessage('Аккаунт активирован');
//       } else {
//         setActivationMessage('Аккаунт не активирован, проверьте почту/спам.');
//       }
//     } catch (error) {
//       console.error('Ошибка при проверке активации:', error);
//       setActivationMessage('Произошла ошибка при проверке активации.');
//     }
//   };

//   return (
//     <>
//       <View className={styleCenter}>
//         <View className="mx-1 justify-center items-center h-full">
//           <View className="w-10/12">
//             <Text className="text-center text-gray-800 text-lg font-normal">
//               На вашу почту отправлено письмо
//             </Text>
//             <Button
//               title="Проверить активацию"
//               onPress={handleCheckActivation}
//             />
//             <Text className="text-red-500 ml-1 mt-1 text-xs ">
//               {activationMessage}
//             </Text>
//           </View>
//         </View>
//       </View>
//     </>
//   );
// };

// export default CheckMail;
