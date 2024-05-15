import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, FlatList, Modal, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";
import { Calendar } from "react-native-calendars";
import colors from "@styles/colors";
import { header, ReservasAdminStyles } from "@styles/styles";

// Componente funcional para la pantalla de reservas del administrador
const AdminReservationScreen = ({ navigation }) => {
    // Estado inicial para las reservas, visibilidad del modal y reserva seleccionada
    const [reservas, setReservas] = useState([
        { id: '1', museo: 'Museo 1', fecha: '2023-06-01', detalles: 'Detalle de la reserva para Museo 1', usuario: { nombre: 'Juan', email: 'juan@example.com' }, cancelada: false },
        { id: '2', museo: 'Museo 2', fecha: '2023-06-15', detalles: 'Detalle de la reserva para Museo 2', usuario: { nombre: 'María', email: 'maria@example.com' }, cancelada: false },
        { id: '3', museo: 'Museo 3', fecha: '2023-07-01', detalles: 'Detalle de la reserva para Museo 3', usuario: { nombre: 'Pedro', email: 'pedro@example.com' }, cancelada: false },
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

    // Función para manejar la cancelación de una reserva
    const handleCancelReserva = () => {
        Alert.alert(
            "Cancelar Reserva",
            "¿Estás seguro de que deseas cancelar esta reserva?",
            [
                { text: "No", style: "cancel" },
                { text: "Sí", onPress: cancelReserva }
            ]
        );
    };

    // Función para marcar una reserva como cancelada
    const cancelReserva = () => {
        const updatedReservas = reservas.map(reserva => {
            if (reserva.id === reservaSeleccionada.id) {
                return { ...reserva, cancelada: true };
            }
            return reserva;
        });

        setReservas(updatedReservas);
        setModalVisible(false);
        setReservaSeleccionada(null);
    };

    // Función para manejar la eliminación de una reserva
    const handleDeleteReserva = () => {
        Alert.alert(
            "Borrar Reserva",
            "¿Estás seguro de que deseas borrar esta reserva?",
            [
                { text: "No", style: "cancel" },
                { text: "Sí", onPress: deleteReserva }
            ]
        );
    };

    // Función para eliminar una reserva
    const deleteReserva = () => {
        setReservas(reservas.filter(reserva => reserva.id !== reservaSeleccionada.id));
        setModalVisible(false);
        setReservaSeleccionada(null);
    };

    // Función para renderizar cada reserva en la lista
    const renderReserva = ({ item }) => (
        <TouchableOpacity
            style={[ReservasAdminStyles.reservaItem, item.cancelada && ReservasAdminStyles.reservaCancelada]}
            onPress={() => {
                setModalVisible(true);
                setReservaSeleccionada(item);
            }}
        >
            <View style={ReservasAdminStyles.reservaInfo}>
                <Text style={[ReservasAdminStyles.reservaText, item.cancelada && ReservasAdminStyles.textCancelado]}>Museo: {item.museo}</Text>
                <Text style={[ReservasAdminStyles.reservaText, item.cancelada && ReservasAdminStyles.textCancelado]}>Fecha: {item.fecha}</Text>
                {item.cancelada && <Text style={ReservasAdminStyles.canceladoLabel}>Cancelada</Text>}
            </View>
            <Icon name="info" size={24} color={item.cancelada ? colors.DANGER : colors.PRIMARYCOLOR} />
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: colors.ADMINPRIMARYCOLOR }}>
            <StatusBar translucent={true} style="light" />
            <View style={header.header}>
                <Icon name="menu" size={30} color="white" onPress={() => navigation.openDrawer()} />
                <Text style={header.headerText}>Admin - Musemur</Text>
                <Image source={require('@assets/icon.png')} style={header.logo} />
            </View>
            <View style={ReservasAdminStyles.contentContainer}>
                <Calendar
                    onDayPress={(day) => {
                        console.log('selected day', day);
                    }}
                    theme={{
                        selectedDayBackgroundColor: colors.LIGHTPRIMARYCOLOR,
                        todayTextColor: colors.PRIMARYCOLOR,
                        arrowColor: colors.PRIMARYCOLOR,
                    }}
                    style={ReservasAdminStyles.calendar}
                />
                <View style={ReservasAdminStyles.reservasContainer}>
                    <Text style={ReservasAdminStyles.sectionTitle}>Reservas</Text>
                    <FlatList
                        data={reservas}
                        renderItem={renderReserva}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>

            {reservaSeleccionada && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={ReservasAdminStyles.modalContainer}>
                        <View style={ReservasAdminStyles.modalView}>
                            <Text style={ReservasAdminStyles.modalTitle}>Detalle de la Reserva</Text>
                            <Text style={ReservasAdminStyles.modalText}>Museo: {reservaSeleccionada.museo}</Text>
                            <Text style={ReservasAdminStyles.modalText}>Fecha: {reservaSeleccionada.fecha}</Text>
                            <Text style={ReservasAdminStyles.modalText}>Detalles: {reservaSeleccionada.detalles}</Text>
                            <Text style={ReservasAdminStyles.modalText}>Usuario: {reservaSeleccionada.usuario.nombre}</Text>
                            <Text style={ReservasAdminStyles.modalText}>Email: {reservaSeleccionada.usuario.email}</Text>
                            <View style={ReservasAdminStyles.buttonGroup}>
                                {!reservaSeleccionada.cancelada && (
                                    <TouchableOpacity style={[ReservasAdminStyles.button, ReservasAdminStyles.cancelButton]} onPress={handleCancelReserva}>
                                        <Text style={ReservasAdminStyles.buttonText}>Cancelar Reserva</Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity style={[ReservasAdminStyles.button, ReservasAdminStyles.deleteButton]} onPress={handleDeleteReserva}>
                                    <Text style={ReservasAdminStyles.buttonText}>Borrar Reserva</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={[ReservasAdminStyles.button, ReservasAdminStyles.closeButton]} onPress={() => setModalVisible(false)}>
                                <Text style={ReservasAdminStyles.buttonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default AdminReservationScreen;