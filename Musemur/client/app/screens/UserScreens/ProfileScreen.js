import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Alert, Image, ScrollView, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from "@styles/colors";
import { header, ProfileStyles } from "@styles/styles";

const UserProfileScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                const response = await axios.get('https://musemur-production.up.railway.app/api/UserProfile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setUser(response.data);
                const savedPhoto = await AsyncStorage.getItem('profilePhoto');
                if (savedPhoto) {
                    setProfilePhoto(savedPhoto);
                }
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchUser();
        setRefreshing(false);
    };

    const handleLogout = async () => {
        Alert.alert("Cerrar Sesión", "¿Está seguro que desea cerrar sesión?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Cerrar Sesión", onPress: async () => {
                    try {
                        await AsyncStorage.removeItem('authToken');
                        await AsyncStorage.removeItem('profilePhoto');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    } catch (error) {
                        console.error('Error al cerrar sesión:', error);
                    }
                }
            }
        ]);
    };

    if (!user) {
        return (
            <View style={ProfileStyles.container}>
                <StatusBar style="light" />
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <View style={ProfileStyles.container}>
            <StatusBar style="light" />
            <View style={header.header}>
                <Icon name="menu" size={30} color={colors.WHITE} onPress={() => navigation.openDrawer()} />
                <Text style={header.headerText}>Musemur</Text>
                <Image source={require('@assets/icon-app.png')} style={header.logo} />
            </View>
            <ScrollView
                contentContainerStyle={ProfileStyles.profileContainer}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >
                <View style={ProfileStyles.profileHeader}>
                    {profilePhoto 
                        ? <Image source={{ uri: profilePhoto }} style={ProfileStyles.profileImage} />
                        : <Image source={require('@assets/icon.png')} style={ProfileStyles.profileImage} />
                    }
                    <Text style={ProfileStyles.profileHeaderLabel}>{user.username}</Text>
                </View>
                {[
                    { label: 'Nombre', value: user.user_first_name },
                    { label: 'Apellidos', value: user.user_surname },
                    { label: 'Correo Electrónico', value: user.user_email },
                    { label: 'DNI', value: user.user_dni },
                    { label: 'Teléfono', value: user.user_phone }
                ].map((item, index) => (
                    <View key={index} style={ProfileStyles.profileItem}>
                        <Text style={ProfileStyles.label}>{item.label}</Text>
                        <Text style={ProfileStyles.value}>{item.value}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={ProfileStyles.buttonContainer}>
                <TouchableOpacity style={ProfileStyles.editButton} onPress={() => navigation.navigate('Settings')}>
                    <Icon name="settings" size={20} color="#fff" style={ProfileStyles.buttonIcon} />
                    <Text style={ProfileStyles.buttonText}>Configuración</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ProfileStyles.logoutButton} onPress={handleLogout}>
                    <Icon name="log-out" size={20} color="#fff" style={ProfileStyles.buttonIcon} />
                    <Text style={ProfileStyles.buttonText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default UserProfileScreen;