import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../../styles/colors.js';
import IconWithAnimationAdmin from '../IconAnimation/IconWithAnimationAdmin.js';
import AdminsPrincipalScreen from '../../screens/AdminScreens/AdminsPrincipalScreen.js';
import AdminProfileScreen from '../../screens/AdminScreens/AdminProfileScreen.js';
import AdminReservasScreen from '../../screens/AdminScreens/AdminsReservasScreen.js';
import ChatBoxAdminScreen from '../../screens/AdminScreens/ChatBoxAdminScreen.js';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigatorAppAdmin() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, focused }) => (
                    <IconWithAnimationAdmin route={route} focused={focused} color={color} />
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
            <Tab.Screen name="Inicio" component={AdminsPrincipalScreen} />
            <Tab.Screen name="Gestor Reservas" component={AdminReservasScreen} />
            <Tab.Screen name="Gestor ChatBox" component={ChatBoxAdminScreen} />
            <Tab.Screen name="Perfil" component={AdminProfileScreen} />
        </Tab.Navigator>
    );
}
