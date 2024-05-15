import React, { useState } from "react";
import { Text, TouchableOpacity, ScrollView, Image, View } from "react-native";
import { loginStyles } from "@styles/styles.js";
import MyTextInput from "@components/MyTextInput.js";
import color from "@styles/colors.js";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";

const LoginScreen = ({ navigation }) => {
    // Estado inicial del componente
    const [icHidePassword, setIcHidePassword] = useState(true);

    return (
        <View style={{ flex: 1 }}>
            {/* Barra de estado */}
            <StatusBar translucent={true} />
            {/* Contenedor de desplazamiento */}
            <ScrollView contentContainerStyle={loginStyles.containerScroll}>
                {/* Botón de retroceso */}
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <View style={{ padding: 20, flex: 2, paddingLeft: 0 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='arrow-back' size={30} color={color.BLUE} />
                            <Text style={[loginStyles.btntxt, { color: color.BLUE, marginLeft: 5 }]}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Logo */}
                <View style={loginStyles.logoRegister}>
                    <Image source={require('@assets/icon.png')} style={{ height: 150, width: 150 }} />
                </View>
                {/* Título */}
                <View>
                    <Text style={[loginStyles.txtTitle]}>REGISTRATE</Text>
                </View>
                {/* Campos de entrada */}
                <MyTextInput keyboardType='email-address' placeholder='Nombre Usuario' image='person' />
                <MyTextInput keyboardType='email-address' placeholder='Correo Electrónico' image='email' />
                <MyTextInput
                    keyboardType={null}
                    placeholder='Contraseña'
                    image='lock'
                    bolGone={true}
                    secureTextEntry={icHidePassword}
                    onPress={() => setIcHidePassword(!icHidePassword)}
                />
                {/* Botón de registro */}
                <View style={loginStyles.containerBtns}>
                    <View style={loginStyles.btnMainRegist}>
                        <TouchableOpacity>
                            <Text style={[loginStyles.btntxt, { color: color.WHITE }]}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default LoginScreen;