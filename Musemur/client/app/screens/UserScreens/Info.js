import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from '@styles/colors.js';
import { header, InfoStyles } from '@styles/styles.js';

const InfoScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: colors.WHITESECONDARY }}>
            <StatusBar style="light" />

            <View style={header.header}>
                <Icon name="arrow-left" size={30} color="white" onPress={() => navigation.goBack()} />
                <Text style={header.headerText}>Musemur</Text>
                <Image source={require('@assets/icon-app.png')} style={header.logo} />
            </View>

            <ScrollView contentContainerStyle={InfoStyles.container}>
                <View style={InfoStyles.section}>
                    <Text style={InfoStyles.title}>Explore los museos como nunca antes</Text>
                    <Text style={InfoStyles.paragraph}>
                        Nuestra aplicación te brinda acceso a información detallada sobre las exposiciones, información de los museos de Murcia, gestionar tus reservas y todo desde un mismo sitio al alcance de tu móvil.
                    </Text>
                </View>
                <View style={InfoStyles.grid}>
                    <Feature
                        icon={<Icon name="info" style={InfoStyles.icon} />}
                        title="Información de los museos"
                        description="Navega por los museos con facilidad gracias a nuestra base de datos que te guía a través de cada exposición."
                    />
                    <Feature
                        icon={<Icon name="calendar" style={InfoStyles.icon} />}
                        title="Información de exposiciones"
                        description="Mantente al tanto de las últimas exposiciones y eventos en los museos con nuestra información actualizada."
                    />
                    <Feature
                        icon={<Icon name="bookmark" style={InfoStyles.icon} />}
                        title="Reservas de exposiciones"
                        description="Guarda tus reservas en un mismo lugar y recibe notificaciones cuando llegue el día."
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const Feature = ({ icon, title, description }) => {
    return (
        <View style={InfoStyles.feature}>
            {icon}
            <View>
                <Text style={InfoStyles.featureTitle}>{title}</Text>
                <Text style={InfoStyles.featureDescription}>{description}</Text>
            </View>
        </View>
    );
}

export default InfoScreen;
