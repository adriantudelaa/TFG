import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '@styles/colors';
import { ForgotPasswordStyles } from '@styles/styles';

// Componente funcional para la pantalla de recuperación de contraseña
const ForgotPasswordScreen = ({ navigation }) => {
    // Estado inicial del componente
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    // Método para manejar el envío del correo de recuperación
    const handleResetPassword = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validar el email
        if (!emailPattern.test(email)) {
            setError('Por favor, introduce un correo electrónico válido.');
        } else {
            // Simular el envío del correo de recuperación
            Alert.alert('Correo de recuperación enviado', 'Revisa tu correo para restablecer tu contraseña.');
        }
    };

    return (
        <View style={ForgotPasswordStyles.container}>
            {/* Botón para volver a la pantalla anterior */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={ForgotPasswordStyles.backButton}>
                <Ionicons name="arrow-back" size={24} color={colors.PRIMARYCOLOR} />
                <Text style={ForgotPasswordStyles.backButtonText}>Volver</Text>
            </TouchableOpacity>
            
            {/* Logo de la aplicación */}
            <Image source={require('@assets/icon.png')} style={ForgotPasswordStyles.logo} />
            
            {/* Título de la pantalla */}
            <Text style={ForgotPasswordStyles.title}>Recuperar Contraseña</Text>
            
            {/* Campo de texto para el correo electrónico */}
            <TextInput
                style={[ForgotPasswordStyles.input, error ? ForgotPasswordStyles.inputError : null]}
                placeholder="Correo Electrónico"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    setError('');
                }}
            />
            
            {/* Mensaje de error si el correo no es válido */}
            {error ? <Text style={ForgotPasswordStyles.errorText}>{error}</Text> : null}
            
            {/* Botón para enviar el correo de recuperación */}
            <TouchableOpacity style={ForgotPasswordStyles.button} onPress={handleResetPassword}>
                <Text style={ForgotPasswordStyles.buttonText}>Enviar Correo de Recuperación</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ForgotPasswordScreen;