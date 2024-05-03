import React, {Component} from "react";
import { Text, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { splashStyles } from "../styles/styles.js";
import { StatusBar } from "react-native";

export default class SplashScreen extends Component {

    goToScreen(routeName){
        this.props.navigation.navigate(routeName)
    }

    componentDidMount(){
        setTimeout(() => {
            this.goToScreen('LoginUsers')
        }, 3000, this)
    }

    render(){
        return(
            <View style={splashStyles.image}>
                <StatusBar translucent={true} backgroundColor='transparent' />
                <Animatable.Image 
                animation='pulse' 
                easing='ease-out' 
                iterationCount='infinite' 
                source={require('../../assets/icon.png')}
                    style={{ height: 200, width: 200 }} />
            </View>
        )
    }
}