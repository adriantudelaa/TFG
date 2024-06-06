import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from "react-native-elements";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { loginStyles } from '@styles/styles.js';
import colors from '@styles/colors.js';

const ConfiguracionCuentaAdmin = ({ navigation }) => {
    // Estado inicial con datos simulados del administrador
    const [nombre, setNombre] = useState('Juan');
    const [apellidos, setApellidos] = useState('Pérez García');
    const [correo, setCorreo] = useState('juan.perez@example.com');
    const [dni, setDni] = useState('12345678Z');
    const [museo, setMuseo] = useState('Museo de Historia Natura');
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [idioma, setIdioma] = useState('es');
    const [errores, setErrores] = useState({});

    const validarDNI = (dni) => {
        const regexDNI = /^\d{8}[a-zA-Z]$/;
        const regexNIE = /^[XYZxyz]\d{7}[a-zA-Z]$/;
        return regexDNI.test(dni) || regexNIE.test(dni);
    };

    const validarCorreo = (correo) => {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexCorreo.test(correo);
    };

    const handleGuardarCambios = () => {
        let erroresTemp = {};

        if (dni && !validarDNI(dni)) {
            erroresTemp.dni = 'El DNI/NIE no es válido';
        }

        if (correo && !validarCorreo(correo)) {
            erroresTemp.correo = 'El correo electrónico no es válido';
        }

        setErrores(erroresTemp);

        if (Object.keys(erroresTemp).length === 0) {
            // Lógica para guardar los cambios
            console.log('Guardar cambios');
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

        if (!pickerResult.cancelled) {
            console.log('Imagen seleccionada:', pickerResult.uri);
            setFotoPerfil(pickerResult.assets[0].uri);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.containerScroll}>
            <StatusBar style="auto" />
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 }}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='arrow-back' size={30} color={colors.PRIMARYCOLOR} />
                        <Text style={[loginStyles.btntxt, { color: colors.PRIMARYCOLOR, marginLeft: 5 }]}>Volver</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Configuración de Cuenta</Text>
                    <Text style={styles.cardDescription}>Administra la información de tu cuenta administrador.</Text>
                </View>
                <View style={styles.cardContent}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Foto de Perfil</Text>
                        <TouchableOpacity onPress={seleccionarFotoPerfil} style={styles.fotoPerfilContainer}>
                            {!fotoPerfil && <Icon name="camera" size={30} color="#ccc" />}
                            {fotoPerfil && <Image source={{ uri: fotoPerfil }} style={styles.fotoPerfil} />}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa tu nombre"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Apellidos</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa tus apellidos"
                            value={apellidos}
                            onChangeText={setApellidos}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Correo Electrónico</Text>
                        <TextInput
                            style={[styles.input, errores.correo ? styles.inputError : null]}
                            placeholder="Ingresa tu correo electrónico"
                            keyboardType="email-address"
                            value={correo}
                            onChangeText={setCorreo}
                        />
                        {errores.correo && <Text style={styles.errorText}>{errores.correo}</Text>}
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>DNI</Text>
                        <TextInput
                            style={[styles.input, errores.dni ? styles.inputError : null]}
                            placeholder="Ingresa tu DNI"
                            value={dni}
                            onChangeText={setDni}
                        />
                        {errores.dni && <Text style={styles.errorText}>{errores.dni}</Text>}
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Museo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa el nombre del museo"
                            value={museo}
                            onChangeText={setMuseo}
                        />
                    </View>
                </View>
                <View style={styles.cardFooter}>
                    <TouchableOpacity style={styles.btnMain} onPress={handleGuardarCambios}>
                        <Text style={styles.btntxt}>Guardar Cambios</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Contraseña</Text>
                    <Text style={styles.cardDescription}>Actualiza la contraseña de tu cuenta.</Text>
                </View>
                <View style={styles.cardContent}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Contraseña Actual</Text>
                        <TextInput style={styles.input} placeholder="Ingresa tu contraseña actual" secureTextEntry={true} />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nueva Contraseña</Text>
                        <TextInput style={styles.input} placeholder="Ingresa tu nueva contraseña" secureTextEntry={true} />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Confirmar Contraseña</Text>
                        <TextInput style={styles.input} placeholder="Confirma tu nueva contraseña" secureTextEntry={true} />
                    </View>
                </View>
                <View style={styles.cardFooter}>
                    <TouchableOpacity style={styles.btnMain}>
                        <Text style={styles.btntxt}>Cambiar Contraseña</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Eliminar Cuenta</Text>
                    <Text style={styles.cardDescription}>Elimina tu cuenta y todos tus datos de forma permanente.</Text>
                </View>
                <View style={styles.cardContent}>
                    <Text style={styles.warningText}>
                        Esta acción no se puede deshacer. Tu cuenta y todos tus datos serán eliminados permanentemente.
                    </Text>
                </View>
                <View style={styles.cardFooter}>
                    <TouchableOpacity style={[styles.btnMain, styles.destructiveButton]}>
                        <Text style={styles.btntxt}>Eliminar Cuenta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    containerScroll: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 20,
        backgroundColor: '#f5f5f5',
    },
    card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 20,
    },
    cardHeader: {
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Inter_700Bold',
        color: '#333',
        textAlign: 'center',
    },
    cardDescription: {
        fontSize: 16,
        color: '#666',
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
    },
    cardContent: {
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'Inter_400Regular',
        color: '#555',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        backgroundColor: '#fff',
        color: '#333',
    },
    inputError: {
        borderColor: 'red',
    },
    textarea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        backgroundColor: '#fff',
        color: '#333',
    },
    warningText: {
        color: '#6b7280',
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
    },
    btnMain: {
        backgroundColor: colors.PRIMARYCOLOR,
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    btntxt: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Inter_700Bold',
    },
    destructiveButton: {
        backgroundColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        marginTop: 5,
    },
    fotoPerfilContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 75,
        width: 100,
        height: 100,
        overflow: 'hidden',
        marginVertical: 10,
    },
    fotoPerfil: {
        width: '100%',
        height: '100%',
        borderRadius: 75,
    },
});

export default ConfiguracionCuentaAdmin;