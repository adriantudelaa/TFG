import {Dimensions, StyleSheet } from 'react-native';
import colors from './colors';

const { width } = Dimensions.get('window');

// Estilos para Header
const header = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.PRIMARYCOLOR,
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    logo: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "#fff"
    },
    headerText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
});

// Estilos para LoginScreen
const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    containerScroll: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: colors.SECONDARY,
        borderRadius: 10,
        padding: 20,
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5
    },
    cardHeader: {
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Inter_700Bold',
        color: colors.DARKERGRAY,
        textAlign: 'center',
    },
    cardDescription: {
        fontSize: 16,
        color: colors.MEDIUMGRAY,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
    },
    cardContent: {
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'Inter_400Regular',
        color: colors.DARKGRAY,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.LIGHTGRAY,
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        backgroundColor: colors.SECONDARY,
        color: colors.DARKERGRAY,
    },
    togglePassword: {
        fontSize: 14,
        color: colors.PRIMARYCOLOR,
        marginTop: 5,
        textAlign: 'right',
        fontFamily: 'Inter_400Regular',
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    link: {
        fontSize: 14,
        color: colors.PRIMARYCOLOR,
        textDecorationLine: 'underline',
        fontFamily: 'Inter_400Regular',
    },
    containerBtns: {
        width: '100%',
    },
    btnMain: {
        backgroundColor: colors.PRIMARYCOLOR,
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    btntxt: {
        fontSize: 16,
        color: colors.SECONDARY,
        fontFamily: 'Inter_700Bold',
    },
    cardFooter: {
        marginTop: 20,
    },
    footerText: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerDescription: {
        fontSize: 14,
        color: colors.DARKERGRAY,
        fontFamily: 'Inter_400Regular',
    },
    txtTransparent: {
        marginTop: 20,
        fontSize: 14,
        color: colors.PRIMARYCOLOR,
        fontFamily: 'Inter_400Regular',
    },
});


// Estilos para Navigator
const NavigatorStyles = StyleSheet.create({
    drawerHeader: {
        alignItems: 'center',
        marginVertical: 20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    userName: {
        fontSize: 18,
        color: 'gray',
    },
    logoutLabel: {
        color: 'red',
        fontWeight: 'bold',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.PRIMARYCOLOR,
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 15,
    },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    scrollView: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    item: {
        backgroundColor: "#f8f8f8",
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    previewImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        fontSize: 16,
        flexShrink: 1,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 12,
        color: colors.PRIMARYCOLOR,
    },
});

const AdminChatBoxStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    containerScroll: {
        flexGrow: 1,
        padding: 15
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    cardHeader: {
        margin: 20,
        marginBottom: 0,
    },
    card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: colors.SECONDARY,
        borderRadius: 10,
        padding: 15,
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Inter_700Bold',
        color: colors.DARKERGRAY,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'Inter_400Regular',
        color: colors.DARKGRAY,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.LIGHTGRAY,
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        backgroundColor: colors.SECONDARY,
        color: colors.DARKERGRAY,
        marginBottom: 10,
    },
    inputLarge: {
        fontSize: 18,
        textAlignVertical: 'top',
    },
    btnMain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.PRIMARYCOLOR,
        paddingVertical: 15,
        borderRadius: 30,
        marginBottom: 16,
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonIcon: {
        marginRight: 10,
    },
    btntxt: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.SECONDARY,
        fontFamily: 'Inter_700Bold',
    },
    faqItem: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: colors.SHADOWCOLOR,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        width: '100%',
    },
    faqQuestion: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Inter_700Bold',
        color: colors.DARKERGRAY,
    },
    faqAnswer: {
        color: colors.MEDIUMGRAY,
        fontFamily: 'Inter_400Regular',
    },
    deleteButton: {
        marginTop: 8,
        backgroundColor: colors.RED,
        borderRadius: 30,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

// Estilos para ForgotPasswordScreen
const ForgotPasswordStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
      },
      containerScroll: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
      },
      logo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 100,
        height: 100,
      },
      card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: colors.SECONDARY,
        borderRadius: 10,
        padding: 20,
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5
      },
      cardHeader: {
        marginBottom: 20,
      },
      cardTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Inter_700Bold',
        color: colors.DARKERGRAY,
        textAlign: 'center',
      },
      cardDescription: {
        fontSize: 16,
        color: colors.MEDIUMGRAY,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
      },
      cardContent: {
        marginBottom: 20,
      },
      inputGroup: {
        marginBottom: 15,
        width: '100%',
      },
      label: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'Inter_400Regular',
        color: colors.DARKGRAY,
      },
      input: {
        borderWidth: 1,
        borderColor: colors.LIGHTGRAY,
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        backgroundColor: colors.SECONDARY,
        color: colors.DARKERGRAY,
        width: '100%',
      },
      inputError: {
        borderColor: colors.RED,
      },
      errorText: {
        color: colors.RED,
        marginBottom: 16,
        textAlign: 'center',
      },
      button: {
        marginBottom: 15,
        backgroundColor: colors.PRIMARYCOLOR,
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        width: '100%',
      },
      btntxt: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.SECONDARY,
        fontFamily: 'Inter_700Bold',
      },
      backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: 20,
      },
      backButtonText: {
        marginLeft: 8,
        color: '#1f2937',
        fontSize: 16,
      },
      footerText: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
      },
      footerDescription: {
        fontSize: 14,
        color: colors.DARKERGRAY,
        fontFamily: 'Inter_400Regular',
      },
    });

