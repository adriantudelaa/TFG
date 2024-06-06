import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '@styles/colors.js';
import IconWithAnimationLogIn from '@navigation/IconAnimation/IconWithAnimationLogIn.js';
import LoginScreen from '@Screens/UserScreens/LogInScreen.js';
import LoginScreenAdmins from '@Screens/AdminScreens/LogInScreenAdmins.js';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigatorLogIn() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, focused }) => (
                    <IconWithAnimationLogIn route={route} focused={focused} color={color} />
                ),
                tabBarActiveTintColor: colors.PRIMARYCOLOR,
                tabBarInactiveTintColor: colors.GRAY,
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
