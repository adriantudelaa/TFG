import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigatorLogIn from './BottomTabNavigation/BottomTabNavigatorLogIn.js';

import AppDrawerNavigatorUser from './DrawerNavigation/AppDrawerNavigator.js';
import AppDrawerNavigatorAdmin from './DrawerNavigation/AppDrawerNavigatorAdmin.js';

import RegisterUser from '../screens/UserScreens/RegisterUser.js';
import CreateReserva from '../screens/UserScreens/CreateReserva.js';
import MuseumScreen from '../screens/UserScreens/MuseumScreen.js';
import EditProfileScreen from '../screens/UserScreens/EditProfile.js';
import ForgotPasswordScreen from '../screens/UserScreens/ForgotPassword.js';
import ChatBox from '../screens/UserScreens/ChatBox.js';

const Stack = createStackNavigator();


function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={BottomTabNavigatorLogIn}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name="Registrarse"
                component={RegisterUser}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="App"
                component={AppDrawerNavigatorUser}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Reserva"
                component={CreateReserva}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Museum"
                component={MuseumScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ChatBox"
                component={ChatBox}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AppAdmin"
                component={AppDrawerNavigatorAdmin}
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