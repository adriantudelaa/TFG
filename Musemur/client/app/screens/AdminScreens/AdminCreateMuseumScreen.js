import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Modal, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from "@styles/colors.js";
import { header } from "@styles/styles.js";
import CustomAlert from '@components/CustomAlert';
import { Icon } from 'react-native-elements';
import { CreateMuseumStyle } from "@styles/styles.js";

const AdminCreateMuseum = ({ navigation }) => {
    const [museumName, setMuseumName] = useState('');
    const [museumCity, setMuseumCity] = useState('');
    const [museumLoc, setMuseumLoc] = useState('');
    const [museumDesc, setMuseumDesc] = useState('');
    const [museumOpen, setMuseumOpen] = useState('');
    const [museumClose, setMuseumClose] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [inputErrors, setInputErrors] = useState({});
    const [createdMuseum, setCreatedMuseum] = useState(null);

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
                setImage(newPath);

                if (createdMuseum) {
                    const updatedMuseum = { ...createdMuseum, image: newPath };
                    await updateStoredMuseums(updatedMuseum);
                    setAlertTitle('Éxito');
                    setAlertMessage('La imagen se ha asociado correctamente.');
                    setAlertVisible(true);
                }
            } catch (error) {
                console.error('Error al mover la imagen:', error);
            }
        }
    };

    const updateStoredMuseums = async (updatedMuseum) => {
        const storedMuseums = await AsyncStorage.getItem('museums');
        const storedMuseumsParsed = storedMuseums ? JSON.parse(storedMuseums) : [];
        const updatedMuseums = [...storedMuseumsParsed, updatedMuseum];
        await AsyncStorage.setItem('museums', JSON.stringify(updatedMuseums));
    };

    const createMuseum = async () => {
        let errors = {};
        if (!museumName) errors.museumName = 'Nombre del museo es obligatorio';
        if (!museumCity) errors.museumCity = 'Ciudad del museo es obligatorio';
        if (!museumLoc) errors.museumLoc = 'Ubicación del museo es obligatorio';
        if (!museumDesc) errors.museumDesc = 'Descripción del museo es obligatorio';
        if (!museumOpen) errors.museumOpen = 'Horario de apertura del museo es obligatorio';
        if (!museumClose) errors.museumClose = 'Horario de cierre del museo es obligatorio';
    
        setInputErrors(errors);
    
        if (Object.keys(errors).length > 0) return;
    
        setLoading(true);
    
        try {
            const response = await axios.post('https://musemur-production.up.railway.app/api/addMuseo', {
                museum_name: museumName,
                museum_city: museumCity,
                museum_loc: museumLoc,
                museum_desc: museumDesc,
                museum_open: museumOpen,
                museum_close: museumClose,
            });
    
            if (response.status === 201) {
                const createdMuseumData = {
                    id_museo: response.data.id_museo,
                    museum_name: museumName,
                    museum_city: museumCity,
                    museum_loc: museumLoc,
                    museum_desc: museumDesc,
                    museum_open: museumOpen,
                    museum_close: museumClose
                };
                setCreatedMuseum(createdMuseumData);
                setAlertTitle('Éxito');
                setAlertMessage('El museo se ha creado correctamente. Ahora seleccione una imagen.');
                setAlertVisible(true);
            }
        } catch (error) {
            console.error('Error al crear el museo:', error.response ? error.response.data : error.message);
            setAlertTitle('Error');
            setAlertMessage('Error al crear el museo. Por favor, inténtelo de nuevo.');
            setAlertVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const handleAlertConfirm = () => {
        setAlertVisible(false);
        if (alertTitle === 'Éxito' && !image) {
            pickImage();
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={CreateMuseumStyle.container}>
            <StatusBar style="light" />
            <View style={header.header}>
                <Icon name="arrow-back" size={30} color="white" onPress={() => navigation.goBack()} />
                <Text style={header.headerText}>Crear Museo</Text>
                <Image source={require('@assets/icon-app.png')} style={header.logo} />
            </View>
            <ScrollView contentContainerStyle={CreateMuseumStyle.containerScroll}>
                <View style={CreateMuseumStyle.card}>
                    <View style={CreateMuseumStyle.cardHeader}>
                        <Text style={CreateMuseumStyle.cardTitle}>Crear Museo</Text>
                    </View>
                    <View style={CreateMuseumStyle.cardContent}>
                        <View style={CreateMuseumStyle.inputGroup}>
                            <Text style={CreateMuseumStyle.label}>Nombre del Museo</Text>
                            <TextInput
                                style={[CreateMuseumStyle.input, inputErrors.museumName && CreateMuseumStyle.inputError]}
                                placeholder="Nombre del museo"
                                value={museumName}
                                onChangeText={setMuseumName}
                            />
                            {inputErrors.museumName && <Text style={CreateMuseumStyle.errorText}>{inputErrors.museumName}</Text>}
                        </View>
                        <View style={CreateMuseumStyle.inputGroup}>
                            <Text style={CreateMuseumStyle.label}>Ciudad del Museo</Text>
                            <TextInput
                                style={[CreateMuseumStyle.input, inputErrors.museumCity && CreateMuseumStyle.inputError]}
                                placeholder="Ciudad del museo"
                                value={museumCity}
                                onChangeText={setMuseumCity}
                            />
                            {inputErrors.museumCity && <Text style={CreateMuseumStyle.errorText}>{inputErrors.museumCity}</Text>}
                        </View>
                        <View style={CreateMuseumStyle.inputGroup}>
                            <Text style={CreateMuseumStyle.label}>Ubicación del Museo</Text>
                            <TextInput
                                style={[CreateMuseumStyle.input, inputErrors.museumLoc && CreateMuseumStyle.inputError]}
                                placeholder="Calle, número, código postal"
                                value={museumLoc}
                                onChangeText={setMuseumLoc}
                            />
                            {inputErrors.museumLoc && <Text style={CreateMuseumStyle.errorText}>{inputErrors.museumLoc}</Text>}
                        </View>
                        <View style={CreateMuseumStyle.inputGroup}>
                            <Text style={CreateMuseumStyle.label}>Descripción del Museo</Text>
                            <TextInput
                                style={[CreateMuseumStyle.input, inputErrors.museumDesc && CreateMuseumStyle.inputError]}
                                placeholder="Descripción del museo"
                                value={museumDesc}
                                onChangeText={setMuseumDesc}
                            />
                            {inputErrors.museumDesc && <Text style={CreateMuseumStyle.errorText}>{inputErrors.museumDesc}</Text>}
                        </View>
                        <View style={CreateMuseumStyle.inputGroup}>
                            <Text style={CreateMuseumStyle.label}>Hora de apertura del Museo</Text>
                            <TextInput
                                style={[CreateMuseumStyle.input, inputErrors.museumOpen && CreateMuseumStyle.inputError]}
                                placeholder="Hora de apertura del museo"
                                value={museumOpen}
                                onChangeText={setMuseumOpen}
                            />
                            {inputErrors.museumOpen && <Text style={CreateMuseumStyle.errorText}>{inputErrors.museumOpen}</Text>}
                        </View>
                        <View style={CreateMuseumStyle.inputGroup}>
                            <Text style={CreateMuseumStyle.label}>Hora de cierre del Museo</Text>
                            <TextInput
                                style={[CreateMuseumStyle.input, inputErrors.museumClose && CreateMuseumStyle.inputError]}
                                placeholder="Hora de cierre del museo"
                                value={museumClose}
                                onChangeText={setMuseumClose}
                            />
                            {inputErrors.museumClose && <Text style={CreateMuseumStyle.errorText}>{inputErrors.museumClose}</Text>}
                        </View>
                    </View>
                    <View style={CreateMuseumStyle.cardFooter}>
                        <TouchableOpacity style={CreateMuseumStyle.btnMain} onPress={createMuseum}>
                            <Text style={CreateMuseumStyle.btntxt}>Crear Museo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {loading && (
                <Modal transparent={true} animationType="none" visible={loading}>
                    <View style={CreateMuseumStyle.modalBackground}>
                        <View style={CreateMuseumStyle.activityIndicatorWrapper}>
                            <ActivityIndicator size="large" color={colors.PRIMARYCOLOR} />
                        </View>
                    </View>
                </Modal>
            )}
            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                onConfirm={handleAlertConfirm}
            />
        </View>
    );
};

export default AdminCreateMuseum;
