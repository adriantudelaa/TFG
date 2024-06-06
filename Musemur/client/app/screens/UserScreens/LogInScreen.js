import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Image, TextInput, Modal, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import axios from 'axios';
import { loginStyles } from "@styles/styles.js";
import colors from "@styles/colors.js";
import CustomAlert from '@components/CustomAlert';

const LoginScreen = ({ navigation }) => {
    const [icHidePassword, setIcHidePassword] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const checkSession = async () => {
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'App' }],
                });
            }
        };
        checkSession();
    }, [navigation]);

    const loginUser = async (user_email, user_pswrd) => {
        setLoading(true);
        try {
            const response = await axios.post('https://musemur-production.up.railway.app/api/Userlogin', {
                user_email,
                user_pswrd
            });

            const data = response.data;
            if (data.token && data.userName) {
                await AsyncStorage.setItem('authToken', data.token);
                await AsyncStorage.setItem('userName', data.userName);

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'App' }],
                });
            } else {
                throw new Error('Token de autenticación o nombre de usuario no recibido');
            }
        } catch (error) {
            setAlertTitle('Error');
            setAlertMessage(error.response?.data?.message || error.message);
            setAlertVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = () => {
        if (!email || !password) {
            setAlertTitle('Error');
            setAlertMessage('Se requiere usuario y contraseña');
            setAlertVisible(true);
            return;
        }

        loginUser(email, password);
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
                    </View>
                    <View style={loginStyles.cardContent}>
                        <View style={loginStyles.inputGroup}>
                            <Text style={loginStyles.label}>Correo Electrónico</Text>
                            <TextInput
                                style={loginStyles.input}
                                keyboardType='email-address'
                                placeholder='ejemplo@dominio.com'
                                autoCapitalize="none"
                                autoCompleteType="email"
                                placeholderTextColor="#888"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                        <View style={loginStyles.inputGroup}>
                            <View style={loginStyles.flexRow}>
                                <Text style={loginStyles.label}>Contraseña</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                                    <Text style={loginStyles.link}>¿Olvidaste tu contraseña?</Text>
                                </TouchableOpacity>
                            </View>
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
                            <Text style={loginStyles.btntxt}>Iniciar sesión</Text>
                        </TouchableOpacity>
                        <View style={loginStyles.footerText}>
                            <Text style={loginStyles.footerDescription}>¿No tienes una cuenta? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Registrarse')}>
                                <Text style={loginStyles.link}>Regístrate</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
        </View>
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

export default LoginScreen;
