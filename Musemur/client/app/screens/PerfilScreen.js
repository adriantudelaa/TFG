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

    render() {
        const { navigation } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent={true} />
                <View style={styles.header}>
                <Image source={require('../../assets/icon.png')}
                        style={{ height: 50, width: 50
                         }} />
                    <Text style={styles.headerText}>Musemur</Text>
                    <Icon name="notifications" size={30} color="white" />
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
                    <TouchableOpacity style={styles.logoutButton} onPress={this.handleLogout}>
                        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
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
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 15,
    },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    profileContainer: {
        flex: 1,
        padding: 20,
    },
    profileItem: {
        flexDirection: "row",
        marginBottom: 20,
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        width: 120,
    },
    value: {
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: "red",
        padding: 15,
        alignItems: "center",
        marginTop: "auto",
        borderRadius: 20
    },
    logoutButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
