import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView, Alert, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";
import { Dialog, Portal, Button } from 'react-native-paper';
import colors from "@styles/colors";
import { header, loginStyles, ReservasStyles } from "@styles/styles";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReservationScreen = ({ navigation }) => {
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
            const response = await axios.get('https://musemur-production.up.railway.app/api/reservas/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = response.data.map(reserva => ({
                ...reserva,
                cancelada: reserva.cancelada === 1
            }));
            setReservas(data);
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

    const handleCancelReserva = () => {
        Alert.alert(
            "Cancelar Reserva",
            "¿Estás segura de que deseas cancelar esta reserva?",
            [
                { text: "No", style: "cancel" },
                { text: "Sí", onPress: cancelReserva }
            ]
        );
    };

    const cancelReserva = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            await axios.put('https://musemur-production.up.railway.app/api/reservas', {
                id_reserva: reservaSeleccionada.id,
                cancelada: true
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchReservas();
            setModalVisible(false);
        } catch (error) {
            console.error('Error al cancelar la reserva:', error);
        }
    };

    const activeReservations = reservas.filter(reserva => !reserva.cancelada);
    const canceledReservations = reservas.filter(reserva => reserva.cancelada);

    const renderReserva = (item) => (
        <TouchableOpacity key={item.id} style={[ReservasStyles.card, item.cancelada && ReservasStyles.cancelada]} onPress={() => showDialog(item)}>
            <View style={ReservasStyles.cardHeader}>
                <Image source={require('@assets/icon.png')} style={ReservasStyles.image} />
                <View style={ReservasStyles.cardTextContainer}>
                    <Text style={[ReservasStyles.museumName, item.cancelada && ReservasStyles.textCancelado]}>{item.museo}</Text>
                    <Text style={[ReservasStyles.date, item.cancelada && ReservasStyles.textCancelado]}>{item.fecha}</Text>
                    <Text style={[ReservasStyles.details, item.cancelada && ReservasStyles.textCancelado]}>{item.hora}</Text>
                </View>
                <View style={ReservasStyles.guestsContainer}>
                    <Icon name="person" color={item.cancelada ? colors.DANGER : colors.PRIMARYCOLOR} />
                    <Text style={[ReservasStyles.guests, item.cancelada && ReservasStyles.textCancelado]}>{item.personas}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: colors.WHITESECONDARY }}>
            <StatusBar style="light" />
            <View style={header.header}>
                <Icon name="menu" size={30} color="white" onPress={() => navigation.openDrawer()} />
                <Text style={header.headerText}>Musemur</Text>
                <Image source={require('@assets/icon-app.png')} style={header.logo} />
            </View>
            <ScrollView
                contentContainerStyle={ReservasStyles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Text style={ReservasStyles.title}>Reservas</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Reserva")} style={ReservasStyles.addButton}>
                    <Text style={loginStyles.btntxt}>Añadir Reserva</Text>
                </TouchableOpacity>
                {activeReservations.length > 0 ? activeReservations.map(renderReserva) : (
                    <Text style={ReservasStyles.noReservations}>No tienes reservas activas</Text>
                )}
                {canceledReservations.length > 0 && (
                    <View style={ReservasStyles.cancelledSection}>
                        <Text style={ReservasStyles.cancelledTitle}>Reservas Canceladas</Text>
                        {canceledReservations.map(renderReserva)}
                    </View>
                )}
                <Portal>
                    <Dialog visible={modalVisible} onDismiss={hideDialog}>
                        <Dialog.Title>Detalle de la Reserva</Dialog.Title>
                        <Dialog.Content>
                            <View>
                                {reservaSeleccionada && (
                                    <>
                                        <Text style={ReservasStyles.modalText}>Museo: {reservaSeleccionada.museo}</Text>
                                        <Text style={ReservasStyles.modalText}>Fecha: {reservaSeleccionada.fecha}</Text>
                                        <Text style={ReservasStyles.modalText}>Personas: {reservaSeleccionada.personas}</Text>
                                        <Text style={ReservasStyles.modalText}>Detalles: {reservaSeleccionada.hora}</Text>
                                    </>
                                )}
                            </View>
                        </Dialog.Content>
                        <Dialog.Actions>
                            {!reservaSeleccionada?.cancelada && (
                                <Button onPress={handleCancelReserva}>Cancelar</Button>
                            )}
                            <Button onPress={hideDialog}>Cerrar</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ScrollView>
        </View>
    );
};

export default ReservationScreen;
