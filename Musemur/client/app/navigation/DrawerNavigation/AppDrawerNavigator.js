import React from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {NavigatorStyles} from '../../styles/styles.js';
import BottomTabNavigatorApp from '../BottomTabNavigation/BottomTabNavigatorApp.js';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={NavigatorStyles.drawerHeader}>
                <Image source={require('../../../assets/icon.png')} style={NavigatorStyles.logo} />
                <Text style={NavigatorStyles.appName}>Musemur</Text>
                <Text style={NavigatorStyles.userName}>Bienvenido Juan</Text>
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
                    label="Crear Reserva"
                    labelStyle={NavigatorStyles.drawerLabel}
                    onPress={() => {
                        props.navigation.navigate('Reserva')
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

export default function AppDrawerNavigatorUser() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen name="User" component={BottomTabNavigatorApp} />
        </Drawer.Navigator>
    );
}