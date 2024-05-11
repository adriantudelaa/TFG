import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";
import colors from "../styles/colors.js";

export default class PrincipalScreen extends Component {
    render() {
        const museums = [
            { name: "Museo de Historia Natura", description: "El Cartagena alberga una vasta colección de especímenes de la naturaleza y exhibiciones que muestran la diversidad de la vida en la Tierra.", image: 'https://static.anuevayork.com/wp-content/uploads/2021/02/18105800/Visitar-el-Museo-de-Historia-Natural-de-Nueva-York-Precios-entradas-y-que-ver.jpg', map: 'https://maps.googleapis.com/maps/api/staticmap?center=37.6339278,-1.0078763&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7Clabel:M%7C37.6339278,-1.0078763&key=AIzaSyD-b7pshZfvSNYia0vxGTwYNEVBA9dhd0I' },
            { name: "Cartagena", description: "El Cartagena alberga una vasta colección de especímenes de la naturaleza y exhibiciones que muestran la diversidad de la vida en la Tierra.", image: 'https://static.anuevayork.com/wp-content/uploads/2021/02/18105800/Visitar-el-Museo-de-Historia-Natural-de-Nueva-York-Precios-entradas-y-que-ver.jpg', map: 'https://maps.googleapis.com/maps/api/staticmap?center=37.6339278,-1.0078763&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7Clabel:M%7C37.6339278,-1.0078763&key=AIzaSyD-b7pshZfvSNYia0vxGTwYNEVBA9dhd0I' },
            // Añadir más museos aquí
        ];
        return (
            <View style={[{ flex: 1, backgroundColor: colors.PRIMARYCOLOR }]}>
                <StatusBar translucent={true} style="light" />
                <View style={styles.header}>
                    <Icon name="menu" size={30} color="white" onPress={() => this.props.navigation.openDrawer()} />
                    <Text style={styles.headerText}>Musemur</Text>
                    <Image source={require('../../assets/icon.png')} style={styles.logo} />
                </View>
                <View style={styles.contentContainer}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        {museums.map((museum, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.item}
                                onPress={() => this.props.navigation.navigate('Museum', { museum })}
                            >
                                <Image source={{ uri: museum.image }} style={styles.previewImage} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.itemText}>{museum.name}</Text>
                                    <Text style={styles.itemDescription}>{museum.description}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
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
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "#fff",
    },
    headerText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    scrollView: {
        paddingBottom: 20,
    },
    item: {
        backgroundColor: "#fff",
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    previewImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 15,
    },
    itemText: {
        fontSize: 18,
        color: "#333",
        fontWeight: "bold",
    },
    itemDescription: {
        fontSize: 14,
        color: "#666",
    },
});