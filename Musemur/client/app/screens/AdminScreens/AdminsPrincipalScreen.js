import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from "@styles/colors.js";
import { header, AdminPrincipalStyles } from "@styles/styles.js";
import CustomAlertConfirm from '@components/CustomAlertConfirm.js';
import CustomAlert from '@components/CustomAlert.js';

const AdminsPrincipalScreen = ({ navigation }) => {
    const [museums, setMuseums] = useState([]);
    const [selectedMuseum, setSelectedMuseum] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [isSuccessAlertVisible, setSuccessAlertVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [noMuseums, setNoMuseums] = useState(false);

    useEffect(() => {
        fetchMuseums();
    }, []);

    const fetchMuseums = async () => {
        setNoMuseums(false);
        try {
            const response = await axios.get('https://musemur-production.up.railway.app/api/museos');
            if (response.status === 404) {
                setNoMuseums(true);
            } else {
                const storedMuseums = await AsyncStorage.getItem('museums');
                const storedMuseumsParsed = storedMuseums ? JSON.parse(storedMuseums) : [];
                const updatedMuseums = response.data.map(museum => {
                    const storedMuseum = storedMuseumsParsed.find(m => m.museum_name === museum.museum_name);
                    return storedMuseum ? { ...museum, image: storedMuseum.image } : museum;
                });
                setMuseums(updatedMuseums);
                await AsyncStorage.setItem('museums', JSON.stringify(updatedMuseums));
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setNoMuseums(true);
            } else {
                console.error('Error al obtener los museos:', error);
                Alert.alert('Error', 'Error al obtener los museos. Por favor, inténtelo de nuevo.');
            }
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchMuseums();
        setRefreshing(false);
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Se requieren permisos para acceder a la galería de imágenes.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            const { uri } = result.assets[0];
            const fileName = uri.split('/').pop();
            const newPath = `${FileSystem.documentDirectory}${fileName}`;

            try {
                await FileSystem.moveAsync({ from: uri, to: newPath });

                if (selectedMuseum) {
                    const updatedMuseums = museums.map(museum => {
                        if (museum.museum_name === selectedMuseum.museum_name) {
                            return { ...museum, image: newPath };
                        }
                        return museum;
                    });

                    setMuseums(updatedMuseums);
                    await AsyncStorage.setItem('museums', JSON.stringify(updatedMuseums));
                    setSelectedMuseum(null);
                    setModalVisible(false);
                }
            } catch (error) {
                console.error('Error al mover la imagen:', error);
            }
        }
    };

    const deleteImage = async () => {
        if (selectedMuseum) {
            const updatedMuseums = museums.map(museum => {
                if (museum.museum_name === selectedMuseum.museum_name) {
                    return { ...museum, image: null };
                }
                return museum;
            });

            setMuseums(updatedMuseums);
            await AsyncStorage.setItem('museums', JSON.stringify(updatedMuseums));
            setSelectedMuseum(null);
            setModalVisible(false);
        }
    };

    const deleteMuseum = async () => {
        if (selectedMuseum) {
            setLoading(true);
            try {
                await axios.delete('https://musemur-production.up.railway.app/api/museos', { data: { museum_name: selectedMuseum.museum_name } });
                const updatedMuseums = museums.filter(museum => museum.museum_name !== selectedMuseum.museum_name);

                setMuseums(updatedMuseums);
                await AsyncStorage.setItem('museums', JSON.stringify(updatedMuseums));
                setSelectedMuseum(null);
                setAlertVisible(false);
                setSuccessAlertVisible(true);
            } catch (error) {
                console.error('Error al eliminar el museo:', error);
                Alert.alert('Error', 'Error al eliminar el museo. Por favor, inténtelo de nuevo.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleLongPress = (museum) => {
        setSelectedMuseum(museum);
        setModalVisible(true);
    };

    const cancelDeleteMuseum = () => {
        setSelectedMuseum(null);
        setAlertVisible(false);
    };

    const handleSuccessConfirm = () => {
        setSuccessAlertVisible(false);
        setModalVisible(false);
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.WHITESECONDARY }}>
            <StatusBar style="light" />
            <View style={header.header}>
                <Icon name="menu" size={30} color="white" onPress={() => navigation.openDrawer()} />
                <Text style={header.headerText}>Admin - Musemur</Text>
                <Image source={require('@assets/icon-app.png')} style={header.logo} />
            </View>
            <ScrollView
                contentContainerStyle={AdminPrincipalStyles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={AdminPrincipalStyles.header}>
                    <Text style={AdminPrincipalStyles.title}>Museos</Text>
                    <Text style={AdminPrincipalStyles.description}>Administra una amplia selección de museos en nuestra ciudad.</Text>
                </View>
                {noMuseums ? (
                    <Text style={AdminPrincipalStyles.noMuseumsText}>No hay museos registrados</Text>
                ) : (
                    <View style={AdminPrincipalStyles.grid}>
                        {museums.map((museum, index) => (
                            <TouchableOpacity
                                key={index}
                                style={AdminPrincipalStyles.card}
                                onPress={() => navigation.navigate('AdminMuseum', { museum })}
                                onLongPress={() => handleLongPress(museum)}
                            >
                                <Image
                                    source={{ uri: museum.image ? museum.image : 'https://via.placeholder.com/120' }}
                                    style={AdminPrincipalStyles.image}
                                />
                                <View style={AdminPrincipalStyles.cardContent}>
                                    <Text style={AdminPrincipalStyles.cardTitle}>{museum.museum_name}</Text>
                                    <Text style={AdminPrincipalStyles.cardDescription}>{museum.museum_desc}</Text>
                                </View>
                                <Icon name="edit" size={24} color={colors.PRIMARYCOLOR} onPress={() => handleLongPress(museum)} />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                <View style={{ width: '100%' }}>
                    <TouchableOpacity style={AdminPrincipalStyles.createButton} onPress={() => navigation.navigate('AdminCreateMuseum')}>
                        <Text style={AdminPrincipalStyles.createButtonText}>Crear Nuevo Museo</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={() => setModalVisible(false)}
                >
                    <View style={AdminPrincipalStyles.modalContainer}>
                        <View style={AdminPrincipalStyles.modalContent}>
                            <Text style={AdminPrincipalStyles.modalTitle}>Opciones</Text>
                            <TouchableOpacity style={AdminPrincipalStyles.modalButton} onPress={pickImage}>
                                <Text style={AdminPrincipalStyles.modalButtonText}>Editar Foto</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={AdminPrincipalStyles.modalButton} onPress={deleteImage}>
                                <Text style={AdminPrincipalStyles.modalButtonText}>Eliminar Foto</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={AdminPrincipalStyles.modalButton} onPress={() => setAlertVisible(true)}>
                                <Text style={AdminPrincipalStyles.modalButtonText}>Eliminar Museo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={AdminPrincipalStyles.modalButton} onPress={() => setModalVisible(false)}>
                                <Text style={AdminPrincipalStyles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <CustomAlertConfirm
                    visible={isAlertVisible}
                    title="Confirmación"
                    message={`¿Estás seguro de eliminar el museo ${selectedMuseum?.museum_name}?`}
                    onConfirm={deleteMuseum}
                    onCancel={cancelDeleteMuseum}
                />
                <CustomAlert
                    visible={isSuccessAlertVisible}
                    title="Éxito"
                    message="El museo se ha eliminado correctamente"
                    onConfirm={handleSuccessConfirm}
                />
            </ScrollView>
            {loading && (
                <Modal transparent={true} animationType="none" visible={loading}>
                    <View style={AdminPrincipalStyles.modalBackground}>
                        <View style={AdminPrincipalStyles.activityIndicatorWrapper}>
                            <ActivityIndicator size="large" color={colors.PRIMARYCOLOR} />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default AdminsPrincipalScreen;
