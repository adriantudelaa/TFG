import React from "react";
import { Text, View, TouchableOpacity, Alert, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";
import colors from "@styles/colors";
import { header, ProfileAdminStyles } from "@styles/styles";

// Componente funcional que representa la pantalla de perfil del administrador
const AdminProfileScreen = ({ navigation }) => {

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        // Muestra una alerta de confirmación para cerrar sesión
        Alert.alert("Cerrar Sesión", "¿Está seguro que desea cerrar sesión?", [
            { text: "Cancelar", style: "cancel" }, // Opción de cancelar
            { text: "Cerrar Sesión", onPress: () => navigation.navigate('Login') } // Opción de confirmar y navegar a la pantalla de inicio de sesión
        ]);
    };

    return (
        // Vista principal con fondo de color personalizado
        <View style={[{ flex: 1, backgroundColor: colors.ADMINPRIMARYCOLOR }]}>
            <StatusBar translucent={true} style="light" />
            {/* Barra de estado */}
            <View style={header.header}>
                {/* Sección de encabezado */}
                <Icon name="logout" size={30} color={colors.RED} onPress={handleLogout} />
                {/* Icono de cierre de sesión */}
                <Text style={header.headerText}>Admin - Musemur</Text>
                {/* Título del encabezado */}
                <Image source={require('@assets/icon.png')} style={header.logo} />
                {/* Logo */}
            </View>
            <View style={ProfileAdminStyles.profileContainer}>
                {/* Información del perfil */}
                <View style={ProfileAdminStyles.profileItem}>
                    <Text style={ProfileAdminStyles.label}>Nombre:</Text>
                    <Text style={ProfileAdminStyles.value}>Juan</Text>
                </View>
                <View style={ProfileAdminStyles.profileItem}>
                    <Text style={ProfileAdminStyles.label}>Apellidos:</Text>
                    <Text style={ProfileAdminStyles.value}>Pérez García</Text>
                </View>
                <View style={ProfileAdminStyles.profileItem}>
                    <Text style={ProfileAdminStyles.label}>DNI:</Text>
                    <Text style={ProfileAdminStyles.value}>12345678Z</Text>
                </View>
                <View style={ProfileAdminStyles.profileItem}>
                    <Text style={ProfileAdminStyles.label}>Correo Electrónico:</Text>
                    <Text style={ProfileAdminStyles.value}>juan.perez@example.com</Text>
                </View>
                <View style={ProfileAdminStyles.profileItem}>
                    <Text style={ProfileAdminStyles.label}>Museo:</Text>
                    <Text style={ProfileAdminStyles.value}>Museo de Historia Natura</Text>
                </View>
                <TouchableOpacity style={ProfileAdminStyles.logoutButton} onPress={handleLogout}>
                    {/* Botón de cierre de sesión */}
                    <Text style={ProfileAdminStyles.logoutButtonText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AdminProfileScreen;
