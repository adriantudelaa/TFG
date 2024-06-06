import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import { loginStyles, SettingsStyles } from '@styles/styles.js';
import colors from '@styles/colors.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfiguracionCuenta = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [dni, setDni] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [errores, setErrores] = useState({});
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        fetchUserData();
        fetchProfilePhoto();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                const response = await axios.get('https://musemur-production.up.railway.app/api/UserProfile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const userData = response.data;
                setNombre(userData.user_first_name);
                setApellidos(userData.user_surname);
                setCorreo(userData.user_email);
                setDni(userData.user_dni);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchProfilePhoto = async () => {
        try {
            const savedPhoto = await AsyncStorage.getItem('profilePhoto');
            if (savedPhoto) {
                setFotoPerfil(savedPhoto);
            }
        } catch (error) {
            console.error('Error fetching profile photo:', error);
        }
    };

    const validarDNI = (dni) => {
        const regexDNI = /^\d{8}[a-zA-Z]$/;
        const regexNIE = /^[XYZxyz]\d{7}[a-zA-Z]$/;
        return regexDNI.test(dni) || regexNIE.test(dni);
    };

    const validarCorreo = (correo) => {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexCorreo.test(correo);
    };

    const handleGuardarCambios = async () => {
        let erroresTemp = {};

        if (dni && !validarDNI(dni)) {
            erroresTemp.dni = 'El DNI/NIE no es válido';
        }

        if (correo && !validarCorreo(correo)) {
            erroresTemp.correo = 'El correo electrónico no es válido';
        }

        setErrores(erroresTemp);

        if (Object.keys(erroresTemp).length === 0) {
            try {
                const token = await AsyncStorage.getItem('authToken');
                await axios.put('https://musemur-production.up.railway.app/api/UserData', {
                    user_first_name: nombre,
                    user_surname: apellidos,
                    user_email: correo,
                    user_dni: dni
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                Alert.alert('Éxito', 'Datos actualizados correctamente');
            } catch (error) {
                console.error('Error updating user data:', error);
                Alert.alert('Error', 'Hubo un problema al actualizar los datos');
            }
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'La nueva contraseña y la confirmación no coinciden');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('authToken');
            await axios.put('https://musemur-production.up.railway.app/api/UserPswrd', {
                user_email: correo,
                current_pswrd: currentPassword,
                new_pswrd: newPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            Alert.alert('Éxito', 'Contraseña actualizada correctamente');
        } catch (error) {
            console.error('Error updating password:', error);
            Alert.alert('Error', 'Hubo un problema al actualizar la contraseña');
        }
    };

    const seleccionarFotoPerfil = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Se requieren permisos para acceder a la biblioteca de imágenes.");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            setFotoPerfil(pickerResult.assets[0].uri);
            await AsyncStorage.setItem('profilePhoto', pickerResult.assets[0].uri);
        }
    };

    const handleDeleteAccount = async () => {
        Alert.alert(
            "Eliminar Cuenta",
            "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.",
            [
                { text: "No", style: "cancel" },
                { text: "Sí", onPress: deleteAccount }
            ]
        );
    };

    const deleteAccount = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            await axios.delete('https://musemur-production.up.railway.app/api/User', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            await AsyncStorage.removeItem('authToken');
            await AsyncStorage.removeItem('profilePhoto');
            Alert.alert('Éxito', 'Cuenta eliminada correctamente', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Login'),
                },
            ]);
        } catch (error) {
            console.error('Error deleting account:', error);
            Alert.alert('Error', 'Hubo un problema al eliminar la cuenta');
        }
    };

    return (
        <ScrollView contentContainerStyle={SettingsStyles.containerScroll}>
            <StatusBar style="auto" />
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 }}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='arrow-back' size={30} color={colors.PRIMARYCOLOR} />
                        <Text style={[loginStyles.btntxt, { color: colors.PRIMARYCOLOR, marginLeft: 5 }]}>Volver</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={SettingsStyles.card}>
                <View style={SettingsStyles.cardHeader}>
                    <Text style={SettingsStyles.cardTitle}>Configuración de Cuenta</Text>
                    <Text style={SettingsStyles.cardDescription}>Administra la información de tu cuenta.</Text>
                </View>
                <View style={SettingsStyles.cardContent}>
                    <View style={SettingsStyles.inputGroup}>
                        <Text style={SettingsStyles.label}>Foto de Perfil</Text>
                        <TouchableOpacity onPress={seleccionarFotoPerfil} style={SettingsStyles.fotoPerfilContainer}>
                            {!fotoPerfil && <Icon name="camera" size={30} color="#ccc" />}
                            {fotoPerfil && <Image source={{ uri: fotoPerfil }} style={SettingsStyles.fotoPerfil} />}
                        </TouchableOpacity>
                    </View>
                    <View style={SettingsStyles.inputGroup}>
                        <Text style={SettingsStyles.label}>Nombre</Text>
                        <TextInput
                            style={SettingsStyles.input}
                            placeholder="Ingresa tu nombre"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                    </View>
                    <View style={SettingsStyles.inputGroup}>
                        <Text style={SettingsStyles.label}>Apellidos</Text>
                        <TextInput
                            style={SettingsStyles.input}
                            placeholder="Ingresa tus apellidos"
                            value={apellidos}
                            onChangeText={setApellidos}
                        />
                    </View>
                    <View style={SettingsStyles.inputGroup}>
                        <Text style={SettingsStyles.label}>Correo Electrónico</Text>
                        <TextInput
                            style={[SettingsStyles.input, errores.correo ? SettingsStyles.inputError : null]}
                            placeholder="Ingresa tu correo electrónico"
                            keyboardType="email-address"
                            value={correo}
                            onChangeText={setCorreo}
                        />
                        {errores.correo && <Text style={SettingsStyles.errorText}>{errores.correo}</Text>}
                    </View>
                    <View style={SettingsStyles.inputGroup}>
                        <Text style={SettingsStyles.label}>DNI</Text>
                        <TextInput
                            style={[SettingsStyles.input, errores.dni ? SettingsStyles.inputError : null]}
                            placeholder="Ingresa tu DNI"
                            value={dni}
                            onChangeText={setDni}
                        />
                        {errores.dni && <Text style={SettingsStyles.errorText}>{errores.dni}</Text>}
                    </View>
                </View>
                <View style={SettingsStyles.cardFooter}>
                    <TouchableOpacity style={SettingsStyles.btnMain} onPress={handleGuardarCambios}>
                        <Text style={SettingsStyles.btntxt}>Guardar Cambios</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={SettingsStyles.card}>
                <View style={SettingsStyles.cardHeader}>
                    <Text style={SettingsStyles.cardTitle}>Contraseña</Text>
                    <Text style={SettingsStyles.cardDescription}>Actualiza la contraseña de tu cuenta.</Text>
                </View>
                <View style={SettingsStyles.cardContent}>
                    <View style={SettingsStyles.inputGroup}>
                        <Text style={SettingsStyles.label}>Contraseña Actual</Text>
                        <TextInput 
                            style={SettingsStyles.input} 
                            placeholder="Ingresa tu contraseña actual" 
                            secureTextEntry={true} 
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                        />
                    </View>
                    <View style={SettingsStyles.inputGroup}>
                        <Text style={SettingsStyles.label}>Nueva Contraseña</Text>
                        <TextInput 
                            style={SettingsStyles.input} 
                            placeholder="Ingresa tu nueva contraseña" 
                            secureTextEntry={true} 
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                    </View>
                    <View style={SettingsStyles.inputGroup}>
                        <Text style={SettingsStyles.label}>Confirmar Contraseña</Text>
                        <TextInput 
                            style={SettingsStyles.input} 
                            placeholder="Confirma tu nueva contraseña" 
                            secureTextEntry={true} 
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    </View>
                </View>
                <View style={SettingsStyles.cardFooter}>
                    <TouchableOpacity style={SettingsStyles.btnMain} onPress={handleChangePassword}>
                        <Text style={SettingsStyles.btntxt}>Cambiar Contraseña</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={SettingsStyles.card}>
                <View style={SettingsStyles.cardHeader}>
                    <Text style={SettingsStyles.cardTitle}>Eliminar Cuenta</Text>
                    <Text style={SettingsStyles.cardDescription}>Elimina tu cuenta y todos tus datos de forma permanente.</Text>
                </View>
                <View style={SettingsStyles.cardContent}>
                    <Text style={SettingsStyles.warningText}>
                        Esta acción no se puede deshacer. Tu cuenta y todos tus datos serán eliminados permanentemente.
                    </Text>
                </View>
                <View style={SettingsStyles.cardFooter}>
                    <TouchableOpacity style={[SettingsStyles.btnMain, SettingsStyles.destructiveButton]} onPress={handleDeleteAccount}>
                        <Text style={SettingsStyles.btntxt}>Eliminar Cuenta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default ConfiguracionCuenta;