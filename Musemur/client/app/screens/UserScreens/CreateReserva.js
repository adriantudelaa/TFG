import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginStyles, CreateReservaStyles } from '@styles/styles';
import colors from '@styles/colors';

const CreateReservaScreen = ({ navigation }) => {
    const [personas, setPersonas] = useState('1');
    const [fechaReserva, setFechaReserva] = useState(new Date());
    const [horaReserva, setHoraReserva] = useState(null);
    const [museoSeleccionado, setMuseoSeleccionado] = useState('');
    const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
    const [errores, setErrores] = useState({});
    const [enviado, setEnviado] = useState(false);
    const [horasDisponibles, setHorasDisponibles] = useState([]);
    const [museos, setMuseos] = useState([]);

    useEffect(() => {
        fetchMuseos();
        generateHorasDisponibles();
    }, []);

    const fetchMuseos = async () => {
        try {
            const response = await axios.get('https://musemur-production.up.railway.app/api/museos');
            setMuseos(response.data);
        } catch (error) {
            console.error('Error al obtener museos:', error);
        }
    };

    const generateHorasDisponibles = () => {
        const horas = [];
        for (let hour = 9; hour <= 17; hour++) {
            horas.push(`${hour}:00`);
            horas.push(`${hour}:30`);
        }
        setHorasDisponibles(horas);
    };

    const validarCampos = () => {
        const errores = {};
        if (!museoSeleccionado) errores.museo = 'El museo es requerido';
        if (!horaReserva) errores.hora = 'La hora es requerida';
        if (!personas) errores.personas = 'El número de personas es requerido';
        return errores;
    };

    const handleCreateReserva = async () => {
        const errores = validarCampos();
        setErrores(errores);
        setEnviado(true);

        if (Object.keys(errores).length === 0) {
            try {
                const token = await AsyncStorage.getItem('authToken');
                await axios.post('https://musemur-production.up.railway.app/api/reservas', {
                    museum_name: museoSeleccionado,
                    reserva_date: fechaReserva.toISOString().split('T')[0],
                    reserva_hour: horaReserva,
                    reserva_people: parseInt(personas, 10),
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                Alert.alert('Éxito', 'Reserva creada exitosamente');
                navigation.navigate('Reservas');
            } catch (error) {
                console.error('Error al crear la reserva:', error);
                Alert.alert('Error', 'Hubo un problema al crear la reserva');
            }
        }
    };

    const onChangeFecha = (event, selectedDate) => {
        const currentDate = selectedDate || fechaReserva;
        setFechaReserva(currentDate);
        setMostrarDatePicker(false);
    };

    const renderHorasDisponibles = () => {
        return horasDisponibles.map((hora, index) => (
            <TouchableOpacity
                key={index}
                style={[
                    CreateReservaStyles.horaButton,
                    horaReserva === hora && CreateReservaStyles.horaButtonSelected,
                ]}
                onPress={() => setHoraReserva(hora)}
            >
                <Text
                    style={[
                        CreateReservaStyles.horaButtonText,
                        horaReserva === hora && { color: '#fff' },
                    ]}
                >
                    {hora}
                </Text>
            </TouchableOpacity>
        ));
    };

    return (
        <View style={CreateReservaStyles.container}>
            <StatusBar style="auto" />
            <ScrollView contentContainerStyle={CreateReservaStyles.containerScroll}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 }}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='arrow-back' size={30} color={colors.PRIMARYCOLOR} />
                            <Text style={[loginStyles.btntxt, { color: colors.PRIMARYCOLOR, marginLeft: 5 }]}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={CreateReservaStyles.card}>
                    <View style={CreateReservaStyles.cardHeader}>
                        <Text style={CreateReservaStyles.cardTitle}>Crear Reserva</Text>
                        <Text style={CreateReservaStyles.cardDescription}>Completa los siguientes campos para realizar tu reserva.</Text>
                    </View>
                    <View style={CreateReservaStyles.cardContent}>
                        <View style={CreateReservaStyles.inputGroup}>
                            <Text style={CreateReservaStyles.label}>Museo</Text>
                            <Picker
                                selectedValue={museoSeleccionado}
                                style={[CreateReservaStyles.input, enviado && errores.museo ? CreateReservaStyles.inputError : null]}
                                onValueChange={setMuseoSeleccionado}
                            >
                                <Picker.Item label="Seleccione un museo" value="" />
                                {museos.map(museo => (
                                    <Picker.Item key={museo.id_museo} label={museo.museum_name} value={museo.museum_name} />
                                ))}
                            </Picker>
                            {enviado && errores.museo && <Text style={CreateReservaStyles.errorText}>{errores.museo}</Text>}
                        </View>
                        <View style={CreateReservaStyles.inputGroup}>
                            <Text style={CreateReservaStyles.label}>Fecha de reserva</Text>
                            <TouchableOpacity onPress={() => setMostrarDatePicker(true)} style={CreateReservaStyles.dateButton}>
                                <Text style={CreateReservaStyles.dateButtonText}>
                                    {fechaReserva.toLocaleDateString()}
                                </Text>
                            </TouchableOpacity>
                            {mostrarDatePicker && (
                                <DateTimePicker
                                    value={fechaReserva}
                                    mode="date"
                                    display="default"
                                    minimumDate={new Date()}
                                    onChange={onChangeFecha}
                                />
                            )}
                        </View>
                        <View style={CreateReservaStyles.inputGroup}>
                            <Text style={CreateReservaStyles.label}>Hora de reserva</Text>
                            <View style={CreateReservaStyles.grid}>
                                {renderHorasDisponibles()}
                            </View>
                            {enviado && errores.hora && <Text style={CreateReservaStyles.errorText}>{errores.hora}</Text>}
                        </View>
                        <View style={CreateReservaStyles.inputGroup}>
                            <Text style={CreateReservaStyles.label}>Número de personas</Text>
                            <Picker
                                selectedValue={personas}
                                style={[CreateReservaStyles.input, enviado && errores.personas ? CreateReservaStyles.inputError : null]}
                                onValueChange={(itemValue) => setPersonas(itemValue)}
                            >
                                {[...Array(10)].map((_, i) => (
                                    <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
                                ))}
                            </Picker>
                            {enviado && errores.personas && <Text style={CreateReservaStyles.errorText}>{errores.personas}</Text>}
                        </View>
                        <TouchableOpacity style={CreateReservaStyles.btnMain} onPress={handleCreateReserva}>
                            <Text style={CreateReservaStyles.btntxt}>Añadir Reserva</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default CreateReservaScreen;
