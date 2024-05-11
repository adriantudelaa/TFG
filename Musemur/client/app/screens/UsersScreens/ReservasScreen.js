import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, Modal, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";
import { Calendar } from "react-native-calendars";
import colors from "../styles/colors";

export default class ReservationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservas: [
                { id: '1', museo: 'Museo 1', fecha: '2023-06-01', detalles: 'Detalle de la reserva para Museo 1' },
                { id: '2', museo: 'Museo 2', fecha: '2023-06-15', detalles: 'Detalle de la reserva para Museo 2' },
                { id: '3', museo: 'Museo 3', fecha: '2023-07-01', detalles: 'Detalle de la reserva para Museo 3' },
            ],
            modalVisible: false,
            reservaSeleccionada: null,
        };
    }

    handleLogout = () => {
        Alert.alert("Cerrar Sesión", "¿Está seguro que desea cerrar sesión?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Cerrar Sesión", onPress: () => this.props.navigation.navigate('Login') }
        ]);
    }

    renderReserva = ({ item }) => (
        <TouchableOpacity style={styles.reservaItem} onPress={() => this.setState({ modalVisible: true, reservaSeleccionada: item })}>
            <Text style={styles.reservaText}>Museo: {item.museo}</Text>
            <Text style={styles.reservaText}>Fecha: {item.fecha}</Text>
        </TouchableOpacity>
    );

    render() {
        const { navigation } = this.props;
        const { reservas, modalVisible, reservaSeleccionada } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent={true} style="light" />
                <View style={styles.header}>
                    <Image source={require('../../assets/icon.png')} style={styles.logo} />
                    <Text style={styles.headerText}>Musemur</Text>
                    <Icon name="house" size={30} color={colors.WHITE} onPress={this.handleLogout} />
                </View>
                <View style={styles.calendarContainer}>
                    <Calendar
                        onDayPress={(day) => {
                            console.log('selected day', day);
                        }}
                        theme={{
                            selectedDayBackgroundColor: colors.LIGHTPRIMARYCOLOR,
                            todayTextColor: colors.PRIMARYCOLOR,
                            arrowColor: colors.PRIMARYCOLOR,
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.createReservationButton}
                        onPress={() => navigation.navigate('Reserva')}
                    >
                        <Text style={styles.buttonText}>Crear Reserva</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.reservasContainer}>
                    <Text style={styles.sectionTitle}>Mis Reservas</Text>
                    <FlatList
                        data={reservas}
                        renderItem={this.renderReserva}
                        keyExtractor={item => item.id}
                    />
                </View>

                {reservaSeleccionada && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            this.setState({ modalVisible: false });
                        }}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalTitle}>Detalle de la Reserva</Text>
                                <Text style={styles.modalText}>Museo: {reservaSeleccionada.museo}</Text>
                                <Text style={styles.modalText}>Fecha: {reservaSeleccionada.fecha}</Text>
                                <Text style={styles.modalText}>Detalles: {reservaSeleccionada.detalles}</Text>
                                <Button
                                    title="Cerrar"
                                    onPress={() => {
                                        this.setState({ modalVisible: false });
                                    }}
                                />
                            </View>
                        </View>
                    </Modal>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.PRIMARYCOLOR,
        paddingTop: 50,
        paddingBottom: 30,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    logo: {
        height: 50,
        width: 50,
    },
    headerText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    calendarContainer: {
        flex: 3,
        padding: 10,
        backgroundColor: "#f5f5f5",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
    },
    buttonContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    createReservationButton: {
        flexDirection: 'row',
        backgroundColor: colors.PRIMARYCOLOR,
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    reservasContainer: {
        flex: 2,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    reservaItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
    },
    reservaText: {
        fontSize: 16,
        color: "#333",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
});
