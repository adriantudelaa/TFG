import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '@styles/colors';

const CustomAlertConfirm = ({ visible, title, message, onConfirm, onCancel }) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
        >
            <View style={styles.modalBackground}>
                <View style={styles.alertContainer}>
                    <Text style={styles.alertTitle}>{title}</Text>
                    <Text style={styles.alertMessage}>{message}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.alertButton} onPress={onCancel}>
                            <Text style={styles.alertButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.alertButton} onPress={onConfirm}>
                            <Text style={styles.alertButtonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertContainer: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    alertTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.PRIMARYCOLOR,
    },
    alertMessage: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    alertButton: {
        backgroundColor: colors.PRIMARYCOLOR,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
    },
    alertButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default CustomAlertConfirm;
