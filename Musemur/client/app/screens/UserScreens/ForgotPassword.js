import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, SafeAreaView, ScrollView, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import colors from '@styles/colors';
import { ForgotPasswordStyles, loginStyles } from '@styles/styles';
import CustomAlert from '@components/CustomAlert.js';

const ForgotPasswordScreen = ({ navigation }) => {
    const [icHidePassword, setIcHidePassword] = useState(true);
    const [email, setEmail] = useState('');
    const [dni, setDni] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const validarCampos = () => {
        const errores = {};
        if (!email) errores.email = 'El correo electrónico es requerido';
        if (!dni) errores.dni = 'El DNI es requerido';
        if (!newPassword) errores.newPassword = 'La nueva contraseña es requerida';
        if (newPassword !== confirmPassword) errores.confirmPassword = 'Las contraseñas no coinciden';
        return errores;
    };

    const handleResetPassword = async () => {
        const errores = validarCampos();
        setError(errores);

        if (Object.keys(errores).length > 0) {
            setAlertTitle('Error');
            setAlertMessage('Por favor, completa todos los campos correctamente.');
            setAlertVisible(true);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('https://musemur-production.up.railway.app/api/ResetPassword', {
                user_email: email,
                user_dni: dni,
                new_password: newPassword,
            });

            if (response.status !== 200) {
                throw new Error(response.data.message || 'Error al restablecer la contraseña');
            }

            setAlertTitle('Éxito');
            setAlertMessage('Contraseña actualizada correctamente');
            setAlertVisible(true);
        } catch (error) {
            setAlertTitle('Error');
            setAlertMessage(error.message);
            setAlertVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const handleAlertConfirm = () => {
        setAlertVisible(false);
        if (alertTitle === 'Éxito') {
            navigation.navigate('Login');
        }
    };

    return (
        <SafeAreaView style={ForgotPasswordStyles.container}>
            <StatusBar style="auto" />
            <ScrollView contentContainerStyle={ForgotPasswordStyles.containerScroll}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={ForgotPasswordStyles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.PRIMARYCOLOR} />
                    <Text style={[loginStyles.btntxt, { color: colors.PRIMARYCOLOR, marginLeft: 5 }]}>Volver</Text>
                </TouchableOpacity>

                <Image source={require('@assets/icon.png')} style={ForgotPasswordStyles.logo} />

                <View style={ForgotPasswordStyles.card}>
                    <View style={ForgotPasswordStyles.cardHeader}>
                        <Text style={ForgotPasswordStyles.cardTitle}>Recuperar Contraseña</Text>
                        <Text style={ForgotPasswordStyles.cardDescription}>
                            Ingresa tu correo electrónico, DNI y la nueva contraseña.
                        </Text>
                    </View>

                    <View style={ForgotPasswordStyles.inputGroup}>
                        <TextInput
                            style={[ForgotPasswordStyles.input, error.email ? ForgotPasswordStyles.inputError : null]}
                            placeholder="Correo Electrónico"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setError('');
                            }}
                        />
                    </View>

                    <View style={ForgotPasswordStyles.inputGroup}>
                        <TextInput
                            style={[ForgotPasswordStyles.input, error.dni ? ForgotPasswordStyles.inputError : null]}
                            placeholder="DNI"
                            keyboardType="default"
                            value={dni}
                            onChangeText={(text) => {
                                setDni(text);
                                setError('');
                            }}
                        />
                    </View>

                    <View style={ForgotPasswordStyles.inputGroup}>
                        <TextInput
                            style={[ForgotPasswordStyles.input, error.newPassword ? ForgotPasswordStyles.inputError : null]}
                            placeholder="Nueva Contraseña"
                            secureTextEntry={icHidePassword}
                            value={newPassword}
                            onChangeText={(text) => {
                                setNewPassword(text);
                                setError('');
                            }}
                        />
                    </View>

                    <View style={ForgotPasswordStyles.inputGroup}>
                        <TextInput
                            style={[ForgotPasswordStyles.input, error.confirmPassword ? ForgotPasswordStyles.inputError : null]}
                            placeholder="Confirmar Nueva Contraseña"
                            secureTextEntry={icHidePassword}
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                                setError('');
                            }}
                        />
                        <TouchableOpacity onPress={() => setIcHidePassword(!icHidePassword)}>
                            <Text style={loginStyles.togglePassword}>{icHidePassword ? "Mostrar" : "Ocultar"}</Text>
                        </TouchableOpacity>
                    </View>

                    {Object.keys(error).length > 0 && (
                        <Text style={ForgotPasswordStyles.errorText}>Por favor, corrige los errores antes de continuar.</Text>
                    )}

                    <TouchableOpacity style={ForgotPasswordStyles.button} onPress={handleResetPassword}>
                        <Text style={ForgotPasswordStyles.btntxt}>Actualizar Contraseña</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {loading && (
                <Modal transparent={true} animationType="none" visible={loading}>
                    <View style={styles.modalBackground}>
                        <View style={styles.activityIndicatorWrapper}>
                            <ActivityIndicator size="large" color={colors.PRIMARYCOLOR} />
                        </View>
                    </View>
                </Modal>
            )}

            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                onConfirm={handleAlertConfirm}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ForgotPasswordScreen;