// Estilos para MuseumScreen
const MuseumStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    contentContainer: {
        paddingBottom: 20,
    },
    museumImage: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
    museumTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    divider: {
        borderBottomColor: colors.PRIMARYCOLOR,
        borderBottomWidth: 2,
        marginVertical: 10,
    },
    museumDescription: {
        fontSize: 16,
        marginBottom: 20,
    },
    mapImage: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
    openingHours: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    entryFees: {
        marginBottom: 20,
    },
    chatButton: {
        backgroundColor: colors.ADMINPRIMARYCOLOR,
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    chatButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: colors.PRIMARYCOLOR,
    },
});

// Estilos para ReservasScreen
const ReservasStyles = StyleSheet.create({
    container: {
        padding: 16,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        padding: 16,
        color: colors.DARKERGRAY,
        textAlign: 'center',
        fontFamily: 'Inter_700Bold',
    },
    addButton: {
        backgroundColor: colors.PRIMARYCOLOR,
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        width: '100%',
    },
    buttonText: {
        color: colors.SECONDARY,
        fontSize: 16,
        fontFamily: 'Inter_700Bold',
    },
    card: {
        backgroundColor: colors.SECONDARY,
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 1,
        height: 100, // Ajustar la altura de la tarjeta
        padding: 8,
        justifyContent: 'center',
        width: '100%',
        maxWidth: 400,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 48, // Ajustar el tamaño de la imagen
        height: 48,
        borderRadius: 24,
        marginRight: 8, // Ajustar el margen
    },
    cardTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    museumName: {
        fontSize: 14,
        fontFamily: 'Inter_700Bold',
    },
    date: {
        fontSize: 12,
        color: '#6b7280',
        fontFamily: 'Inter_400Regular',
    },
    details: {
        fontSize: 12,
        color: '#6b7280',
        fontFamily: 'Inter_400Regular',
    },
    guestsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    guests: {
        fontSize: 14,
        marginLeft: 4,
        fontFamily: 'Inter_700Bold',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
        fontFamily: 'Inter_400Regular',
    },
    cancelada: {
        backgroundColor: '#f8d7da',
    },
    textCancelado: {
        textDecorationLine: 'line-through',
        color: colors.RED,
    },
    cancelledSection: {
        marginTop: 24,
        width: '100%',
    },
    cancelledTitle: {
        fontSize: 20,
        padding: 8,
        color: colors.RED,
        fontFamily: 'Inter_700Bold',
        backgroundColor: '#f8d7da',
        borderRadius: 8,
        marginBottom: 8,
        textAlign: 'center',
    },
    noReservations: {
        fontSize: 16,
        color: '#6b7280',
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
        marginTop: 20,
    },
});

