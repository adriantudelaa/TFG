import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../../styles/colors.js';
import IconWithAnimationLogIn from '../IconAnimation/IconWithAnimationLogIn.js';
import LoginScreen from '../../screens/UserScreens/LogInScreen.js';
import LoginScreenAdmins from '../../screens/AdminScreens/LogInScreenAdmins.js';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigatorLogIn() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, focused }) => (
                    <IconWithAnimationLogIn route={route} focused={focused} color={color} />
                ),
                tabBarActiveTintColor: "#377bff",
                tabBarInactiveTintColor: "gray",
                tabBarShowLabel: false,
                tabBarStyle: [
                    {
                        display: "flex"
                    },
                    null
                ],
                headerShown: false,
            })}
        >
            <Tab.Screen name="Usuarios" component={LoginScreen} />
            <Tab.Screen name="Administradores" component={LoginScreenAdmins} />
        </Tab.Navigator>
    );
}
