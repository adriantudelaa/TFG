import React, { useState } from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { loginStyles } from "@styles/styles.js";
import MyTextInput from "@components/MyTextInput.js";
import color from "@styles/colors.js";

// Componente funcional LoginScreenAdmins
const LoginScreenAdmins = ({ navigation }) => {
    // Estado para controlar la visibilidad de la contraseña
    const [icHidePassword, setIcHidePassword] = useState(true);

    return (
        <View style={loginStyles.container}>
            <StatusBar translucent={true} />
            {/* Barra de estado translúcida */}
            
            {/* Logo del museo */}
            <View style={loginStyles.logo}>
                <Image source={require('@assets/icon.png')} style={{ height: 150, width: 150 }} />
            </View>
            
            {/* Título de la pantalla */}
            <View>
                <Text style={loginStyles.txtTitle}>ACCESO ADMINISTRADORES</Text>
            </View>
            
            {/* Campo de entrada para NIF */}
            <MyTextInput 
                keyboardType='default' 
                placeholder='NIF' 
                image='person' 
            />
            
            {/* Campo de entrada para contraseña con opción de mostrar/ocultar */}
            <MyTextInput 
                keyboardType={null} 
                placeholder='Contraseña' 
                image='lock' 
                bolGone={true} 
                secureTextEntry={icHidePassword}
                onPress={() => setIcHidePassword(!icHidePassword)} 
            />
            
            {/* Botón para iniciar sesión */}
            <View style={loginStyles.containerBtns}>
                <View style={loginStyles.btnMainRegist}>
                    <TouchableOpacity onPress={() => navigation.navigate('AppAdmin')}>
                        <Text style={loginStyles.btntxt}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            {/* Texto informativo para registro de administradores */}
            <View>
                <Text style={{ padding: 5, color: color.BLACKSECONDARY, fontSize: 9 }}>
                    Para registrarse como Administrador contacte con el responsable del Museo
                </Text>
            </View>
        </View>
    );
};

export default LoginScreenAdmins;