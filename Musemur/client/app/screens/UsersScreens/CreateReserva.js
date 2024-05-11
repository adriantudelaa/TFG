import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../styles/colors';
import {loginStyles} from '../styles/styles';
import { Picker } from '@react-native-picker/picker';
import {Icon} from 'react-native-elements';

export default class CreateReservaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellidos: '',
            dni: '',
            fechaReserva: new Date(),
            museoSeleccionado: '',
            mostrarDatePicker: false
        };
    }

    handleCreateReserva = () => {
        Alert.alert("Crear Reserva", "Está a punto de reservas ¿Está seguro? ", [
            { text: "Cancelar"},
            { text: "Confirmar", onPress: () => Alert.alert("Reserva creada", "La reserva se ha creado correctamente", 
            [{text : "Aceptar", onPress: () => this.props.navigation.navigate('App') }])}
        ]);
    }


    onChangeFecha = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.fechaReserva;
        this.setState({ fechaReserva: currentDate, mostrarDatePicker: false });
    };

    render() {
        const { nombre, apellidos, dni, fechaReserva, museoSeleccionado, mostrarDatePicker } = this.state;

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('App')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name='arrow-back' size={30} color={colors.PRIMARYCOLOR} />
                                <Text style={[loginStyles.btntxt, { color: colors.PRIMARYCOLOR, marginLeft: 5 }]}>Volver</Text>
                            </TouchableOpacity>
                <Text style={styles.title}>Crear Reserva</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={nombre}
                    onChangeText={(text) => this.setState({ nombre: text })}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Apellidos"
                    value={apellidos}
                    onChangeText={(text) => this.setState({ apellidos: text })}
                />

                <TextInput
                    style={styles.input}
                    placeholder="DNI"
                    value={dni}
                    onChangeText={(text) => this.setState({ dni: text })}
                />

                <TouchableOpacity onPress={() => this.setState({ mostrarDatePicker: true })} style={styles.dateButton}>
                    <Text style={styles.dateButtonText}>
                        {fechaReserva.toLocaleDateString()}
                    </Text>
                </TouchableOpacity>

                {mostrarDatePicker && (
                    <DateTimePicker
                        value={fechaReserva}
                        mode="date"
                        display="default"
                        onChange={this.onChangeFecha}
                    />
                )}

                <Picker
                    selectedValue={museoSeleccionado}
                    style={styles.picker}
                    onValueChange={(itemValue) =>
                        this.setState({ museoSeleccionado: itemValue })
                    }>
                    <Picker.Item label="Seleccione un museo" value="" />
                    <Picker.Item label="Museo 1" value="museo1" />
                    <Picker.Item label="Museo 2" value="museo2" />
                    <Picker.Item label="Museo 3" value="museo3" />
                </Picker>

                <TouchableOpacity style={styles.addButton} onPress={this.handleCreateReserva}>
                    <Text style={styles.addButtonText}>Añadir Reserva</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    dateButton: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.LIGHTPRIMARYCOLOR,
        marginBottom: 20,
    },
    dateButtonText: {
        color: 'white',
        fontSize: 16,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: colors.PRIMARYCOLOR,
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
