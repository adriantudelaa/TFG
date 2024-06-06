import React from 'react';
import { View, Text, Image, Alert, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigatorStyles } from '@styles/styles.js';
import BottomTabNavigatorAppAdmin from '../BottomTabNavigation/BottomTabNavigatorAppAdmin.js';
import AdminMuseum from '@Screens/AdminScreens/AdminMuseumScreen.js';
import { Icon } from 'react-native-elements';
import colors from '@styles/colors.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

function CustomDrawerContentAdmin(props) {
    const handleLogout = async () => {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('userRole');
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <DrawerContentScrollView {...props}>
            <View style={NavigatorStyles.drawerHeader}>
                <Image source={require('@assets/icon-app.png')} style={NavigatorStyles.logo} />
                <Text style={NavigatorStyles.appName}>Musemur</Text>
                <Text style={NavigatorStyles.userName}>Administradores</Text>
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

export default function AppDrawerNavigatorAdmin() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContentAdmin {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen name="Admin" component={BottomTabNavigatorAppAdmin} />
            <Drawer.Screen name="AdminMuseum" component={AdminMuseum} />
        </Drawer.Navigator>
    );
}
