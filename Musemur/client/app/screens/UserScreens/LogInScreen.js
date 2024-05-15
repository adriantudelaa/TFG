import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { loginStyles } from "@styles/styles.js";
import MyTextInput from "@components/MyTextInput.js";
import colors from "@styles/colors.js";

// Componente funcional para la pantalla de inicio de sesión
const LoginScreen = ({ navigation }) => {
    // Estado inicial del componente
    const [icHidePassword, setIcHidePassword] = useState(true); // Estado para manejar la visibilidad de la contraseña

    return (
        <View style={{ flex: 1 }}>
            {/* Barra de estado */}
            <StatusBar translucent={true} />
            
            {/* Contenedor principal con desplazamiento */}
            <ScrollView contentContainerStyle={loginStyles.containerScroll}>
                {/* Contenedor del logo */}
                <View style={loginStyles.logo}>
                    <Image source={require('@assets/icon.png')}
                        style={{ height: 150, width: 150 }} />
                </View>
                
                {/* Título de bienvenida */}
                <View>
                    <Text style={loginStyles.txtTitle}>BIENVENIDO A MUSEMUR</Text>
                </View>
                
                {/* Campo de texto para el correo electrónico */}
                <MyTextInput keyboardType='email-address' placeholder='Correo Electrónico' image='email' />
                
                {/* Campo de texto para la contraseña */}
                <MyTextInput 
                    placeholder='Contraseña' 
                    image='lock' 
                    bolGone={true} 
                    secureTextEntry={icHidePassword}
                    onPress={() => setIcHidePassword(!icHidePassword)}
                />
                
                {/* Contenedor de botones */}
                <View style={loginStyles.containerBtns}>
                    {/* Botón para iniciar sesión */}
                    <View style={loginStyles.btnMain}>
                        <TouchableOpacity onPress={() => navigation.navigate('App')}>
                            <Text style={loginStyles.btntxt}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {/* Botón para registrarse */}
                    <View style={loginStyles.btnTransparent}>
                        <TouchableOpacity onPress={() => navigation.navigate('Registrarse')}>
                            <Text style={[loginStyles.btntxt, { color: colors.PRIMARYCOLOR }]}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                {/* Enlace para recuperar contraseña */}
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={[loginStyles.txtTransparent, { textDecorationLine: 'underline' }]}>Olvide mi contraseña</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default LoginScreen;