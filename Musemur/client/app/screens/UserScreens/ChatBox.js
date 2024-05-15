import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import colors from '@styles/colors';
import { header, ChatBoxStyles } from '@styles/styles';

// Componente principal de ChatBox
const ChatBox = ({ navigation }) => {
    // Preguntas frecuentes (FAQs)
    const faqs = [
        { question: "¿Cuál es el horario de apertura?", answer: "El museo está abierto de lunes a viernes de 9:00 AM a 5:00 PM, sábados de 10:00 AM a 6:00 PM y domingos de 11:00 AM a 4:00 PM." },
        { question: "¿Cuál es el precio de la entrada?", answer: "Las tarifas de entrada son: Adultos $10, Niños $5, Estudiantes $8, Personas mayores $7." },
        { question: "¿Hay visitas guiadas?", answer: "Sí, ofrecemos visitas guiadas de lunes a viernes a las 11:00 AM y a las 3:00 PM." },
        { question: "¿Dónde puedo comprar entradas?", answer: "Las entradas se pueden comprar en línea en nuestro sitio web o en la taquilla del museo." },
    ];

    // Estado para los mensajes en el chat
    const [messages, setMessages] = useState([]);
    // Referencia para el FlatList del chat
    const chatListRef = useRef(null);

    // Maneja el evento cuando se presiona una FAQ
    const handleFaqPress = (faq) => {
        // Añade la pregunta y la respuesta al estado de mensajes
        setMessages((prevMessages) => [
            ...prevMessages,
            { type: 'question', text: faq.question },
            { type: 'answer', text: faq.answer }
        ]);

        // Desplaza el chat hacia el final para ver el nuevo mensaje
        setTimeout(() => {
            chatListRef.current.scrollToEnd({ animated: true });
        }, 100);
    };

    // Renderiza cada mensaje en el chat
    const renderMessage = ({ item }) => (
        <View style={[ChatBoxStyles.messageContainer, item.type === 'question' ? ChatBoxStyles.question : ChatBoxStyles.answer]}>
            <Text style={ChatBoxStyles.messageText}>{item.text}</Text>
        </View>
    );

    // Renderiza cada FAQ en la lista de FAQs
    const renderFaqItem = ({ item }) => (
        <TouchableOpacity style={ChatBoxStyles.faqItem} onPress={() => handleFaqPress(item)}>
            <Text style={ChatBoxStyles.faqText}>{item.question}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: colors.PRIMARYCOLOR }}>
            <StatusBar translucent={true} style="light" />
            <View style={header.header}>
                {/* Botón para regresar a la pantalla anterior */}
                <Icon name="arrow-back" size={30} color="white" onPress={() => navigation.goBack()} />
                <Text style={header.headerText}>ChatBox</Text>
                <Image source={require('@assets/icon.png')} style={header.logo} />
            </View>
            <View style={ChatBoxStyles.container}>
                <Text style={ChatBoxStyles.sectionTitle}>Preguntas Frecuentes</Text>
                {/* Lista de FAQs */}
                <FlatList
                    data={faqs}
                    renderItem={renderFaqItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={ChatBoxStyles.faqList}
                    ListHeaderComponent={<View style={{ marginBottom: 10 }} />}
                    ListFooterComponent={<View style={{ marginBottom: 10 }} />}
                />
                {/* Lista de mensajes del chat */}
                <FlatList
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item, index) => index.toString()}
                    style={ChatBoxStyles.chat}
                    contentContainerStyle={{ flexGrow: 1 }}
                    ref={chatListRef}
                />
            </View>
        </View>
    );
};

export default ChatBox;