import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';
import { loginStyles } from '../styles/styles';
import colors from '../styles/colors';

const MuseumScreen = ({ navigation, route }) => {
    const [isImageViewerVisible, setImageViewerVisible] = useState(false);
    const [imageViewerIndex, setImageViewerIndex] = useState(0);

    const { museum } = route.params;
    const images = [
        { url: museum.image },
        { url: museum.map },
    ];

    const openImageViewer = (index) => {
        setImageViewerIndex(index);
        setImageViewerVisible(true);
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.PRIMARYCOLOR }}>
            <StatusBar translucent={true} style="light" />
            <View style={styles.header}>
                <Icon name="arrow-back" size={30} color="white" onPress={() => navigation.navigate('App')} />
                <Text style={styles.headerText}>Musemur</Text>
                <Image source={require('../../assets/icon.png')} style={styles.logo} />
            </View>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <TouchableOpacity onPress={() => openImageViewer(0)}>
                        <Image
                            source={{ uri: images[0].url }}
                            style={styles.museumImage}
                        />
                    </TouchableOpacity>
                    <Text style={styles.museumTitle}>{museum.name}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.museumDescription}>{museum.description}</Text>
                    <TouchableOpacity onPress={() => openImageViewer(1)}>
                        <Image
                            source={{ uri: images[1].url }}
                            style={styles.mapImage}
                        />
                    </TouchableOpacity>
                    <View style={styles.openingHours}>
                        <Text style={styles.sectionTitle}>Horarios de Apertura</Text>
                        <Text>Lunes a Viernes: 9:00 AM - 5:00 PM</Text>
                        <Text>Sábado: 10:00 AM - 6:00 PM</Text>
                        <Text>Domingo: 11:00 AM - 4:00 PM</Text>
                    </View>
                    <View style={styles.entryFees}>
                        <Text style={styles.sectionTitle}>Tarifas de Entrada</Text>
                        <Text>Adultos: $10</Text>
                        <Text>Niños: $5</Text>
                        <Text>Estudiantes: $8</Text>
                        <Text>Personas Mayores: $7</Text>
                    </View>
                </ScrollView>

                <Modal
                    visible={isImageViewerVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setImageViewerVisible(false)}
                >
                    <ImageViewer
                        imageUrls={images}
                        index={imageViewerIndex}
                        onSwipeDown={() => setImageViewerVisible(false)}
                        enableSwipeDown={true}
                        renderIndicator={() => null}
                        loadingRender={() => (<View style={styles.loadingContainer}><Text style={styles.loadingText}>Loading...</Text></View>)}
                        enablePreload={true}
                        saveToLocalByLongPress={false}
                    />
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.PRIMARYCOLOR,
        paddingTop: 50,
        paddingBottom: 30,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    logo: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "#fff",
    },
    headerText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    contentContainer: {
        paddingBottom: 20,
    },
    museumImage: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
    museumTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    divider: {
        borderBottomColor: colors.PRIMARYCOLOR,
        borderBottomWidth: 2,
        marginVertical: 10,
    },
    museumDescription: {
        fontSize: 16,
        marginBottom: 20,
    },
    mapImage: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
    openingHours: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    entryFees: {
        marginBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: colors.PRIMARYCOLOR,
    },
});

export default MuseumScreen;
