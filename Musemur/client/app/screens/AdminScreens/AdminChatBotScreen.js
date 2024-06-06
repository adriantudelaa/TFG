import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Alert, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Feather';
import { Modal, Portal, Provider } from 'react-native-paper';
import axios from 'axios';
import { AdminChatBoxStyles, header } from '@styles/styles.js';

const ChatBoxAdmin = ({ navigation }) => {
    const [faqs, setFaqs] = useState([]);
    const [museos, setMuseos] = useState([]);
    const [selectedMuseo, setSelectedMuseo] = useState(null);
    const [newQuestion, setNewQuestion] = useState({
        cb_que: "",
        cb_res: "",
        id_museo: "",
    });
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedFaq, setSelectedFaq] = useState(null);

    useEffect(() => {
        fetchMuseos();
    }, []);

    const fetchMuseos = async () => {
        try {
            const response = await axios.get('https://musemur-production.up.railway.app/api/museos');
            setMuseos(response.data);
            setSelectedMuseo(response.data[0]?.id_museo);  // Seleccionar el primer museo por defecto
            fetchFaqs(response.data[0]?.id_museo);
        } catch (error) {
            console.error('Error al obtener museos:', error);
        }
    };

    const fetchFaqs = async (id_museo) => {
        try {
            const response = await axios.post('https://musemur-production.up.railway.app/api/chatbox/museum', { id_museo });
            setFaqs(response.data);
        } catch (error) {
            console.error('Error al obtener FAQs:', error);
        }
    };

    const handleQuestionChange = (field, value) => {
        setNewQuestion((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddFaq = async () => {
        if (!newQuestion.cb_que.trim() || !newQuestion.cb_res.trim() || !newQuestion.id_museo) {
            Alert.alert('Error', 'Todos los campos son obligatorios.');
            return;
        }
        try {
            await axios.post('https://musemur-production.up.railway.app/api/chatbox', newQuestion);
            fetchFaqs(newQuestion.id_museo);
            setNewQuestion({
                cb_que: "",
                cb_res: "",
                id_museo: selectedMuseo,
            });
        } catch (error) {
            console.error('Error al agregar FAQ:', error);
        }
    };

    const handleDeleteFaq = (id) => {
        Alert.alert(
            'Confirmar eliminación',
            '¿Está seguro/a de que desea eliminar esta pregunta?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        try {
                            await axios.delete('https://musemur-production.up.railway.app/api/chatbox', { data: { id_que: id } });
                            fetchFaqs(selectedMuseo);
                        } catch (error) {
                            console.error('Error al eliminar FAQ:', error);
                        }
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    const handleEditFaq = (faq) => {
        setSelectedFaq(faq);
        setModalVisible(true);
    };

    const handleSaveFaq = async () => {
        try {
            await axios.put('https://musemur-production.up.railway.app/api/chatbox', selectedFaq);
            fetchFaqs(selectedMuseo);
            setModalVisible(false);
            setSelectedFaq(null);
        } catch (error) {
            console.error('Error al guardar FAQ:', error);
            Alert.alert('Error', 'Error al guardar FAQ.');
        }
    };

    const renderFaqItem = ({ item }) => (
        <TouchableOpacity style={AdminChatBoxStyles.faqItem} onPress={() => handleEditFaq(item)}>
            <Text style={AdminChatBoxStyles.faqQuestion}>{item.cb_que}</Text>
            <Text style={AdminChatBoxStyles.faqAnswer}>{item.cb_res}</Text>
            <TouchableOpacity style={AdminChatBoxStyles.deleteButton} onPress={() => handleDeleteFaq(item.id_que)}>
                <Icon name="trash-2" size={20} color="white" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <Provider>
            <StatusBar style="light" />
            <View style={AdminChatBoxStyles.container}>
                <View style={header.header}>
                    <Icon name="menu" size={30} color="white" onPress={() => navigation.openDrawer()} />
                    <Text style={header.headerText}>Admin - Musemur</Text>
                    <Image source={require('@assets/icon-app.png')} style={header.logo} />
                </View>
                <Picker
                    selectedValue={selectedMuseo}
                    onValueChange={(itemValue) => {
                        setSelectedMuseo(itemValue);
                        fetchFaqs(itemValue);
                    }}
                >
                    {museos.map((museo) => (
                        <Picker.Item key={museo.id_museo} label={museo.museum_name} value={museo.id_museo} />
                    ))}
                </Picker>
                <View style={AdminChatBoxStyles.cardHeader}>
                    <Text style={AdminChatBoxStyles.cardTitle}>FAQs</Text>
                    <View style={AdminChatBoxStyles.inputGroup}>
                        <Text style={AdminChatBoxStyles.label}>Nueva Pregunta</Text>
                        <TextInput
                            style={AdminChatBoxStyles.input}
                            placeholder="Escriba la nueva pregunta"
                            value={newQuestion.cb_que}
                            onChangeText={(value) => handleQuestionChange('cb_que', value)}
                        />
                    </View>
                    <View style={AdminChatBoxStyles.inputGroup}>
                        <Text style={AdminChatBoxStyles.label}>Nueva Respuesta</Text>
                        <TextInput
                            style={AdminChatBoxStyles.input}
                            placeholder="Escriba la nueva respuesta"
                            value={newQuestion.cb_res}
                            onChangeText={(value) => handleQuestionChange('cb_res', value)}
                        />
                    </View>
                    <View style={AdminChatBoxStyles.inputGroup}>
                        <Text style={AdminChatBoxStyles.label}>Museo</Text>
                        <Picker
                            selectedValue={newQuestion.id_museo}
                            onValueChange={(itemValue) => handleQuestionChange('id_museo', itemValue)}
                        >
                            {museos.map((museo) => (
                                <Picker.Item key={museo.id_museo} label={museo.museum_name} value={museo.id_museo} />
                            ))}
                        </Picker>
                    </View>
                    <View style={AdminChatBoxStyles.containerBtns}>
                        <TouchableOpacity style={AdminChatBoxStyles.btnMain} onPress={handleAddFaq}>
                            <Icon name="plus" size={20} color="#fff" style={AdminChatBoxStyles.buttonIcon} />
                            <Text style={AdminChatBoxStyles.btntxt}>Añadir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={faqs}
                    renderItem={renderFaqItem}
                    keyExtractor={(item) => item.id_que.toString()}
                    contentContainerStyle={AdminChatBoxStyles.containerScroll}
                    style={AdminChatBoxStyles.faqList}
                />
                <Portal>
                    <Modal visible={isModalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={AdminChatBoxStyles.modalContainer}>
                        <ScrollView>
                            <Text style={AdminChatBoxStyles.modalTitle}>Editar Pregunta</Text>
                            {selectedFaq && (
                                <>
                                    <TextInput
                                        style={AdminChatBoxStyles.input}
                                        placeholder="Editar pregunta"
                                        value={selectedFaq.cb_que}
                                        onChangeText={(text) => setSelectedFaq({ ...selectedFaq, cb_que: text })}
                                    />
                                    <TextInput
                                        style={[AdminChatBoxStyles.input, AdminChatBoxStyles.inputLarge]}
                                        placeholder="Editar respuesta"
                                        value={selectedFaq.cb_res}
                                        onChangeText={(text) => setSelectedFaq({ ...selectedFaq, cb_res: text })}
                                        multiline
                                        numberOfLines={4}
                                    />
                                    <Picker
                                        selectedValue={selectedFaq.id_museo}
                                        onValueChange={(itemValue) => setSelectedFaq({ ...selectedFaq, id_museo: itemValue })}
                                    >
                                        {museos.map((museo) => (
                                            <Picker.Item key={museo.id_museo} label={museo.museum_name} value={museo.id_museo} />
                                        ))}
                                    </Picker>
                                    <TouchableOpacity style={AdminChatBoxStyles.btnMain} onPress={handleSaveFaq}>
                                        <Icon name="save" size={20} color="#fff" style={AdminChatBoxStyles.buttonIcon} />
                                        <Text style={AdminChatBoxStyles.btntxt}>Guardar</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </ScrollView>
                    </Modal>
                </Portal>
            </View>
        </Provider>
    );
};

export default ChatBoxAdmin;
