import { createStackNavigator } from '@react-navigation/stack';
import { LogoHello } from '../components/HelloPage/LogoHello';
import { LoginPage } from '../components/LoginPage/LoginPage';
import SignIn from 'components/SignIn/SignIn';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LogoHello">
      <Stack.Screen
        name="LogoHello"
        component={LogoHello}
        options={{ title: 'Loading' }}
      />
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: 'SignIn' }}
      />
    </Stack.Navigator>
  );
};
