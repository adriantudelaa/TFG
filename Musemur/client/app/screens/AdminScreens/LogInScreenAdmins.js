import React, { useState } from "react";
import { Text, TouchableOpacity, Image, View, TextInput, Modal, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginStyles, ModalLoginAdminStyles } from "@styles/styles.js";
import colors from "@styles/colors.js";
import CustomAlert from '@components/CustomAlert.js';

const LoginScreenAdmins = ({ navigation }) => {
    const [icHidePassword, setIcHidePassword] = useState(true);
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [adminDni, setAdminDni] = useState('');

    const loginAdmin = async (user_dni, user_pswrd) => {
        setLoading(true);
        try {
            const response = await axios.post('https://musemur-production.up.railway.app/api/AdminLogin', {
                user_dni, user_pswrd
            });

            if (response.data.token) {
                await AsyncStorage.setItem('authToken', response.data.token);
                await AsyncStorage.setItem('userRole', '1');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AppAdmin' }],
                });
            } else {
                throw new Error('Token de autenticación no recibido');
            }
        } catch (error) {
            handleAlert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = () => {
        if (!dni || !password) {
            handleAlert('Error', 'Se requiere DNI y contraseña');
            return;
        }
        loginAdmin(dni, password);
    };

    const handleAdminRegistration = async () => {
        if (!adminDni) {
            handleAlert('Error', 'Se requiere DNI');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('https://musemur-production.up.railway.app/api/VerifyAdminDni', {
                user_dni: adminDni
            });

            if (response.status === 200) {
                setModalVisible(false);
                navigation.navigate('RegisterAdmin');
            } else {
                throw new Error('Error al verificar DNI');
            }
        } catch (error) {
            handleAlert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAlert = (title, message) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(true);
    };

    const handleAlertConfirm = () => {
        setAlertVisible(false);
    };

    return (
        <View style={loginStyles.container}>
            <StatusBar style="auto" />
            <ScrollView contentContainerStyle={loginStyles.containerScroll}>
                <View style={loginStyles.logo}>
                    <Image source={require('@assets/icon.png')} style={{ height: 200, width: 200 }} />
                </View>
                <View style={loginStyles.card}>
                    <View style={loginStyles.cardHeader}>
                        <Text style={loginStyles.cardTitle}>Iniciar sesión</Text>
                        <Text style={loginStyles.cardDescription}>Administradores</Text>
                    </View>
                    <View style={loginStyles.cardContent}>
                        <View style={loginStyles.inputGroup}>
                            <Text style={loginStyles.label}>NIF</Text>
                            <TextInput
                                style={loginStyles.input}
                                keyboardType='default'
                                placeholder='NIF'
                                placeholderTextColor="#888"
                                value={dni}
                                onChangeText={setDni}
                            />
                        </View>
                        <View style={loginStyles.inputGroup}>
                            <Text style={loginStyles.label}>Contraseña</Text>
                            <TextInput
                                style={loginStyles.input}
                                placeholder='Contraseña'
                                secureTextEntry={icHidePassword}
                                placeholderTextColor="#888"
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity onPress={() => setIcHidePassword(!icHidePassword)}>
                                <Text style={loginStyles.togglePassword}>{icHidePassword ? "Mostrar" : "Ocultar"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={loginStyles.cardFooter}>
                        <TouchableOpacity style={loginStyles.btnMain} onPress={handleLogin}>
                            <Text style={loginStyles.btntxt}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {loading && (
                <Modal transparent={true} animationType="none" visible={loading}>
                    <View style={ModalLoginAdminStyles.modalBackground}>
                        <View style={ModalLoginAdminStyles.activityIndicatorWrapper}>
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
        </View>
    );
};

export default LoginScreenAdmins;