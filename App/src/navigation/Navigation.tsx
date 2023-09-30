import { createStackNavigator } from '@react-navigation/stack';
import { LogoHello } from '../components/HelloPage/LogoHello';
import { LoginPage } from '../components/LoginPage/LoginPage';
import { Registration } from '../components/Registration/Registration';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LogoHello">
      <Stack.Screen
        name="LogoHello"
        component={LogoHello}
        options={{ title: 'Загрузка' }}
      />
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{ title: 'Вход' }}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{ title: 'Регистрация' }}
      />
    </Stack.Navigator>
  );
};
