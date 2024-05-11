import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import colors from "../styles/colors";

export default class EditProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: "Juan",
            apellidos: "Pérez García",
            dni: "12345678Z",
            email: "juan.perez@example.com",
        };
    }

    handleSave = () => {
        Alert.alert("Guardar Cambios", "¿Está seguro que desea guardar los cambios?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Guardar", onPress: this.saveChanges }
        ]);
    }

    saveChanges = () => {
        // Simulamos guardar los cambios y mostramos una confirmación
        Alert.alert("Confirmación", "Los cambios han sido guardados correctamente.", [
            { text: "OK", onPress: () => this.props.navigation.navigate('Perfil', { ...this.state }) }
        ]);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Editar Perfil</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nombre:</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.nombre}
                        onChangeText={(text) => this.setState({ nombre: text })}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Apellidos:</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.apellidos}
                        onChangeText={(text) => this.setState({ apellidos: text })}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>DNI:</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.dni}
                        onChangeText={(text) => this.setState({ dni: text })}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Correo Electrónico:</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                </View>
                <TouchableOpacity style={styles.saveButton} onPress={this.handleSave}>
                    <Text style={styles.saveButtonText}>Guardar Cambios</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 8,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: colors.PRIMARYCOLOR,
        padding: 15,
        alignItems: "center",
        borderRadius: 20,
    },
    saveButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
