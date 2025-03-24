import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListScreen from '@/screens/ListScreen';
import ScanScreen from '@/screens/ScanScreen';
import CompareScreen from '@/screens/CompareScreen';
import SettingsScreen from '@/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="List" component={ListScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Compare" component={CompareScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

