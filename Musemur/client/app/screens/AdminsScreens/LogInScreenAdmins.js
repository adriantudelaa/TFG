import React, { useState, Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { loginStyles } from "../styles/styles.js";
import MyTextInput from "../components/MyTextInput.js";
import color from "../styles/colors.js";
import { StatusBar } from "expo-status-bar";
import { Image, View } from "react-native";

export default class LoginScreenAdmins extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ic_hide_password: true
        };
    }

    render() {
        return (
            <View style={[loginStyles.container]}>
                <StatusBar  translucent={true}/>
                <View style={loginStyles.logo}>
                    <Image source={require('../../assets/icon.png')}
                        style={{ height: 150, width: 150
                         }} />
                </View>
                <View>
                    <Text style={loginStyles.txtTitle}>ACCESO ADMINISTRADORES</Text>
                </View>
                <MyTextInput keyboardType='default' placeholder='NIF' image='person' />
                <MyTextInput keyboardType={null} placeholder='Contraseña' image='lock' bolGone={true} secureTextEntry={this.state.ic_hide_password}
                  onPress={() => this.setState({ ic_hide_password: !this.state.ic_hide_password })} />
                <View style={loginStyles.containerBtns}>
                    <View style={loginStyles.btnMainRegist}>
                    <TouchableOpacity>
                        <Text style={loginStyles.btntxt}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={{padding: 5, color: color.BLACKSECONDARY, fontSize: 9}}>Para registrarse como Administrador contacte con el responsable del Museo</Text>
                </View>
            </View>
        )
    }
}