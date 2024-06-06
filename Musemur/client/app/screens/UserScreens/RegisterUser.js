import React, { useState } from "react";
import { Text, TouchableOpacity, ScrollView, Image, View, TextInput, Alert, StyleSheet, Modal, ActivityIndicator } from "react-native";
import { loginStyles } from "@styles/styles.js";
import { ForgotPasswordStyles, ModalLoginAdminStyles } from "@styles/styles.js";
import color from "@styles/colors.js";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";
import CustomAlert from "@components/CustomAlert";

const RegisterUser = ({ navigation }) => {
    const [icHidePassword, setIcHidePassword] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const registerUser = async () => {
        if (!firstName || !surname || !username || !dni || !password || !confirmPassword || !email || !phone) {
            setError('Todos los campos son requeridos.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await fetch('https://musemur-production.up.railway.app/api/User', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_first_name: firstName,
                    user_surname: surname,
                    username,
                    user_phone: phone,
                    user_email: email,
                    user_dni: dni,
                    user_pswrd: password,
                    user_rol: 0
                })
            });

            if (!response.ok) {
                const message = await response.json();
                throw new Error(message.message || 'Error al registrar usuario');
            }

            setAlertTitle('Éxito');
            setAlertMessage('Usuario registrado exitosamente');
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
        <View style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <ScrollView contentContainerStyle={loginStyles.containerScroll}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='arrow-back' size={30} color={color.PRIMARYCOLOR} />
                            <Text style={[loginStyles.btntxt, { color: color.PRIMARYCOLOR, marginLeft: 5 }]}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Image source={require('@assets/icon.png')} style={{ height: 100, width: 100 }} />
                </View>
                <View>
                    <Text style={[loginStyles.cardTitle]}>Registrarse</Text>
                </View>
                <View style={loginStyles.inputGroup}>
                    <Text style={[loginStyles.label, !firstName && error ? ForgotPasswordStyles.inputError : null]}>Nombre</Text>
                    <TextInput
                        style={[loginStyles.input, !firstName && error ? ForgotPasswordStyles.inputError : null]}
                        placeholder="Ingresa tu nombre"
                        placeholderTextColor="#ccc"
                        value={firstName}
                        onChangeText={text => {
                            setFirstName(text);
                            setError('');
                        }}
                    />
                </View>
                <View style={loginStyles.inputGroup}>
                    <Text style={[loginStyles.label, !surname && error ? ForgotPasswordStyles.inputError : null]}>Apellidos</Text>
                    <TextInput
                        style={[loginStyles.input, !surname && error ? ForgotPasswordStyles.inputError : null]}
                        placeholder="Ingresa tus apellidos"
                        placeholderTextColor="#ccc"
                        value={surname}
                        onChangeText={text => {
                            setSurname(text);
                            setError('');
                        }}
                    />
                </View>
                <View style={loginStyles.inputGroup}>
                    <Text style={[loginStyles.label, !username && error ? ForgotPasswordStyles.inputError : null]}>Nombre de usuario</Text>
                    <TextInput
                        style={[loginStyles.input, !username && error ? ForgotPasswordStyles.inputError : null]}
                        placeholder="Elige un nombre de usuario"
                        placeholderTextColor="#ccc"
                        value={username}
                        onChangeText={text => {
                            setUsername(text);
                            setError('');
                        }}
                    />
                </View>
                <View style={loginStyles.inputGroup}>
                    <Text style={[loginStyles.label, !email && error ? ForgotPasswordStyles.inputError : null]}>Correo Electrónico</Text>
                    <TextInput
                        style={[loginStyles.input, !email && error ? ForgotPasswordStyles.inputError : null]}
                        placeholder="Ingresa tu correo electrónico"
                        placeholderTextColor="#ccc"
                        value={email}
                        onChangeText={text => {
                            setEmail(text);
                            setError('');
                        }}
                    />
                </View>
                <View style={loginStyles.inputGroup}>
                    <Text style={[loginStyles.label, !phone && error ? ForgotPasswordStyles.inputError : null]}>Teléfono</Text>
                    <TextInput
                        style={[loginStyles.input, !phone && error ? ForgotPasswordStyles.inputError : null]}
                        placeholder="Ingresa tu número de teléfono"
                        placeholderTextColor="#ccc"
                        value={phone}
                        onChangeText={text => {
                            setPhone(text);
                            setError('');
                        }}
                    />
                </View>
                <View style={loginStyles.inputGroup}>
                    <Text style={[loginStyles.label, !dni && error ? ForgotPasswordStyles.inputError : null]}>DNI</Text>
                    <TextInput
                        style={[loginStyles.input, !dni && error ? ForgotPasswordStyles.inputError : null]}
                        placeholder="Ingresa tu DNI"
                        placeholderTextColor="#ccc"
                        value={dni}
                        onChangeText={text => {
                            setDni(text);
                            setError('');
                        }}
                    />
                </View>
                <View style={loginStyles.inputGroup}>
                    <Text style={[loginStyles.label, !password && error ? ForgotPasswordStyles.inputError : null]}>Contraseña</Text>
                    <TextInput
                        style={[loginStyles.input, !password && error ? ForgotPasswordStyles.inputError : null]}
                        placeholder="Ingresa tu contraseña"
                        placeholderTextColor="#ccc"
                        secureTextEntry={icHidePassword}
                        value={password}
                        onChangeText={text => {
                            setPassword(text);
                            setError('');
                        }}
                    />
                </View>
                <View style={loginStyles.inputGroup}>
                    <Text style={[loginStyles.label, !confirmPassword && error ? ForgotPasswordStyles.inputError : null]}>Confirmar Contraseña</Text>
                    <TextInput
                        style={[loginStyles.input, !confirmPassword && error ? ForgotPasswordStyles.inputError : null]}
                        placeholder="Confirma tu contraseña"
                        placeholderTextColor="#ccc"
                        secureTextEntry={icHidePassword}
                        value={confirmPassword}
                        onChangeText={text => {
                            setConfirmPassword(text);
                            setError('');
                        }}
                    />
                    <TouchableOpacity onPress={() => setIcHidePassword(!icHidePassword)}>
                        <Text style={loginStyles.togglePassword}>{icHidePassword ? "Mostrar" : "Ocultar"}</Text>
                    </TouchableOpacity>
                </View>
                {error ? <Text style={ForgotPasswordStyles.errorText}>{error}</Text> : null}
                <View style={loginStyles.containerBtns}>
                    <TouchableOpacity style={loginStyles.btnMain} onPress={registerUser}>
                        <Text style={[loginStyles.btntxt, { color: color.WHITE }]}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Loading Modal */}
            {loading && (
                <Modal transparent={true} animationType="none" visible={loading}>
                    <View style={ModalLoginAdminStyles.modalBackground}>
                        <View style={ModalLoginAdminStyles.activityIndicatorWrapper}>
                            <ActivityIndicator size="large" color={color.PRIMARYCOLOR} />
                        </View>
                    </View>
                </Modal>
            )}

            {/* Custom Alert */}
            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                onConfirm={handleAlertConfirm}
            />
        </View>
    );
};
export default RegisterUser;