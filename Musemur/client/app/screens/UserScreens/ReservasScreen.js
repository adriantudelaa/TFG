import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, FlatList, Modal, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";
import { Calendar } from "react-native-calendars";
import colors from "@styles/colors";
import { header, ReservasStyles } from "@styles/styles";

const ReservationScreen = ({ navigation }) => {
    // Estado inicial del componente
    const [reservas, setReservas] = useState([
        { id: '1', museo: 'Museo 1', fecha: '2023-06-01', detalles: 'Detalle de la reserva para Museo 1', personas: '2' },
        { id: '2', museo: 'Museo 2', fecha: '2023-06-15', detalles: 'Detalle de la reserva para Museo 2', personas: '5' },
        { id: '3', museo: 'Museo 3', fecha: '2023-07-01', detalles: 'Detalle de la reserva para Museo 3', personas: '10' },
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

    // Renderiza cada reserva
    const renderReserva = ({ item }) => (
        <TouchableOpacity style={ReservasStyles.reservaItem} onPress={() => {
            setReservaSeleccionada(item);
            setModalVisible(true);
        }}>
            <Text style={ReservasStyles.reservaText}>Museo: {item.museo}</Text>
            <Text style={ReservasStyles.reservaText}>Fecha: {item.fecha}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: colors.PRIMARYCOLOR }}>
            {/* Barra de estado */}
            <StatusBar translucent={true} style="light" />
            {/* Encabezado */}
            <View style={header.header}>
                <Icon name="menu" size={30} color="white" onPress={() => navigation.openDrawer()} />
                <Text style={header.headerText}>Musemur</Text>
                <Image source={require('@assets/icon.png')} style={header.logo} />
            </View>
            <View style={ReservasStyles.contentContainer}>
                {/* Calendario */}
                <Calendar
                    onDayPress={(day) => {
                        console.log('selected day', day);
                    }}
                    theme={{
                        selectedDayBackgroundColor: colors.LIGHTPRIMARYCOLOR,
                        todayTextColor: colors.PRIMARYCOLOR,
                        arrowColor: colors.PRIMARYCOLOR,
                    }}
                    style={ReservasStyles.calendar}
                />
                {/* Botón para crear reserva */}
                <View style={ReservasStyles.buttonContainer}>
                    <TouchableOpacity
                        style={ReservasStyles.createReservationButton}
                        onPress={() => navigation.navigate('Reserva')}
                    >
                        <Text style={ReservasStyles.buttonText}>Crear Reserva</Text>
                    </TouchableOpacity>
                </View>
                {/* Lista de reservas */}
                <View style={ReservasStyles.reservasContainer}>
                    <Text style={ReservasStyles.sectionTitle}>Mis Reservas</Text>
                    <FlatList
                        data={reservas}
                        renderItem={renderReserva}
                        keyExtractor={item => item.id}
                    />
                </View>

                {/* Modal para mostrar detalles de la reserva */}
                {reservaSeleccionada && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={ReservasStyles.modalContainer}>
                            <View style={ReservasStyles.modalView}>
                                <Text style={ReservasStyles.modalTitle}>Detalle de la Reserva</Text>
                                <Text style={ReservasStyles.modalText}>Museo: {reservaSeleccionada.museo}</Text>
                                <Text style={ReservasStyles.modalText}>Fecha: {reservaSeleccionada.fecha}</Text>
                                <Text style={ReservasStyles.modalText}>Personas: {reservaSeleccionada.personas}</Text>
                                <Text style={ReservasStyles.modalText}>Detalles: {reservaSeleccionada.detalles}</Text>
                                <Button title="Cerrar" onPress={() => setModalVisible(false)} />
                            </View>
                        </View>
                    </Modal>
                )}
            </View>
        </View>
    );
};

export default ReservationScreen;