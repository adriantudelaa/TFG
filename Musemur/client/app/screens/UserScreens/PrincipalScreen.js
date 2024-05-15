import React from "react";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";
import colors from "@styles/colors.js";
import { header, PrincipalStyles } from "@styles/styles.js";

// Componente principal para la pantalla principal
const PrincipalScreen = ({ navigation }) => {
    // Lista de museos
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
        // Añadir más museos aquí
    ];

    return (
        <View style={{ flex: 1, backgroundColor: colors.PRIMARYCOLOR }}>
            {/* Barra de estado */}
            <StatusBar translucent={true} style="light" />
            
            {/* Encabezado */}
            <View style={header.header}>
                {/* Botón de menú */}
                <Icon name="menu" size={30} color="white" onPress={() => navigation.openDrawer()} />
                <Text style={header.headerText}>Musemur</Text>
                <Image source={require('@assets/icon.png')} style={header.logo} />
            </View>
            
            {/* Contenedor principal */}
            <View style={PrincipalStyles.contentContainer}>
                <ScrollView contentContainerStyle={PrincipalStyles.scrollView}>
                    {/* Lista de museos */}
                    {museums.map((museum, index) => (
                        <TouchableOpacity
                            key={index}
                            style={PrincipalStyles.item}
                            onPress={() => navigation.navigate('Museum', { museum })}
                        >
                            <Image source={{ uri: museum.image }} style={PrincipalStyles.previewImage} />
                            <View style={{ flex: 1 }}>
                                <Text style={PrincipalStyles.itemText}>{museum.name}</Text>
                                <Text style={PrincipalStyles.itemDescription}>{museum.description}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default PrincipalScreen;