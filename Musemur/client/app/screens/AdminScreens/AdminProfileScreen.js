import React from "react";
import { Text, View, TouchableOpacity, Alert, Image, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Icon from 'react-native-vector-icons/Feather';
import colors from "@styles/colors";
import { header } from "../../styles/styles";

// Componente funcional que representa la pantalla de perfil del administrador
const AdminProfileScreen = ({ navigation }) => {

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        Alert.alert("Cerrar Sesión", "¿Está seguro que desea cerrar sesión?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Cerrar Sesión", onPress: () => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            } }
        ]);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={header.header}>
                <Icon name="menu" size={30} color={colors.WHITE} onPress={() => navigation.openDrawer()} />
                <Text style={header.headerText}>Admin - Musemur</Text>
                <Image source={require('@assets/icon-app.png')} style={header.logo} />
            </View>

            <ScrollView contentContainerStyle={styles.profileContainer}>
                <View style={styles.profileHeader}>
                    <Image source={require('@assets/icon.png')} style={{ height: 100, width: 100, borderRadius: 50 }} />
                    <Text style={styles.profileHeaderLabel}>AdminUser</Text>
                </View>
                <View style={styles.profileItem}>
                    <Text style={styles.label}>Nombre</Text>
                    <Text style={styles.value}>Juan</Text>
                </View>
                <View style={styles.profileItem}>
                    <Text style={styles.label}>Apellidos</Text>
                    <Text style={styles.value}>Pérez García</Text>
                </View>
                <View style={styles.profileItem}>
                    <Text style={styles.label}>Correo Electrónico</Text>
                    <Text style={styles.value}>juan.perez@example.com</Text>
                </View>
                <View style={styles.profileItem}>
                    <Text style={styles.label}>DNI</Text>
                    <Text style={styles.value}>12345678Z</Text>
                </View>
                <View style={styles.profileItem}>
                    <Text style={styles.label}>Museo</Text>
                    <Text style={styles.value}>Museo de Historia Natural</Text>
                </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('AdminSettings')}>
                    <Icon name="settings" size={20} color="#fff" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Configuración</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Icon name="log-out" size={20} color="#fff" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITESECONDARY,
    },
    profileContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        margin: 16,
        flexGrow: 1,
    },
    profileHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    profileItem: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    profileHeaderLabel: {
        paddingLeft: 16,
        fontSize: 25,
        color: colors.BLACK,
        fontFamily: 'Inter_700Bold',
    },
    label: {
        fontSize: 16,
        color: colors.BLACK,
        marginBottom: 4,
        fontFamily: 'Inter_700Bold',
    },
    value: {
        fontSize: 16,
        color: colors.GRAY,
        fontFamily: 'Inter_400Regular',
    },
    buttonContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        margin: 16,
        marginTop: 0,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.PRIMARYCOLOR,
        paddingVertical: 15,
        borderRadius: 30,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.RED,
        paddingVertical: 15,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonIcon: {
        marginRight: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Inter_700Bold',
    },
});

export default AdminProfileScreen;
