import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Context Provider
import { TodoProvider } from './context/TodoContext';

// Screens
import HomeScreen from './screens/HomeScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
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
  );
}
