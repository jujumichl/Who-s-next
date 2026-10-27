import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@react-native-vector-icons/ionicons';

import HomeScreen from '../screens/HomeScreen';
import EditScreen from '../screens/EditScreen';
import type { TabParamList } from '../types/TabParamList';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={route.name === 'Accueil' ? 'home' : 'person-add'}
            size={size}
            color={color}
          />
        ),
        tabBarActiveTintColor: '#2563eb',
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen
        name="Reglages"
        component={EditScreen}
        options={{ title: 'Équipage' }}
      />
    </Tab.Navigator>
  );
}