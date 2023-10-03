import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { AppNavigator, FooterTabs } from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';

//import { useNavigationContainerRef } from '@react-navigation/native';

// export default function App() {
//   // const refNavigate = useNavigationContainerRef();

//   return (
//     <>
//       {/* <NavigationContainer ref={refNavigate}> */}
//       <NavigationContainer>
//         <SafeAreaView className="flex-1">
//           <AppNavigator />
//           <FooterTabs />

//           <StatusBar style="auto" />
//         </SafeAreaView>
//       </NavigationContainer>
//       {/* <Footer navigate={refNavigate.navigate} /> */}
//     </>
//   );
// }

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator />
        <StatusBar style="auto" />
      </SafeAreaView>
    </NavigationContainer>
  );
}
