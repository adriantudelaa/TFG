import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import colors from '@styles/colors';
import { CreateReservaStyles } from '@styles/styles';

// Componente funcional para crear una reserva
const CreateReservaScreen = ({ navigation }) => {
    // Estado inicial del componente
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [dni, setDni] = useState('');
    const [personas, setPersonas] = useState('');
    const [fechaReserva, setFechaReserva] = useState(new Date());
    const [museoSeleccionado, setMuseoSeleccionado] = useState('');
    const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
    const [errores, setErrores] = useState({});
    const [enviado, setEnviado] = useState(false);

    // Maneja la creación de la reserva
    const handleCreateReserva = () => {
        // Validar los campos
        const errores = validarCampos();
        setErrores(errores);
        setEnviado(true);

        // Si no hay errores, crear la reserva y navegar a la pantalla de reservas
        if (Object.keys(errores).length === 0) {
            const nuevaReserva = {
                id: Math.random().toString(36).substr(2, 9),
                museo: museoSeleccionado,
                fecha: fechaReserva.toLocaleDateString(),
                detalles: `Reserva para ${nombre} ${apellidos}`
            };
            navigation.navigate('Reservas', { nuevaReserva });
        }
    };

    // Validar los campos del formulario
    const validarCampos = () => {
        const errores = {};

        if (!nombre) errores.nombre = 'El nombre es requerido';
        if (!dni) {
            errores.dni = 'El DNI es requerido';
        } else if (!/^\d{8}[a-zA-Z]?$/.test(dni)) {
            errores.dni = 'El DNI no es válido';
        }
        if (!personas) errores.personas = 'El número de personas es requerido';

        return errores;
    };

    // Maneja el cambio de la fecha seleccionada
    const onChangeFecha = (event, selectedDate) => {
        setFechaReserva(selectedDate || fechaReserva);
        setMostrarDatePicker(false);
    };

    return (
        <View style={CreateReservaStyles.container}>
            {/* Botón para volver a la pantalla anterior */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={CreateReservaStyles.backButton}>
                <Ionicons name='arrow-back' size={24} color={colors.PRIMARYCOLOR} />
                <Text style={CreateReservaStyles.backButtonText}>Volver</Text>
            </TouchableOpacity>
            <Text style={CreateReservaStyles.title}>Crear Reserva</Text>
            
            {/* Campo para el nombre */}
            <TextInput
                style={[CreateReservaStyles.input, enviado && errores.nombre ? CreateReservaStyles.inputError : null]}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            {enviado && errores.nombre && <Text style={CreateReservaStyles.errorText}>{errores.nombre}</Text>}

            {/* Campo para los apellidos */}
            <TextInput
                style={CreateReservaStyles.input}
                placeholder="Apellidos"
                value={apellidos}
                onChangeText={setApellidos}
            />

            {/* Campo para el DNI */}
            <TextInput
                style={[CreateReservaStyles.input, enviado && errores.dni ? CreateReservaStyles.inputError : null]}
                placeholder="DNI"
                value={dni}
                onChangeText={setDni}
                maxLength={9}
            />
            {enviado && errores.dni && <Text style={CreateReservaStyles.errorText}>{errores.dni}</Text>}

            {/* Campo para el número de personas */}
            <TextInput
                style={[CreateReservaStyles.input, enviado && errores.personas ? CreateReservaStyles.inputError : null]}
                placeholder="N. personas"
                value={personas}
                onChangeText={setPersonas}
            />
            {enviado && errores.personas && <Text style={CreateReservaStyles.errorText}>{errores.personas}</Text>}

            {/* Selector de fecha */}
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
                    onChange={onChangeFecha}
                />
            )}

            {/* Selector del museo */}
            <Picker
                selectedValue={museoSeleccionado}
                style={CreateReservaStyles.picker}
                onValueChange={setMuseoSeleccionado}
            >
                <Picker.Item label="Seleccione un museo" value="" />
                <Picker.Item label="Museo 1" value="museo1" />
                <Picker.Item label="Museo 2" value="museo2" />
                <Picker.Item label="Museo 3" value="museo3" />
            </Picker>

            {/* Botón para añadir la reserva */}
            <TouchableOpacity style={CreateReservaStyles.addButton} onPress={handleCreateReserva}>
                <Text style={CreateReservaStyles.addButtonText}>Añadir Reserva</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CreateReservaScreen;