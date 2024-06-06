import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Linking, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import colors from '@styles/colors';
import { header, AdminMuseumStyle } from '@styles/styles';

const AdminMuseumScreen = ({ navigation, route }) => {
    const { museum } = route.params;

    const [editableMuseumName, setEditableMuseumName] = useState(museum.museum_name);
    const [museumDesc, setMuseumDesc] = useState(museum.museum_desc);
    const [museumLoc, setMuseumLoc] = useState(museum.museum_loc);
    const [museumOpen, setMuseumOpen] = useState(museum.museum_open);
    const [museumClose, setMuseumClose] = useState(museum.museum_close);
    const [exhibitions, setExhibitions] = useState([]);

    useEffect(() => {
        fetchExhibitions();
    }, []);

    const fetchExhibitions = async () => {
        try {
            const response = await axios.get(`https://musemur-production.up.railway.app/api/exposiciones/${museum.id_museo}`);
            setExhibitions(response.data);
        } catch (error) {
            console.error('Error al obtener las exposiciones:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const responseId = await axios.post('https://musemur-production.up.railway.app/api/museosName', {
                museum_name: museum.museum_name
            });

            if (responseId.status === 200 && responseId.data.length > 0) {
                const id_museo = responseId.data[0].id_museo;

                const responseUpdate = await axios.put('https://musemur-production.up.railway.app/api/museos', {
                    id_museo,
                    museum_name: editableMuseumName,
                    museum_desc: museumDesc,
                    museum_loc: museumLoc,
                    museum_open: museumOpen,
                    museum_close: museumClose,
                    museum_city: museum.museum_city,
                });

                if (responseUpdate.status === 200) {
                    await updateExhibitions(id_museo);
                    Alert.alert('Éxito', 'Museo actualizado correctamente');
                    navigation.goBack();
                } else {
                    Alert.alert('Error', 'No se pudo actualizar el museo. Por favor, inténtelo de nuevo.');
                }
            } else {
                Alert.alert('Error', 'Museo no encontrado. Por favor, inténtelo de nuevo.');
            }
        } catch (error) {
            console.error('Error al actualizar el museo:', error);
            Alert.alert('Error', 'No se pudo actualizar el museo. Por favor, inténtelo de nuevo.');
        }
    };

    const updateExhibitions = async (id_museo) => {
        try {
            // Eliminamos todas las exposiciones actuales del museo
            await axios.delete(`https://musemur-production.up.railway.app/api/exposiciones/${id_museo}`);
            // Añadimos las exposiciones actualizadas
            for (const exhibition of exhibitions) {
                await axios.post('https://musemur-production.up.railway.app/api/exposiciones', {
                    id_museo,
                    expo_title: exhibition.expo_title,
                    expo_desc: exhibition.expo_desc
                });
            }
        } catch (error) {
            console.error('Error al actualizar las exposiciones:', error);
        }
    };

    const handleAddExhibition = () => {
        setExhibitions([...exhibitions, { expo_title: '', expo_desc: '' }]);
    };

    const handleExhibitionChange = (index, field, value) => {
        const newExhibitions = [...exhibitions];
        newExhibitions[index][field] = value;
        setExhibitions(newExhibitions);
    };

    const handleDeleteExhibition = async (id_expo, index) => {
        try {
            if (id_expo) {
                await axios.delete(`https://musemur-production.up.railway.app/api/exposicion/${id_expo}`);
            }
            const newExhibitions = exhibitions.filter((_, i) => i !== index);
            setExhibitions(newExhibitions);
        } catch (error) {
            console.error('Error al eliminar la exposición:', error);
        }
    };

    const openLocation = () => {
        const locationUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(editableMuseumName)}`;
        Linking.openURL(locationUrl);
    };

    return (
        <View style={AdminMuseumStyle.container}>
            <StatusBar style="light" />
            <View style={header.header}>
                <Icon name="menu" size={30} color="white" onPress={() => navigation.openDrawer()} />
                <Text style={header.headerText}>Musemur</Text>
                <Image source={require('@assets/icon-app.png')} style={header.logo} />
            </View>
            <ScrollView contentContainerStyle={AdminMuseumStyle.containerScroll}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='arrow-back' size={30} color={colors.PRIMARYCOLOR} />
                            <Text style={[AdminMuseumStyle.btntxt, { color: colors.PRIMARYCOLOR }]}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={AdminMuseumStyle.cardTitle}>{museum.museum_name}</Text>
                <View style={AdminMuseumStyle.divider} />
                <TextInput
                    style={AdminMuseumStyle.input}
                    placeholder="Nombre del museo"
                    value={editableMuseumName}
                    onChangeText={setEditableMuseumName}
                />
                <TextInput
                    style={AdminMuseumStyle.input}
                    placeholder="Descripción del museo"
                    value={museumDesc}
                    onChangeText={setMuseumDesc}
                />
                <TextInput
                    style={AdminMuseumStyle.input}
                    placeholder="Ubicación del museo"
                    value={museumLoc}
                    onChangeText={setMuseumLoc}
                />
                <TextInput
                    style={AdminMuseumStyle.input}
                    placeholder="Horario de apertura del museo"
                    value={museumOpen}
                    onChangeText={setMuseumOpen}
                />
                <TextInput
                    style={AdminMuseumStyle.input}
                    placeholder="Horario de cierre del museo"
                    value={museumClose}
                    onChangeText={setMuseumClose}
                />
                <TouchableOpacity style={AdminMuseumStyle.btnMain} onPress={handleUpdate}>
                    <Text style={AdminMuseumStyle.btntxt}>Guardar Cambios</Text>
                </TouchableOpacity>
                <View style={AdminMuseumStyle.exhibitionContainer}>
                    <Text style={AdminMuseumStyle.subtitle}>Exposiciones del Día</Text>
                    {exhibitions.map((exhibition, index) => (
                        <View key={index} style={AdminMuseumStyle.exhibitionItem}>
                            <TextInput
                                style={AdminMuseumStyle.input}
                                placeholder="Título de la exposición"
                                value={exhibition.expo_title}
                                onChangeText={(value) => handleExhibitionChange(index, 'expo_title', value)}
                            />
                            <TextInput
                                style={AdminMuseumStyle.input}
                                placeholder="Descripción de la exposición"
                                value={exhibition.expo_desc}
                                onChangeText={(value) => handleExhibitionChange(index, 'expo_desc', value)}
                            />
                            <TouchableOpacity style={AdminMuseumStyle.btnEliminar} onPress={() => handleDeleteExhibition(exhibition.id_expo, index)}>
                                <Text style={AdminMuseumStyle.btntxt}>Eliminar Exposición</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    <TouchableOpacity style={AdminMuseumStyle.btnMain} onPress={handleAddExhibition}>
                        <Text style={AdminMuseumStyle.btntxt}>Añadir Exposición</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default AdminMuseumScreen;
