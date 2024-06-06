import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '@styles/colors.js';
import IconWithAnimationAdmin from '@navigation/IconAnimation/IconWithAnimationAdmin.js';
import AdminsPrincipalScreen from '@Screens/AdminScreens/AdminsPrincipalScreen.js';
import ProfileScreen from '@Screens/UserScreens/ProfileScreen.js';
import AdminReservasScreen from '@Screens/AdminScreens/AdminsReservasScreen.js';
import AdminChatBotScreen from '@Screens/AdminScreens/AdminChatBotScreen.js';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigatorAppAdmin() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, focused }) => (
                    <IconWithAnimationAdmin route={route} focused={focused} color={color} />
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
            <Tab.Screen name="Inicio" component={AdminsPrincipalScreen} />
            <Tab.Screen name="Gestor Reservas" component={AdminReservasScreen} />
            <Tab.Screen name="Gestor ChatBox" component={AdminChatBotScreen} />
            <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
