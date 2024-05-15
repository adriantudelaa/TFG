import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { useIsFocused } from '@react-navigation/native';
import {NavigatorStyles} from '../../styles/styles.js';

export default function IconWithAnimationAdmin({ route, focused, color }) {
    const isFocused = useIsFocused();

    let iconName;
    if (route.name === 'Inicio') {
        iconName = 'home';
    } else if (route.name === 'Gestor Reservas') {
        iconName = 'calendar';
    } else if (route.name === 'Gestor ChatBox') {
        iconName = 'chatbox-ellipses-outline';
    } else if (route.name === 'Perfil') {
        iconName = 'person';
    }

    return (
        <View style={NavigatorStyles.iconContainer}>
            <Ionicons name={iconName} size={30} color={color} />
            {focused && isFocused && (
                <Animatable.Text
                    animation="zoomIn"
                    duration={200}
                    style={NavigatorStyles.label}
                >
                    {route.name}
                </Animatable.Text>
            )}
        </View>
    );
}