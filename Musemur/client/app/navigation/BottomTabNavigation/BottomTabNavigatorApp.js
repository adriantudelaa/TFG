import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../../styles/colors.js';
import IconWithAnimationUser from '../IconAnimation/IconWithAnimationUser.js';
import PrincipalScreen from '../../screens/UserScreens/PrincipalScreen.js';
import ReservasScreen from '../../screens/UserScreens/ReservasScreen.js';
import ProfileScreen from '../../screens/UserScreens/ProfileScreen.js';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigatorApp() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, focused }) => (
                    <IconWithAnimationUser route={route} focused={focused} color={color} />
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
            <Tab.Screen name="Inicio" component={PrincipalScreen} />
            <Tab.Screen name="Reservas" component={ReservasScreen} />
            <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
