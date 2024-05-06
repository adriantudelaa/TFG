import React, { useState, Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { loginStyles } from "../styles/styles.js";
import MyTextInput from "../components/MyTextInput.js";
import color from "../styles/colors.js";
import { StatusBar } from "expo-status-bar";
import { Image, View } from "react-native";

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ic_hide_password: true
        };
    }

    render() {
        return (
            <View style={[loginStyles.container]}>
                <StatusBar translucent={true} />
                <View style={loginStyles.logo}>
                    <Image source={require('../../assets/icon.png')}
                        style={{ height: 200, width: 200 }} />
                </View>
                <View>
                    <Text style={[loginStyles.txtTitle]}>BIENVENIDO A MUSEMUR</Text>
                </View>
                <MyTextInput keyboardType='email-address' placeholder='Correo Electrónico' image='person' />
                <MyTextInput keyboardType={null} placeholder='Contraseña' image='lock' bolGone={true} secureTextEntry={this.state.ic_hide_password}
                    onPress={() => this.setState({ ic_hide_password: !this.state.ic_hide_password })} />
                <View style={loginStyles.containerBtns}>
                    <View style={loginStyles.btnMain}>
                    <TouchableOpacity>
                        <Text style={loginStyles.btntxt}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={loginStyles.btnTransparent}>
                    <TouchableOpacity>
                        <Text style={[loginStyles.btntxt, { color: color.BLUE }]}>Registrarse</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity>
                        <Text style={[loginStyles.txtTransparent,  { textDecorationLine: 'underline' }]}>Olvide mi contraseña</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
