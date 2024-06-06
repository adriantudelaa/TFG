import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigatorStyles } from '../../styles/styles.js';
import BottomTabNavigatorApp from '../BottomTabNavigation/BottomTabNavigatorApp.js';
import { Icon } from 'react-native-elements';
import MuseumScreen from '../../screens/UserScreens/MuseumScreen.js';
import colors from '@styles/colors.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const getUserName = async () => {
            try {
                const name = await AsyncStorage.getItem('userName');
                if (name !== null) {
                    setUserName(name);
                }
            } catch (error) {
                console.error('Error al obtener el nombre del usuario:', error);
            }
        };

        getUserName();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('authToken');
            await AsyncStorage.removeItem('userName');
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <DrawerContentScrollView {...props}>
            <View style={NavigatorStyles.drawerHeader}>
                <Image source={require('@assets/icon-app.png')} style={NavigatorStyles.logo} />
                <Text style={NavigatorStyles.appName}>Musemur</Text>
                <Text style={NavigatorStyles.userName}>Bienvenido {userName}</Text>
            </View>
            <View style={NavigatorStyles.drawerContent}>
                <DrawerItem
                    label="Inicio"
                    labelStyle={NavigatorStyles.drawerLabel}
                    icon={() => <Icon name="home" type="feather" style={styles.icon} />}
                    onPress={() => {
                        props.navigation.navigate('Inicio')
                    }}
                />
                <DrawerItem
                    label="Perfil"
                    labelStyle={NavigatorStyles.drawerLabel}
                    icon={() => <Icon name="user" type="feather" style={styles.icon} />}
                    onPress={() => {
                        props.navigation.navigate('Perfil')
                    }}
                />
                <DrawerItem
                    label="Ajustes"
                    labelStyle={NavigatorStyles.drawerLabel}
                    icon={() => <Icon name="settings" type="feather" style={styles.icon} />}
                    onPress={() => {
                        props.navigation.navigate('Settings')
                    }}
                />
                <DrawerItem
                    label="Info"
                    labelStyle={NavigatorStyles.drawerLabel}
                    icon={() => <Icon name="info" type="feather" style={styles.icon} />}
                    onPress={() => {
                        props.navigation.navigate('Info')
                    }}
                />
            </View>
            <DrawerItem
                label="Cerrar Sesión"
                labelStyle={NavigatorStyles.logoutLabel}
                icon={() => <Icon name="log-out" type="feather" style={styles.icon} color={colors.RED} />}
                onPress={() => {
                    Alert.alert('Cerrar Sesión', '¿Estás seguro de que deseas cerrar sesión?', [
                        { text: 'Cancelar', style: 'cancel' },
                        { text: 'Cerrar Sesión', onPress: handleLogout },
                    ]);
                }}
            />
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    }
});

export default function AppDrawerNavigatorUser() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen name="User" component={BottomTabNavigatorApp} />
            <Drawer.Screen name="Museum" component={MuseumScreen} />
        </Drawer.Navigator>
    );
}
