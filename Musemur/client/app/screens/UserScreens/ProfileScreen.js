import React from "react";
import { Text, View, TouchableOpacity, Alert, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";
import colors from "@styles/colors";
import { header, ProfileStyles } from "@styles/styles";

// Componente para la pantalla del perfil de usuario
const UserProfileScreen = ({ navigation }) => {
    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        Alert.alert("Cerrar Sesión", "¿Está seguro que desea cerrar sesión?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Cerrar Sesión", onPress: () => navigation.navigate('Login') }
        ]);
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.PRIMARYCOLOR }}>
            <StatusBar translucent={true} style="light" />
            
            <View style={header.header}>
                <Icon name="logout" size={30} color={colors.RED} onPress={handleLogout} />
                <Text style={header.headerText}>Musemur</Text>
                <Image source={require('@assets/icon.png')} style={header.logo} />
            </View>
            
            <View style={ProfileStyles.profileContainer}>
                <View style={ProfileStyles.profileItem}>
                    <Text style={ProfileStyles.label}>Nombre:</Text>
                    <Text style={ProfileStyles.value}>Juan</Text>
                </View>
                <View style={ProfileStyles.profileItem}>
                    <Text style={ProfileStyles.label}>Apellidos:</Text>
                    <Text style={ProfileStyles.value}>Pérez García</Text>
                </View>
                <View style={ProfileStyles.profileItem}>
                    <Text style={ProfileStyles.label}>DNI:</Text>
                    <Text style={ProfileStyles.value}>12345678Z</Text>
                </View>
                <View style={ProfileStyles.profileItem}>
                    <Text style={ProfileStyles.label}>Correo Electrónico:</Text>
                    <Text style={ProfileStyles.value}>juan.perez@example.com</Text>
                </View>
                
                <TouchableOpacity style={ProfileStyles.editButton} onPress={() => navigation.navigate('EditProfile')}>
                    <Text style={ProfileStyles.editButtonText}>Editar Perfil</Text>
                    <Icon name="edit" size={20} color="white" />
                </TouchableOpacity>
                
                <TouchableOpacity style={ProfileStyles.logoutButton} onPress={handleLogout}>
                    <Text style={ProfileStyles.logoutButtonText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default UserProfileScreen;