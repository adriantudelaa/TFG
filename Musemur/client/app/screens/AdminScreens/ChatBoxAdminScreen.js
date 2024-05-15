import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '@styles/colors';
import { header, ChatBoxAdminStyles } from "@styles/styles";

const ChatBoxAdmin = ({ navigation }) => {
    // Estado inicial para las FAQs, nueva pregunta y nueva respuesta
    const [faqs, setFaqs] = useState([
        { question: "¿Cuál es el horario de apertura?", answer: "El museo está abierto de lunes a viernes de 9:00 AM a 5:00 PM, sábados de 10:00 AM a 6:00 PM y domingos de 11:00 AM a 4:00 PM." },
        { question: "¿Cuál es el precio de la entrada?", answer: "Las tarifas de entrada son: Adultos $10, Niños $5, Estudiantes $8, Personas mayores $7." },
        { question: "¿Hay visitas guiadas?", answer: "Sí, ofrecemos visitas guiadas de lunes a viernes a las 11:00 AM y a las 3:00 PM." },
        { question: "¿Dónde puedo comprar entradas?", answer: "Las entradas se pueden comprar en línea en nuestro sitio web o en la taquilla del museo." },
    ]);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');

    // Función para agregar una nueva FAQ
    const handleAddFaq = () => {
        if (!newQuestion.trim() || !newAnswer.trim()) {
            Alert.alert('Error', 'Ambos campos son obligatorios.');
            return;
        }
        setFaqs([...faqs, { question: newQuestion, answer: newAnswer }]);
        setNewQuestion('');
        setNewAnswer('');
    };

    // Función para eliminar una FAQ
    const handleDeleteFaq = (index) => {
        Alert.alert(
            'Confirmar eliminación',
            '¿Está seguro/a de que desea eliminar esta pregunta?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    onPress: () => {
                        const updatedFaqs = faqs.filter((_, i) => i !== index);
                        setFaqs(updatedFaqs);
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    // Función para renderizar cada FAQ
    const renderFaqItem = ({ item, index }) => (
        <View style={ChatBoxAdminStyles.faqItem}>
            <Text style={ChatBoxAdminStyles.faqQuestion}>{item.question}</Text>
            <Text style={ChatBoxAdminStyles.faqAnswer}>{item.answer}</Text>
            <TouchableOpacity style={ChatBoxAdminStyles.deleteButton} onPress={() => handleDeleteFaq(index)}>
                <Icon name="delete" size={20} color="white" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: colors.PRIMARYCOLOR }}>
            <View style={header.header}>
                <Icon name="menu" size={30} color="white" onPress={() => navigation.openDrawer()} />
                <Text style={header.headerText}>Admin - Musemur</Text>
                <Image source={require('@assets/icon.png')} style={header.logo} />
            </View>
            <View style={ChatBoxAdminStyles.container}>
                <Text style={ChatBoxAdminStyles.sectionTitle}>Gestionar Preguntas Frecuentes</Text>
                <TextInput
                    style={ChatBoxAdminStyles.input}
                    placeholder="Nueva Pregunta"
                    value={newQuestion}
                    onChangeText={setNewQuestion}
                />
                <TextInput
                    style={ChatBoxAdminStyles.input}
                    placeholder="Nueva Respuesta"
                    value={newAnswer}
                    onChangeText={setNewAnswer}
                />
                <TouchableOpacity style={ChatBoxAdminStyles.addButton} onPress={handleAddFaq}>
                    <Text style={ChatBoxAdminStyles.addButtonText}>Añadir</Text>
                </TouchableOpacity>
                <FlatList
                    data={faqs}
                    renderItem={renderFaqItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={ChatBoxAdminStyles.faqList}
                />
            </View>
        </View>
    );
};

export default ChatBoxAdmin;