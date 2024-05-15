import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import colors from "@styles/colors";
import { EditProfStyles } from "@styles/styles";

// Componente funcional para editar el perfil
const EditProfileScreen = ({ navigation }) => {
    // Estado inicial del componente
    const [nombre, setNombre] = useState("Juan");
    const [apellidos, setApellidos] = useState("Pérez García");
    const [dni, setDni] = useState("12345678Z");
    const [email, setEmail] = useState("juan.perez@example.com");

    // Maneja la confirmación de guardado de cambios
    const handleSave = () => {
        Alert.alert("Guardar Cambios", "¿Está seguro que desea guardar los cambios?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Guardar", onPress: saveChanges }
        ]);
    };

    // Guarda los cambios y navega de regreso al perfil
    const saveChanges = () => {
        // Simulamos guardar los cambios y mostramos una confirmación
        Alert.alert("Confirmación", "Los cambios han sido guardados correctamente.", [
            { text: "OK", onPress: () => navigation.navigate('Perfil', { nombre, apellidos, dni, email }) }
        ]);
    };

    return (
        <View style={EditProfStyles.container}>
            {/* Botón para volver a la pantalla anterior */}
            <TouchableOpacity onPress={() => navigation.navigate('App')} style={EditProfStyles.backButton}>
                <Icon name='arrow-back' size={30} color={colors.PRIMARYCOLOR} />
                <Text style={EditProfStyles.backButtonText}>Volver</Text>
            </TouchableOpacity>
            <Text style={EditProfStyles.title}>Editar Perfil</Text>
            
            {/* Campo para el nombre */}
            <View style={EditProfStyles.inputContainer}>
                <Text style={EditProfStyles.label}>Nombre:</Text>
                <TextInput
                    style={EditProfStyles.input}
                    value={nombre}
                    onChangeText={setNombre}
                />
            </View>

            {/* Campo para los apellidos */}
            <View style={EditProfStyles.inputContainer}>
                <Text style={EditProfStyles.label}>Apellidos:</Text>
                <TextInput
                    style={EditProfStyles.input}
                    value={apellidos}
                    onChangeText={setApellidos}
                />
            </View>

            {/* Campo para el DNI */}
            <View style={EditProfStyles.inputContainer}>
                <Text style={EditProfStyles.label}>DNI:</Text>
                <TextInput
                    style={EditProfStyles.input}
                    value={dni}
                    onChangeText={setDni}
                />
            </View>

            {/* Campo para el correo electrónico */}
            <View style={EditProfStyles.inputContainer}>
                <Text style={EditProfStyles.label}>Correo Electrónico:</Text>
                <TextInput
                    style={EditProfStyles.input}
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            {/* Botón para guardar los cambios */}
            <TouchableOpacity style={EditProfStyles.saveButton} onPress={handleSave}>
                <Text style={EditProfStyles.saveButtonText}>Guardar Cambios</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditProfileScreen;