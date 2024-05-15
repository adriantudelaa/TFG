import React from "react";
import { Text, View, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";
import colors from "@styles/colors.js";
import { header, PrincipalAdminStyles } from "@styles/styles.js";

// Pantalla principal para administrar museos
const AdminsPrincipalScreen = ({ navigation }) => {
    // Función para manejar la edición del museo
    const handleEdit = (museum) => {
        Alert.alert("Editar Museo", `Editar información del museo: ${museum.name}`);
    };

    // Lista de museos con su información
    const museums = [
        {
            name: "Museo de Historia Natura",
            description: "El Cartagena alberga una vasta colección de especímenes de la naturaleza y exhibiciones que muestran la diversidad de la vida en la Tierra.",
            image: 'https://static.anuevayork.com/wp-content/uploads/2021/02/18105800/Visitar-el-Museo-de-Historia-Natural-de-Nueva-York-Precios-entradas-y-que-ver.jpg',
            map: 'https://maps.googleapis.com/maps/api/staticmap?center=37.6339278,-1.0078763&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7Clabel:M%7C37.6339278,-1.0078763&key=AIzaSyD-b7pshZfvSNYia0vxGTwYNEVBA9dhd0I'
        },
        {
            name: "Cartagena",
            description: "El Cartagena alberga una vasta colección de especímenes de la naturaleza y exhibiciones que muestran la diversidad de la vida en la Tierra.",
            image: 'https://static.anuevayork.com/wp-content/uploads/2021/02/18105800/Visitar-el-Museo-de-Historia-Natural-de-Nueva-York-Precios-entradas-y-que-ver.jpg',
            map: 'https://maps.googleapis.com/maps/api/staticmap?center=37.6339278,-1.0078763&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7Clabel:M%7C37.6339278,-1.0078763&key=AIzaSyD-b7pshZfvSNYia0vxGTwYNEVBA9dhd0I'
        },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: colors.ADMINPRIMARYCOLOR }}>
            <StatusBar translucent={true} style="light" />
            <View style={header.header}>
                <Icon name="menu" size={30} color="white" onPress={() => navigation.openDrawer()} />
                <Text style={header.headerText}>Admin - Musemur</Text>
                <Image source={require('@assets/icon.png')} style={header.logo} />
            </View>
            <View style={PrincipalAdminStyles.contentContainer}>
                <ScrollView contentContainerStyle={PrincipalAdminStyles.scrollView}>
                    {museums.map((museum, index) => (
                        <TouchableOpacity
                            key={index}
                            style={PrincipalAdminStyles.item}
                        >
                            <Image source={{ uri: museum.image }} style={PrincipalAdminStyles.previewImage} />
                            <View style={{ flex: 1 }}>
                                <Text style={PrincipalAdminStyles.itemText}>{museum.name}</Text>
                                <Text style={PrincipalAdminStyles.itemDescription}>{museum.description}</Text>
                            </View>
                            <Icon name="edit" size={24} color={colors.PRIMARYCOLOR} onPress={() => handleEdit(museum)} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default AdminsPrincipalScreen;