// Estilos para ProfileScreen
const ProfileStyles = StyleSheet.create({
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    container: {
        flex: 1,
        backgroundColor: colors.WHITESECONDARY,
    },
    profileContainer: {
        padding: 16,
        backgroundColor: colors.SECONDARY,
        borderRadius: 16,
        margin: 16,
        flexGrow: 1,
    },
    profileHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    profileItem: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    profileHeaderLabel: {
        flex: 1,
        paddingLeft: 16,
        fontSize: 20,
        color: colors.BLACK,
        fontFamily: 'Inter_700Bold',
    },
    label: {
        fontSize: 16,
        color: colors.BLACK,
        marginBottom: 4,
        fontFamily: 'Inter_700Bold',
    },
    value: {
        fontSize: 16,
        color: colors.GRAY,
        fontFamily: 'Inter_400Regular',
    },
    buttonContainer: {
        padding: 16,
        backgroundColor: colors.SECONDARY,
        borderRadius: 16,
        margin: 16,
        marginTop: 0,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.PRIMARYCOLOR,
        paddingVertical: 15,
        borderRadius: 30,
        marginBottom: 16,
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.RED,
        paddingVertical: 15,
        borderRadius: 30,
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonIcon: {
        marginRight: 8,
    },
    buttonText: {
        color: colors.SECONDARY,
        fontSize: 16,
        fontFamily: 'Inter_700Bold',
    },
});


const ReservasAdminStyles = StyleSheet.create({
    container: {
        padding: 16,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        padding: 16,
        color: colors.DARKERGRAY,
        textAlign: 'center',
        fontFamily: 'Inter_700Bold',
    },
    museumSection: {
        width: '100%',
        marginBottom: 16,
    },
    museumTitle: {
        fontSize: 20,
        padding: 8,
        color: colors.WHITE,
        fontFamily: 'Inter_700Bold',
        backgroundColor: colors.LIGHTPRIMARYCOLOR,
        borderRadius: 8,
        marginBottom: 8,
        textAlign: 'center',
    },
    card: {
        backgroundColor: colors.SECONDARY,
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 1,
        height: 100,
        padding: 8,
        justifyContent: 'center',
        width: '100%',
        maxWidth: 400,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 8,
    },
    cardTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    museumName: {
        fontSize: 14,
        fontFamily: 'Inter_700Bold',
    },
    date: {
        fontSize: 12,
        color: '#6b7280',
        fontFamily: 'Inter_400Regular',
    },
    details: {
        fontSize: 12,
        color: '#6b7280',
        fontFamily: 'Inter_400Regular',
    },
    guestsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    guests: {
        fontSize: 14,
        marginLeft: 4,
        fontFamily: 'Inter_700Bold',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
    },
    configButton: {
        backgroundColor: colors.PRIMARYCOLOR,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginBottom: 16,
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    configButtonText: {
        color: colors.SECONDARY,
        fontSize: 16,
        fontFamily: 'Inter_700Bold',
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
    calendar: {
        marginBottom: 20,
        borderRadius: 20,
        overflow: 'hidden',
    },
    reservasContainer: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    reservaItem: {
        backgroundColor: colors.SECONDARY,
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reservaInfo: {
        flex: 1,
    },
    reservaCancelada: {
        backgroundColor: '#f8d7da',
    },
    reservaText: {
        fontSize: 16,
        color: "#333",
    },
    textCancelado: {
        color: "#721c24",
    },
    canceladoLabel: {
        color: "#721c24",
        fontWeight: 'bold',
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
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '100%',
    },
    button: {
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginHorizontal: 5,
        flexGrow: 1,
    },
    cancelButton: {
        backgroundColor: colors.WARNING,
    },
    deleteButton: {
        backgroundColor: colors.RED, 
    },
    closeButton: {
        backgroundColor: colors.PRIMARYCOLOR,
        width: '100%',
    },
    buttonText: {
        color: colors.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

const CreateMuseumStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    containerScroll: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: colors.SECONDARY,
        borderRadius: 10,
        padding: 20,
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    cardHeader: {
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Inter_700Bold',
        color: colors.DARKERGRAY,
        textAlign: 'center',
    },
    cardContent: {
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'Inter_400Regular',
        color: colors.DARKGRAY,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.LIGHTGRAY,
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        backgroundColor: colors.SECONDARY,
        color: colors.DARKERGRAY,
    },
    inputError: {
        borderColor: colors.RED,
        borderWidth: 1,
    },
    errorText: {
        color: colors.RED,
        marginBottom: 16,
        textAlign: 'center',
    },
    btnMain: {
        backgroundColor: colors.PRIMARYCOLOR,
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    btntxt: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.SECONDARY,
        fontFamily: 'Inter_700Bold',
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    activityIndicatorWrapper: {
        backgroundColor: colors.WHITE,
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alertContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertBox: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    alertTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    alertMessage: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    alertButton: {
        backgroundColor: colors.PRIMARYCOLOR,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    alertButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

const AdminMuseumStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    containerScroll: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Inter_700Bold',
        color: colors.DARKERGRAY,
        textAlign: 'center',
    },
    cardDescription: {
        fontSize: 16,
        marginBottom: 16,
        color: colors.MEDIUMGRAY,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
    },
    btnMain: {
        backgroundColor: colors.PRIMARYCOLOR,
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        marginVertical: 16,
        width: '80%',
    },
    btnEliminar: {
        backgroundColor: colors.RED,
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        marginVertical: 16,
        width: '80%',
    },
    btntxt: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.WHITE,
        fontFamily: 'Inter_700Bold',
    },
    divider: {
        height: 1,
        backgroundColor: colors.LIGHTGRAY,
        marginVertical: 16,
        width: '80%',
    },
    grid: {
        marginTop: 16,
        flexDirection: 'column',
    },
    gridItem: {
        marginBottom: 16,
    },
    infoContainer: {
        marginTop: 8,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    exhibitionContainer: {
        marginTop: 16,
        width: '100%',
        alignItems: 'center'
    },
    exhibitionItem: {
        marginVertical: 16,
        width: '100%',
        maxWidth: 400,
        backgroundColor: colors.SECONDARY,
        borderRadius: 10,
        padding: 20,
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        alignItems: 'center'
    },
    exhibitionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    exhibitionDescription: {
        color: 'gray',
    },
    image: {
        width: width * 0.9,
        height: width * 0.6,
        borderRadius: 8,
        marginBottom: 16,
        resizeMode: 'cover',
    },
    smallImage: {
        width: width * 0.9,
        height: width * 0.45,
        borderRadius: 8,
        marginBottom: 16,
        resizeMode: 'cover',
    },
    input: {
        width: '100%',
        backgroundColor: colors.SECONDARY,
        borderRadius: 30,
        padding: 10,
        marginVertical: 10,
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        color: colors.DARKERGRAY,
    }
});


const AdminPrincipalStyles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: colors.WHITESECONDARY,
        alignItems: 'center',
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        marginBottom: 8,
        fontFamily: 'Inter_700Bold',
        color: colors.DARKERGRAY,
        textAlign: 'center',
    },
    description: {
        color: '#6b7280',
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
    },
    grid: {
        width: '100%',
        justifyContent: 'center',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 16,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 8,
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        marginBottom: 4,
        fontFamily: 'Inter_700Bold',
        color: colors.DARKERGRAY,
    },
    cardDescription: {
        color: '#6b7280',
        fontFamily: 'Inter_400Regular',
    },
    noMuseumsText: {
        fontSize: 18,
        fontFamily: 'Inter_400Regular',
        color: colors.MEDIUMGRAY,
        textAlign: 'center',
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: colors.SECONDARY,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.PRIMARYCOLOR,
    },
    modalButton: {
        backgroundColor: colors.PRIMARYCOLOR,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
    },
    modalButtonText: {
        color: colors.SECONDARY,
        fontSize: 16,
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    activityIndicatorWrapper: {
        backgroundColor: colors.WHITE,
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    createButton: {
        backgroundColor: colors.PRIMARYCOLOR,
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    createButtonText: {
        fontSize: 16,
        color: colors.SECONDARY,
        fontFamily: 'Inter_700Bold',
    },
});

const ModalLoginAdminStyles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalInput: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: colors.LIGHTGRAY,
        borderRadius: 5,
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: colors.PRIMARYCOLOR,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
    activityIndicatorWrapper: {
        backgroundColor: colors.WHITE,
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const ChatBoxStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITESECONDARY
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginVertical: 8,
        paddingHorizontal: 16,
        fontFamily: 'Inter_700Bold',
        color: colors.BLACK,
        textAlign: 'center',
    },
    faqList: {
        flexGrow: 0,
    },
    faqItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.GRAY,
    },
    faqText: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        color: colors.LIGHTBLACK,
    },
    chat: {
        flex: 1,
    },
    messageWrapper: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
    },
    questionWrapper: {
        justifyContent: 'flex-end',
    },
    answerWrapper: {
        justifyContent: 'flex-start',
    },
    messageAvatar: {
        marginRight: 8,
    },
    messageContainer: {
        padding: 8,
        borderRadius: 8,
        maxWidth: '80%',
    },
    question: {
        alignSelf: 'flex-end',
        backgroundColor: colors.WHITE,
    },
    answer: {
        alignSelf: 'flex-start',
        backgroundColor: colors.LIGHTGREEN,
    },
    messageText: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: colors.BLACK,
    },
    footer: {
        backgroundColor: colors.WHITE,
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: colors.BLACK,
        textAlign: 'center',
    },
});

const CreateReservaStyles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    containerScroll: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButtonText: {
        marginLeft: 8,
        color: colors.PRIMARYCOLOR,
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
    },
    card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: colors.SECONDARY,
        borderRadius: 10,
        padding: 20,
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5
    },
    cardHeader: {
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Inter_700Bold',
        color: colors.DARKERGRAY,
        textAlign: 'center',
    },
    cardDescription: {
        fontSize: 16,
        color: colors.MEDIUMGRAY,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
    },
    cardContent: {
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'Inter_400Regular',
        color: colors.DARKGRAY,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.LIGHTGRAY,
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        backgroundColor: colors.SECONDARY,
        color: colors.DARKERGRAY,
    },
    inputError: {
        borderColor: 'red',
    },
    dateButton: {
        borderWidth: 1,
        borderColor: colors.LIGHTGRAY,
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: colors.SECONDARY,
        justifyContent: 'center',
    },
    dateButtonText: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        color: colors.DARKERGRAY,
    },
    btnMain: {
        backgroundColor: colors.PRIMARYCOLOR,
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    btntxt: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.SECONDARY,
        fontFamily: 'Inter_700Bold',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        marginTop: 5,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    horaButton: {
        backgroundColor: colors.SECONDARY,
        borderColor: colors.PRIMARYCOLOR,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    horaButtonSelected: {
        backgroundColor: colors.PRIMARYCOLOR,
    },
    horaButtonText: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        color: colors.PRIMARYCOLOR,
    },
});

