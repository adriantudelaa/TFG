import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StatusBar } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import axios from 'axios';
import { header, ChatBoxStyles } from '@styles/styles';

const ChatBox = ({ navigation, route }) => {
    const { id_museo } = route.params;
    const [faqs, setFaqs] = useState([]);
    const [messages, setMessages] = useState([]);
    const chatListRef = useRef(null);

    useEffect(() => {
        fetchFaqs(id_museo);
        setMessages([{ type: 'answer', text: '¡Buenas! ¿En qué puedo ayudarte?' }]);
    }, [id_museo]);

    const fetchFaqs = async (id_museo) => {
        try {
            const response = await axios.post('https://musemur-production.up.railway.app/api/chatbox/museum', { id_museo });
            setFaqs(response.data);
        } catch (error) {
            console.error('Error al obtener las preguntas frecuentes:', error);
        }
    };

    const handleFaqPress = (faq) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { type: 'question', text: faq.cb_que },
            { type: 'answer', text: faq.cb_res }
        ]);

        setTimeout(() => {
            chatListRef.current.scrollToEnd({ animated: true });
        }, 100);
    };

    const renderMessage = ({ item }) => (
        <View style={[ChatBoxStyles.messageWrapper, item.type === 'question' ? ChatBoxStyles.questionWrapper : ChatBoxStyles.answerWrapper]}>
            {item.type === 'answer' && (
                <Avatar
                    rounded
                    source={require('@assets/chatbox-icon.png')}
                    size="small"
                    containerStyle={ChatBoxStyles.messageAvatar}
                />
            )}
            <View style={[ChatBoxStyles.messageContainer, item.type === 'question' ? ChatBoxStyles.question : ChatBoxStyles.answer]}>
                <Text style={ChatBoxStyles.messageText}>{item.text}</Text>
            </View>
        </View>
    );

    const renderFaqItem = ({ item }) => (
        <TouchableOpacity style={ChatBoxStyles.faqItem} onPress={() => handleFaqPress(item)}>
            <Text style={ChatBoxStyles.faqText}>{item.cb_que}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={ChatBoxStyles.container}>
            <StatusBar style="light" />
            <View style={header.header}>
                <Icon name="arrow-back" size={30} color="white" onPress={() => navigation.goBack()} />
                <Text style={header.headerText}>ChatBox</Text>
                <Image source={require('@assets/icon-app.png')} style={header.logo} />
            </View>
            <FlatList
                data={faqs}
                renderItem={renderFaqItem}
                keyExtractor={(item) => item.id_que.toString()}
                style={ChatBoxStyles.faqList}
                contentContainerStyle={{ paddingBottom: 10 }}
                ListHeaderComponent={<Text style={ChatBoxStyles.sectionTitle}>Preguntas Frecuentes</Text>}
                ListFooterComponent={<View style={{ marginBottom: 10 }} />}
            />
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item, index) => index.toString()}
                style={ChatBoxStyles.chat}
                contentContainerStyle={{ flexGrow: 1, padding: 16 }}
                ref={chatListRef}
            />
            <View style={ChatBoxStyles.footer}>
                <Text style={ChatBoxStyles.footerText}>Por favor, selecciona una pregunta de la lista superior.</Text>
            </View>
        </View>
    );
};

export default ChatBox;
