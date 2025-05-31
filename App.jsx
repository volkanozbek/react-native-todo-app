import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Context Provider
import { TodoProvider } from './context/TodoContext';

// Screens
import HomeScreen from './screens/HomeScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TodoProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: { display: 'none' },
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </TodoProvider>
    </GestureHandlerRootView>
  );
}
