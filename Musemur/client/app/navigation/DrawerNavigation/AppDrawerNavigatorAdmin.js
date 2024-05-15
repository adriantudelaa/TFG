import React from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigatorStyles } from '../../styles/styles.js';
import BottomTabNavigatorAppAdmin from '../BottomTabNavigation/BottomTabNavigatorAppAdmin.js';

const Drawer = createDrawerNavigator();

function CustomDrawerContentAdmin(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={NavigatorStyles.drawerHeader}>
                <Image source={require('../../../assets/icon.png')} style={NavigatorStyles.logo} />
                <Text style={NavigatorStyles.appName}>Musemur</Text>
                <Text style={NavigatorStyles.userName}>Administradores</Text>
            </View>
            <View style={NavigatorStyles.drawerContent}>
                <DrawerItem
                    label="Ver Perfil"
                    labelStyle={NavigatorStyles.drawerLabel}
                    onPress={() => {
                        props.navigation.navigate('Perfil')
                    }}
                />
                <DrawerItem
                    label="Gestionar Reservas"
                    labelStyle={NavigatorStyles.drawerLabel}
                    onPress={() => {
                        props.navigation.navigate('Gestor Reservas')
                    }}
                />
                <DrawerItem
                    label="Gestionar ChatBox"
                    labelStyle={NavigatorStyles.drawerLabel}
                    onPress={() => {
                        props.navigation.navigate('Gestor ChatBox')
                    }}
                />
            </View>
            <DrawerItem
                label="Cerrar Sesión"
                labelStyle={NavigatorStyles.logoutLabel}
                onPress={() => {
                    Alert.alert('Cerrar Sesión', '¿Estás seguro de que deseas cerrar sesión?', [
                        { text: 'Cancelar', style: 'cancel' },
                        { text: 'Cerrar Sesión', onPress: () => props.navigation.navigate('Login') },
                    ]);
                }}
            />
        </DrawerContentScrollView>
    );
}

export default function AppDrawerNavigatorAdmin() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContentAdmin {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen name="Admin" component={BottomTabNavigatorAppAdmin} />
        </Drawer.Navigator>
    );
}