const InfoStyles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: colors.WHITESECONDARY,
      alignItems: 'center',
    },
    section: {
      marginBottom: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.DARKERGRAY,
      textAlign: 'center',
      marginBottom: 16,
      fontFamily: 'Inter_700Bold',
    },
    paragraph: {
      fontSize: 16,
      color: colors.MEDIUMGRAY,
      textAlign: 'center',
      fontFamily: 'Inter_400Regular',
    },
    grid: {
      width: '100%',
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    feature: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      width: '100%',
      flexShrink: 1,
      marginBottom: 16,
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 8,
      shadowColor: colors.SHADOWCOLOR,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    icon: {
      fontSize: 24,
      marginRight: 8,
      color: colors.PRIMARYCOLOR, // Assuming primary color is blue
    },
    featureTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'Inter_700Bold',
      color: colors.DARKERGRAY,
    },
    featureDescription: {
      fontSize: 14,
      color: colors.MEDIUMGRAY,
      fontFamily: 'Inter_400Regular',
      width: '35%',
    },
  });  

  const MuseumScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    containerScroll: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Inter_700Bold',
        color: colors.DARKERGRAY,
        textAlign: 'center',
    },
    cardDescription: {
        fontSize: 16,
        marginBottom: 16,
        color: colors.MEDIUMGRAY,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
    },
    btnMain: {
        backgroundColor: colors.PRIMARYCOLOR,
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        marginVertical: 16,
        width: '80%',
    },
    btntxt: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.SECONDARY,
        fontFamily: 'Inter_700Bold',
    },
    divider: {
        height: 1,
        backgroundColor: colors.LIGHTGRAY,
        marginVertical: 16,
        width: '80%',
    },
    grid: {
        marginTop: 16,
        flexDirection: 'column',
    },
    gridItem: {
        marginBottom: 16,
    },
    infoContainer: {
        marginTop: 8,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    exhibitionContainer: {
        marginTop: 16,
    },
    exhibitionItem: {
        marginTop: 16,
    },
    exhibitionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    exhibitionDescription: {
        color: 'gray',
    },
    image: {
        width: width * 0.9,
        height: width * 0.6,
        borderRadius: 8,
        marginBottom: 16,
        resizeMode: 'cover',
    },
    smallImage: {
        width: width * 0.9,
        height: width * 0.45,
        borderRadius: 8,
        marginBottom: 16,
        resizeMode: 'cover',
    },
});

