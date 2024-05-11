import React from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../screens/LogInScreen';
import LoginScreenAdmins from '../screens/LogInScreenAdmins';
import PrincipalScreen from '../screens/PrincipalScreen';
import colors from '../styles/colors.js';
import RegisterUser from '../screens/RegisterUser.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import ReservasScreen from '../screens/ReservasScreen.js';
import CreateReserva from '../screens/CreateReserva.js';
import MuseumScreen from '../screens/MuseumScreen.js';
import EditProfileScreen from '../screens/EditProfile.js';

const Tab = createBottomTabNavigator();

function BottomTabNavigatorLogIn() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    let iconName;
                    if (route.name === 'Usuarios') {
                        iconName = 'person-outline';
                    } else if (route.name === 'Administradores') {
                        iconName = 'settings-outline';
                    }
                    return <Ionicons name={iconName} size={30} color={color} />;
                },
                tabBarActiveTintColor: colors.BLUE,
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Usuarios" component={LoginScreen} />
            <Tab.Screen name="Administradores" component={LoginScreenAdmins} />
        </Tab.Navigator>
    );
}

function BottomTabNavigatorApp() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    let iconName;
                    if (route.name === 'Inicio') {
                        iconName = 'home';
                    } else if (route.name === 'Reservas') {
                        iconName = 'calendar';
                    } else if (route.name === 'Perfil') {
                        iconName = 'person';
                    }
                    return <Ionicons name={iconName} size={30} color={color} />;
                },
                tabBarActiveTintColor: colors.BLUE,
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Inicio" component={PrincipalScreen} />
            <Tab.Screen name="Reservas" component={ReservasScreen} />
            <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
    <View style={styles.drawerHeader}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Text style={styles.appName}>Musemur</Text>
        <Text style={styles.userName}>Bienvenido Juan</Text>
    </View>
    <View style={styles.drawerContent}>
    <DrawerItem
        label="Ver Perfil"
        labelStyle={styles.drawerLabel}
        onPress={() => {
           props.navigation.navigate('Perfil') 
        }}
    />
    <DrawerItem
        label="Crear Reserva"
        labelStyle={styles.drawerLabel}
        onPress={() => {
           props.navigation.navigate('Reserva') 
        }}
    />
    </View>
    <DrawerItem
        label="Cerrar Sesión"
        labelStyle={styles.logoutLabel}
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

function AppDrawerNavigator() {
    return (
        <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{ headerShown: false }} 
    >
        <Drawer.Screen name="Principal" component={BottomTabNavigatorApp} />
    </Drawer.Navigator>
    );
}


function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={BottomTabNavigatorLogIn}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Registrarse"
                component={RegisterUser}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="App"
                component={AppDrawerNavigator}
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

const styles = StyleSheet.create({
    drawerHeader: {
        alignItems: 'center',
        marginVertical: 20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    userName: {
        fontSize: 18,
        color: 'gray',
    },
    logoutLabel: {
        color: 'red',
        fontWeight: 'bold',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.PRIMARYCOLOR,
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 15,
    },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    scrollView: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    item: {
        backgroundColor: "#f8f8f8",
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    previewImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        fontSize: 16,
        flexShrink: 1,
    },
});