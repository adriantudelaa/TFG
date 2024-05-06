import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../screens/LogInScreen';
import LoginScreenAdmins from '../screens/LogInScreenAdmins';
import PrincipalScreen from '../screens/PrincipalScreen';
import colors from '../styles/colors.js';
import { useFonts } from 'expo-font';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    const [fontLoaded] = useFonts({
        SanFrancisco: require("../../assets/fonts/SanFrancisco.ttf")
    });
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    let iconName;
                    if (route.name === 'Usuarios') {
                        iconName = 'person-outline';
                    } else if (route.name === 'Administradores') {
                        iconName = 'settings-outline';
                    }
                    return <Ionicons name={iconName} size={30} color={color} />;
                },
                tabBarActiveTintColor: colors.BLUE,
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Usuarios" component={LoginScreen} />
            <Tab.Screen name="Administradores" component={LoginScreenAdmins} />
        </Tab.Navigator>
    );
}

const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Login" 
                component={BottomTabNavigator} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="Principal" 
                component={PrincipalScreen} 
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    );
}
