import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';
import colors from '@styles/colors';
import { header, MuseumStyles } from '@styles/styles';

// Componente principal para la pantalla del museo
const MuseumScreen = ({ navigation, route }) => {
    const [isImageViewerVisible, setImageViewerVisible] = useState(false);
    const [imageViewerIndex, setImageViewerIndex] = useState(0);

    const { museum } = route.params; // Obtener datos del museo de los parámetros de la ruta
    const images = [
        { url: museum.image },
        { url: museum.map },
    ];

    // Función para abrir el visor de imágenes
    const openImageViewer = (index) => {
        if (index === 1) {
            const locationUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(museum.location)}`;
            Linking.openURL(locationUrl);
        } else {
            setImageViewerIndex(index);
            setImageViewerVisible(true);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.PRIMARYCOLOR }}>
            <StatusBar translucent={true} style="light" />
            <View style={header.header}>
                {/* Botón de retroceso */}
                <Icon name="arrow-back" size={30} color="white" onPress={() => navigation.goBack()} />
                <Text style={header.headerText}>Musemur</Text>
                <Image source={require('@assets/icon.png')} style={header.logo} />
            </View>
            <View style={MuseumStyles.container}>
                <ScrollView contentContainerStyle={MuseumStyles.contentContainer}>
                    {/* Imagen del museo */}
                    <TouchableOpacity onPress={() => openImageViewer(0)}>
                        <Image source={{ uri: images[0].url }} style={MuseumStyles.museumImage} />
                    </TouchableOpacity>
                    <Text style={MuseumStyles.museumTitle}>{museum.name}</Text>
                    <View style={MuseumStyles.divider} />
                    <Text style={MuseumStyles.museumDescription}>{museum.description}</Text>
                    {/* Mapa del museo */}
                    <TouchableOpacity onPress={() => openImageViewer(1)}>
                        <Image source={{ uri: images[1].url }} style={MuseumStyles.mapImage} />
                    </TouchableOpacity>
                    {/* Horarios de apertura */}
                    <View style={MuseumStyles.openingHours}>
                        <Text style={MuseumStyles.sectionTitle}>Horarios de Apertura</Text>
                        <Text>Lunes a Viernes: 9:00 AM - 5:00 PM</Text>
                        <Text>Sábado: 10:00 AM - 6:00 PM</Text>
                        <Text>Domingo: 11:00 AM - 4:00 PM</Text>
                    </View>
                    {/* Tarifas de entrada */}
                    <View style={MuseumStyles.entryFees}>
                        <Text style={MuseumStyles.sectionTitle}>Tarifas de Entrada</Text>
                        <Text>Adultos: $10</Text>
                        <Text>Niños: $5</Text>
                        <Text>Estudiantes: $8</Text>
                        <Text>Personas Mayores: $7</Text>
                    </View>
                    {/* Botón para abrir el chat */}
                    <TouchableOpacity style={MuseumStyles.chatButton} onPress={() => navigation.navigate('ChatBox')}>
                        <Text style={MuseumStyles.chatButtonText}>Abrir Chat</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Modal para el visor de imágenes */}
                <Modal
                    visible={isImageViewerVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setImageViewerVisible(false)}
                >
                    <ImageViewer
                        onPress={() => setImageViewerVisible(false)}
                        imageUrls={images}
                        index={imageViewerIndex}
                        onSwipeDown={() => setImageViewerVisible(false)}
                        enableSwipeDown={true}
                        renderIndicator={() => null}
                        loadingRender={() => (
                            <View style={MuseumStyles.loadingContainer}>
                                <Text style={MuseumStyles.loadingText}>Cargando...</Text>
                            </View>
                        )}
                        enablePreload={true}
                        saveToLocalByLongPress={false}
                    />
                </Modal>
            </View>
        </View>
    );
};

export default MuseumScreen;