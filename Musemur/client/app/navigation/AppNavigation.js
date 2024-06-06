import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomTabNavigatorLogIn from './BottomTabNavigation/BottomTabNavigatorLogIn.js';
import AppDrawerNavigatorUser from './DrawerNavigation/AppDrawerNavigator.js';
import AppDrawerNavigatorAdmin from './DrawerNavigation/AppDrawerNavigatorAdmin.js';
import RegisterUser from '../screens/UserScreens/RegisterUser.js';
import CreateReserva from '../screens/UserScreens/CreateReserva.js';
import MuseumScreen from '../screens/UserScreens/MuseumScreen.js';
import SettingsScreen from '../screens/UserScreens/Settings.js';
import ForgotPasswordScreen from '../screens/UserScreens/ForgotPassword.js';
import ChatBox from '../screens/UserScreens/ChatBox.js';
import InfoScreen from '../screens/UserScreens/Info.js';
import LoginScreenAdmins from '../screens/AdminScreens/LogInScreenAdmins.js';
import AdminCreateMuseum from '../screens/AdminScreens/AdminCreateMuseumScreen.js';
import AdminMuseum from '../screens/AdminScreens/AdminMuseumScreen.js';

const Stack = createStackNavigator();

function AppNavigator() {
    const [initialRoute, setInitialRoute] = useState('Login');

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('authToken');
            const role = await AsyncStorage.getItem('userRole');

            if (token && role === '1') { // '1' para el rol de administrador
                setInitialRoute('AppAdmin');
            } else if (token) {
                setInitialRoute('App');
            } else {
                setInitialRoute('Login');
            }
        };

        checkToken();
    }, []);

    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen
                name="Login"
                component={BottomTabNavigatorLogIn}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AdminLogin"
                component={LoginScreenAdmins}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{ headerShown: false }}
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
                name="Settings"
                component={SettingsScreen}
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
            <Stack.Screen
                name="Info"
                component={InfoScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AdminCreateMuseum"
                component={AdminCreateMuseum}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AdminMuseum"
                component={AdminMuseum}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_700Bold,
    });

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = async () => {
        if (appIsReady && fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    };

    if (!appIsReady || !fontsLoaded) {
        return null;
    }

    return (
        <PaperProvider>
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </View>
        </PaperProvider>
    );
}
