import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView, Alert, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";
import { Dialog, Portal, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from "@styles/colors";
import { header, ReservasAdminStyles } from "@styles/styles";

const AdminReservationScreen = ({ navigation }) => {
    const [reservas, setReservas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchReservas();
    }, []);

    const fetchReservas = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            const response = await axios.get('https://musemur-production.up.railway.app/api/reservas', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setReservas(response.data);
        } catch (error) {
            console.error('Error al obtener reservas:', error);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchReservas();
        setRefreshing(false);
    };

    const showDialog = (reserva) => {
        setReservaSeleccionada(reserva);
        setModalVisible(true);
    };

    const hideDialog = () => setModalVisible(false);

    const confirmAction = (title, message, action) => {
        Alert.alert(title, message, [
            { text: "No", style: "cancel" },
            { text: "Sí", onPress: action }
        ]);
    };

    const updateReserva = async (status) => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            await axios.put('https://musemur-production.up.railway.app/api/reservas', {
                id_reserva: reservaSeleccionada.id,
                cancelada: status
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchReservas();
            setModalVisible(false);
        } catch (error) {
            console.error('Error al actualizar la reserva:', error);
        }
    };

    const deleteReserva = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            await axios.delete('https://musemur-production.up.railway.app/api/reservas/admin', {
                data: { id_reserva: reservaSeleccionada.id },
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchReservas();
            setModalVisible(false);
        } catch (error) {
            console.error('Error al eliminar la reserva:', error);
        }
    };

    const groupedReservas = reservas.reduce((acc, reserva) => {
        if (!acc[reserva.museo]) acc[reserva.museo] = [];
        acc[reserva.museo].push(reserva);
        return acc;
    }, {});

    const renderReserva = (item) => (
        <TouchableOpacity key={item.id} style={[ReservasAdminStyles.card, item.cancelada && ReservasAdminStyles.reservaCancelada]} onPress={() => showDialog(item)}>
            <View style={ReservasAdminStyles.cardHeader}>
                <Image source={require('@assets/icon.png')} style={ReservasAdminStyles.image} />
                <View style={ReservasAdminStyles.cardTextContainer}>
                    <Text style={[ReservasAdminStyles.museumName, item.cancelada && ReservasAdminStyles.textCancelado]}>Fecha: {item.fecha}</Text>
                    <Text style={[ReservasAdminStyles.date, item.cancelada && ReservasAdminStyles.textCancelado]}>Detalles: {item.detalles}</Text>
                    {item.cancelada && <Text style={ReservasAdminStyles.canceladoLabel}>Cancelada</Text>}
                </View>
                <View style={ReservasAdminStyles.guestsContainer}>
                    <Icon name="info" size={24} color={item.cancelada ? colors.DANGER : colors.PRIMARYCOLOR} />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: colors.WHITESECONDARY }}>
            <StatusBar style="light" />
            <View style={header.header}>
                <Icon name="menu" size={30} color="white" onPress={() => navigation.openDrawer()} />
                <Text style={header.headerText}>Admin - Musemur</Text>
                <Image source={require('@assets/icon-app.png')} style={header.logo} />
            </View>
            <ScrollView
                contentContainerStyle={ReservasAdminStyles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Text style={ReservasAdminStyles.title}>Reservas</Text>
                {Object.keys(groupedReservas).map((museo, index) => (
                    <View key={index} style={ReservasAdminStyles.museumSection}>
                        <Text style={ReservasAdminStyles.museumTitle}>{museo}</Text>
                        {groupedReservas[museo].map(renderReserva)}
                    </View>
                ))}
                <Portal>
                    <Dialog visible={modalVisible} onDismiss={hideDialog}>
                        <Dialog.Title>Detalle de la Reserva</Dialog.Title>
                        <Dialog.Content>
                            {reservaSeleccionada && (
                                <>
                                    <Text style={ReservasAdminStyles.modalText}>Museo: {reservaSeleccionada.museo}</Text>
                                    <Text style={ReservasAdminStyles.modalText}>Fecha: {reservaSeleccionada.fecha}</Text>
                                    <Text style={ReservasAdminStyles.modalText}>Usuario: {reservaSeleccionada.usuario.nombre}</Text>
                                    <Text style={ReservasAdminStyles.modalText}>Email: {reservaSeleccionada.usuario.email}</Text>
                                    <Text style={ReservasAdminStyles.modalText}>Detalles: {reservaSeleccionada.detalles}</Text>
                                </>
                            )}
                        </Dialog.Content>
                        <Dialog.Actions>
                            {!reservaSeleccionada?.cancelada && <Button onPress={() => confirmAction("Cancelar Reserva", "¿Estás segura de que deseas cancelar esta reserva?", () => updateReserva(1))}>Cancelar</Button>}
                            {reservaSeleccionada?.cancelada && <Button onPress={() => confirmAction("Restaurar Reserva", "¿Estás segura de que deseas restaurar esta reserva?", () => updateReserva(0))}>Restaurar</Button>}
                            <Button onPress={() => confirmAction("Borrar Reserva", "¿Estás segura de que deseas borrar esta reserva?", deleteReserva)}>Borrar</Button>
                            <Button onPress={hideDialog}>Cerrar</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ScrollView>
        </View>
    );
};

export default AdminReservationScreen;
