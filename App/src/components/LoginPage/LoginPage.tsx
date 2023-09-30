// import React, { useEffect, useState } from 'react';
// import { View, Button, Image } from 'react-native';
// import Loading from '../Loading/Loading';
// import { useNavigation } from '@react-navigation/native';

// export const LoginPage = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const navigation = useNavigation();

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 3000);
//   }, []);

//   const handleLoginClick = () => {
//     alert('Вы вошли в систему!');
//   };

//   return (
//     <>
//       {isLoading ? (
//         <Loading />
//       ) : (
//         <View className="flex-1 items-center justify-center bg-white">
//           <View className="flex-1 items-center justify-center">
//             <Button title="Войти" onPress={handleLoginClick} />
//           </View>
//         </View>
//       )}
//     </>
//   );
// };
