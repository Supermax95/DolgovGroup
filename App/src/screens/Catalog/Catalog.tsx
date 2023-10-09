// import { View, Text } from 'react-native';
// import React from 'react';

// const Catalog = () => {
//   return (
//     <View>
//       <Text>Catalog</Text>
//     </View>
//   );
// };

// export default Catalog;

import { View, Text } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import userLogout from 'Redux/thunks/User/logout.api';
import Button from 'ui/Button';
import { useNavigation } from '@react-navigation/native';

export default Catalog = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
  };
  return (
    <View>
      <Text>Profile</Text>
      <Button onPress={handleLogout} title={`Выйти`} />
    </View>
  );
};