const PrincipalScreenStyles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: colors.WHITESECONDARY,
        alignItems: 'center',
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        marginBottom: 8,
        fontFamily: 'Inter_700Bold',
        color: colors.DARKERGRAY,
        textAlign: 'center',
    },
    description: {
        color: '#6b7280',
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
    },
    grid: {
        width: '100%',
        justifyContent: 'center',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 16,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 8,
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        marginBottom: 4,
        fontFamily: 'Inter_700Bold',
        color: colors.DARKERGRAY,
    },
    cardDescription: {
        color: '#6b7280',
        fontFamily: 'Inter_400Regular',
    },
    noMuseumsText: {
        fontSize: 18,
        fontFamily: 'Inter_400Regular',
        color: colors.MEDIUMGRAY,
        textAlign: 'center',
        marginTop: 20,
    },
});

const SettingsStyles = StyleSheet.create({
    containerScroll: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 20,
        backgroundColor: '#f5f5f5',
    },
    card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: colors.SECONDARY,
        borderRadius: 10,
        padding: 20,
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 20,
    },
    cardHeader: {
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Inter_700Bold',
        color: colors.DARKERGRAY,
        textAlign: 'center',
    },
    cardDescription: {
        fontSize: 16,
        color: colors.MEDIUMGRAY,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
    },
    cardContent: {
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'Inter_400Regular',
        color: colors.DARKGRAY,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.LIGHTGRAY,
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        backgroundColor: colors.SECONDARY,
        color: colors.DARKERGRAY,
    },
    inputError: {
        borderColor: 'red',
    },
    textarea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    picker: {
        borderWidth: 1,
        borderColor: colors.LIGHTGRAY,
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        backgroundColor: colors.SECONDARY,
        color: colors.DARKERGRAY,
    },
    warningText: {
        color: '#6b7280',
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
    },
    btnMain: {
        backgroundColor: colors.PRIMARYCOLOR,
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: colors.SHADOWCOLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    btntxt: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.SECONDARY,
        fontFamily: 'Inter_700Bold',
    },
    destructiveButton: {
        backgroundColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        marginTop: 5,
    },
    fotoPerfilContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.LIGHTGRAY,
        borderRadius: 75,
        width: 100,
        height: 100,
        overflow: 'hidden',
        marginVertical: 10,
    },
    fotoPerfil: {
        width: '100%',
        height: '100%',
        borderRadius: 75,
    },
});

export {
    header, loginStyles, ForgotPasswordStyles, 
    MuseumScreenStyles, ReservasStyles, 
    ProfileStyles, SettingsStyles, NavigatorStyles,
    PrincipalScreenStyles, ModalLoginAdminStyles,
    AdminPrincipalStyles, ReservasAdminStyles,
    CreateMuseumStyle, CreateReservaStyles,
    ChatBoxStyles, InfoStyles,
    AdminMuseumStyle, AdminChatBoxStyles
};