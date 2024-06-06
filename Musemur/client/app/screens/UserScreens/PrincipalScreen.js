import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image, RefreshControl, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from "@styles/colors";
import { header, PrincipalScreenStyles } from "@styles/styles";

const PrincipalScreen = ({ navigation }) => {
    const [museums, setMuseums] = useState([]);
    const [noMuseums, setNoMuseums] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchMuseums();
    }, []);

    const fetchMuseums = async () => {
        setNoMuseums(false);
        try {
            const response = await axios.get('https://musemur-production.up.railway.app/api/museos');
            if (response.data.length === 0) {
                setNoMuseums(true);
            } else {
                const storedMuseums = await AsyncStorage.getItem('museums');
                const storedMuseumsParsed = storedMuseums ? JSON.parse(storedMuseums) : [];
                const updatedMuseums = response.data.map(museum => {
                    const storedMuseum = storedMuseumsParsed.find(m => m.id_museo === museum.id_museo);
                    return storedMuseum ? { ...museum, image: storedMuseum.image } : museum;
                });
                setMuseums(updatedMuseums);
                await AsyncStorage.setItem('museums', JSON.stringify(updatedMuseums));
            }
        } catch (error) {
            console.error('Error al obtener los museos:', error);
            Alert.alert('Error', 'Error al obtener los museos. Por favor, inténtelo de nuevo.');
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchMuseums();
        setRefreshing(false);
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.WHITESECONDARY }}>
            <StatusBar style="light" />
            <View style={header.header}>
                <Icon name="menu" size={30} color="white" onPress={() => navigation.openDrawer()} />
                <Text style={header.headerText}>Musemur</Text>
                <Image source={require('@assets/icon-app.png')} style={header.logo} />
            </View>
            <ScrollView
                contentContainerStyle={PrincipalScreenStyles.container}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={PrincipalScreenStyles.header}>
                    <Text style={PrincipalScreenStyles.title}>Museos</Text>
                    <Text style={PrincipalScreenStyles.description}>Explora una amplia selección de museos en nuestra ciudad.</Text>
                </View>
                {noMuseums ? (
                    <Text style={PrincipalScreenStyles.noMuseumsText}>No hay museos registrados</Text>
                ) : (
                    <View style={PrincipalScreenStyles.grid}>
                        {museums.map((museum, index) => (
                            <TouchableOpacity
                                key={index}
                                style={PrincipalScreenStyles.card}
                                onPress={() => navigation.navigate('Museum', { museum })}
                            >
                                <Image
                                    source={{ uri: museum.image ? museum.image : 'https://via.placeholder.com/120' }}
                                    style={PrincipalScreenStyles.image}
                                />
                                <View style={PrincipalScreenStyles.cardContent}>
                                    <Text style={PrincipalScreenStyles.cardTitle}>{museum.museum_name}</Text>
                                    <Text style={PrincipalScreenStyles.cardDescription}>{museum.museum_desc}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default PrincipalScreen;