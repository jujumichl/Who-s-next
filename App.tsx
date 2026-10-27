import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './src/navigation/TabNavigator';
import { ObjetsProvider } from './src/services/useObj';

export default function App() {
  return (
    <SafeAreaProvider>
      <ObjetsProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </ObjetsProvider>
    </SafeAreaProvider>
  );
}