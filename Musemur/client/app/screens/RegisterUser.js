import React, { Component } from "react";
import { Text, TouchableOpacity, ScrollView, Image, View } from "react-native";
import { loginStyles } from "../styles/styles.js";
import MyTextInput from "../components/MyTextInput.js";
import color from "../styles/colors.js";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ic_hide_password: true
        };
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent={true} />
                <ScrollView contentContainerStyle={loginStyles.containerScroll}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <View style={{ padding: 20, flex: 2, paddingLeft: 0 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name='arrow-back' size={30} color={color.BLUE} />
                                <Text style={[loginStyles.btntxt, { color: color.BLUE, marginLeft: 5 }]}>Volver</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={loginStyles.logoRegister}>
                        <Image source={require('../../assets/icon.png')}
                            style={{ height: 150, width: 150 }} />
                    </View>
                    <View>
                        <Text style={[loginStyles.txtTitle]}>REGISTRATE</Text>
                    </View>
                    <MyTextInput keyboardType='email-address' placeholder='Nombre Usuario' image='person' />
                    <MyTextInput keyboardType='email-address' placeholder='Correo Electrónico' image='email' />
                    <MyTextInput keyboardType={null} placeholder='Contraseña' image='lock' bolGone={true} secureTextEntry={this.state.ic_hide_password}
                        onPress={() => this.setState({ ic_hide_password: !this.state.ic_hide_password })} />
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
    }
}
