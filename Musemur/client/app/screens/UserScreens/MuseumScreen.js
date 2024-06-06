import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import colors from '@styles/colors';
import { header, loginStyles, MuseumScreenStyles } from '@styles/styles';
import { Ionicons } from '@expo/vector-icons';

// Iconos personalizados
const ClockIcon = (props) => (
    <Ionicons name="time-outline" size={24} color="gray" {...props} />
);

const LocateIcon = (props) => (
    <Ionicons name="location-outline" size={24} color="gray" {...props} />
);

const MuseumScreen = ({ navigation, route }) => {
    const { museum } = route.params;
    const [exhibitions, setExhibitions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExhibitions = async () => {
            try {
                const response = await axios.get(`https://musemur-production.up.railway.app/api/exposiciones/${museum.id_museo}`);
                setExhibitions(response.data);
            } catch (error) {
                console.error('Error al obtener las exposiciones:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchExhibitions();
    }, [museum.id_museo]);

    const openLocation = () => {
        const locationUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(museum.museum_loc)}`;
        Linking.openURL(locationUrl);
    };

    return (
        <View style={MuseumScreenStyles.container}>
            <StatusBar style="light" />
            <View style={header.header}>
                <Icon name="menu" size={30} color="white" onPress={() => navigation.openDrawer()} />
                <Text style={header.headerText}>Musemur</Text>
                <Image source={require('@assets/icon-app.png')} style={header.logo} />
            </View>
            <ScrollView contentContainerStyle={MuseumScreenStyles.containerScroll}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start'}}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='arrow-back' size={30} color={colors.PRIMARYCOLOR} />
                            <Text style={[loginStyles.btntxt, { color: colors.PRIMARYCOLOR }]}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={MuseumScreenStyles.cardTitle}>{museum.museum_name}</Text>
                <View style={MuseumScreenStyles.divider} />
                <Image source={{ uri: museum.image }} style={MuseumScreenStyles.image} />
                <Text style={MuseumScreenStyles.cardDescription}>{museum.museum_desc}</Text>
                <View style={MuseumScreenStyles.infoContainer}>
                    <Text style={MuseumScreenStyles.subtitle}>Información del Museo</Text>
                    <TouchableOpacity onPress={openLocation} style={MuseumScreenStyles.infoItem}>
                        <LocateIcon />
                        <Text>{museum.museum_loc}</Text>
                    </TouchableOpacity>
                    <View style={MuseumScreenStyles.infoItem}>
                        <ClockIcon />
                        <Text>De {museum.museum_open} a {museum.museum_close}</Text>
                    </View>
                </View>
                <View style={MuseumScreenStyles.grid}>
                    <View style={MuseumScreenStyles.gridItem}>
                        <View style={MuseumScreenStyles.exhibitionContainer}>
                            <Text style={MuseumScreenStyles.subtitle}>Exposiciones del Día</Text>
                            {loading ? (
                                <ActivityIndicator size="large" color={colors.PRIMARYCOLOR} />
                            ) : (
                                exhibitions.map((exhibition, index) => (
                                    <View key={index} style={MuseumScreenStyles.exhibitionItem}>
                                        <View>
                                            <Text style={MuseumScreenStyles.exhibitionTitle}>{exhibition.expo_title}</Text>
                                            <Text style={MuseumScreenStyles.exhibitionDescription}>{exhibition.expo_desc}</Text>
                                        </View>
                                    </View>
                                ))
                            )}
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={MuseumScreenStyles.btnMain} onPress={() => navigation.navigate('ChatBox', { id_museo: museum.id_museo })}>
                    <Text style={MuseumScreenStyles.btntxt}>Abrir Chat</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default MuseumScreen;