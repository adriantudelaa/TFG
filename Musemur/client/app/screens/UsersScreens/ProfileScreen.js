import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";
import colors from "../styles/colors";

export default class UserProfileScreen extends Component {
    handleLogout = () => {
        Alert.alert("Cerrar Sesión", "¿Está seguro que desea cerrar sesión?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Cerrar Sesión", onPress: () => this.props.navigation.navigate('Login') }
        ]);
    }

    handleEditProfile = () => {
        this.props.navigation.navigate('EditProfile');
    }

    render() {
        return (
            <View style={[{ flex: 1 , backgroundColor: colors.PRIMARYCOLOR}]}>
                <StatusBar translucent={true} style="light" />
                <View style={styles.header}>
                    <Image source={require('../../assets/icon.png')} style={styles.logo} />
                    <Text style={styles.headerText}>Musemur</Text>
                    <Icon name="logout" size={30} color={colors.RED} onPress={this.handleLogout} />
                </View>
                <View style={styles.profileContainer}>
                    <View style={styles.profileItem}>
                        <Text style={styles.label}>Nombre:</Text>
                        <Text style={styles.value}>Juan</Text>
                    </View>
                    <View style={styles.profileItem}>
                        <Text style={styles.label}>Apellidos:</Text>
                        <Text style={styles.value}>Pérez García</Text>
                    </View>
                    <View style={styles.profileItem}>
                        <Text style={styles.label}>DNI:</Text>
                        <Text style={styles.value}>12345678Z</Text>
                    </View>
                    <View style={styles.profileItem}>
                        <Text style={styles.label}>Correo Electrónico:</Text>
                        <Text style={styles.value}>juan.perez@example.com</Text>
                    </View>
                    <TouchableOpacity style={styles.editProfileButton} onPress={this.handleEditProfile}>
                        <Text style={styles.editProfileButtonText}>Editar Perfil</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.PRIMARYCOLOR,
        paddingTop: 50,
        paddingBottom: 30,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    logo: {
        height: 50,
        width: 50
    },
    headerText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    profileContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
    },
    profileItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3
    },
    label: {
        fontWeight: "bold",
        fontSize: 18,
        width: 100,
        color: colors.BLACK,
    },
    value: {
        flex: 1,
        fontSize: 16,
        color: "#666",
    },
    editProfileButton: {
        backgroundColor: colors.PRIMARYCOLOR,
        padding: 15,
        alignItems: "center",
        borderRadius: 30,
        marginVertical: 10,
    },
    editProfileButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    logoutButton: {
        backgroundColor: "red",
        padding: 15,
        alignItems: "center",
        borderRadius: 30,
        marginTop: "auto",
    },
    logoutButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});
