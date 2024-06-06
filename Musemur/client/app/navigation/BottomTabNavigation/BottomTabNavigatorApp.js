import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '@styles/colors.js';
import IconWithAnimationUser from '@navigation/IconAnimation/IconWithAnimationUser.js';
import PrincipalScreen from '@Screens/UserScreens/PrincipalScreen.js';
import ReservasScreen from '@Screens/UserScreens/ReservasScreen.js';
import ProfileScreen from '@Screens/UserScreens/ProfileScreen.js';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigatorApp() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, focused }) => (
                    <IconWithAnimationUser route={route} focused={focused} color={color} />
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
            <Tab.Screen name="Inicio" component={PrincipalScreen} />
            <Tab.Screen name="Reservas" component={ReservasScreen} />
            <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
