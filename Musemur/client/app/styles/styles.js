import { StyleSheet } from 'react-native';
import colors from './colors';

// Estilos para Header
const header = StyleSheet.create({
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
});

// Estilos para LoginScreen
const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    containerBtns: {
        flex: 0,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    containerScroll: {
        padding: 10,
        alignItems: 'center',
        flexGrow: 1,
    },
    logo: {
        padding: 50,
        alignItems: 'center',
        paddingBottom: 50,
    },
    logoRegister: {
        alignItems: 'center',
        paddingBottom: 50,
    },
    
    btnMain: {
        width: 150,
        marginRight: 10,
        backgroundColor: colors.BLUE,
        borderRadius: 30,
    },
    btnMainRegist: {
        flex: 1,
        marginRight: 10,
        backgroundColor: colors.BLUE,
        borderRadius: 30,
    },
    btnTransparent: {
        backgroundColor: 'rgba(52, 52, 52, 0)',
        borderColor: colors.BLUE,
        width: 150,
        borderWidth: 2,
        borderRadius: 30,
    },
    btntxt: {
        textAlign: 'center',
        fontSize: 17,
        color: colors.WHITE,
        paddingVertical: 15,
        fontWeight: 'bold',
    },
    btnAdmin: {
        textAlign: 'center',
        fontSize: 17,
        width: 280,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: colors.RED,
        borderRadius: 60,
    },
    txtTransparent: {
        padding: 5,
        color: colors.LIGHTPRIMARYCOLOR,
        fontSize: 15,
    },
    txtBold: {
        fontWeight: 'bold',
        color: colors.LIGHTPRIMARYCOLOR,
        fontSize: 14,
    },
    txtTitle: {
        fontWeight: 'bold',
        color: colors.PRIMARYCOLOR,
        fontSize: 24,
        paddingBottom: 20,
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
        color: colors.BLUE,
    },
});

// Estilos para ForgotPasswordScreen
const ForgotPasswordStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    logo: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        marginBottom: 20
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 50,
        left: 20,
    },
    backButtonText: {
        color: colors.PRIMARYCOLOR,
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: colors.PRIMARYCOLOR,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 20,
    },
    button: {
        backgroundColor: colors.PRIMARYCOLOR,
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

// Estilos para PrincipalScreen
const PrincipalStyles = StyleSheet.create({
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
        borderRadius: 10,
        overflow: 'hidden',
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
        textAlign: 'center',
    },
    reservaItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
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

// Estilos para CreateReservaScreen
const CreateReservaStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        padding: 20,
        backgroundColor: 'white',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButtonText: {
        color: colors.PRIMARYCOLOR,
        marginLeft: 5,
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: colors.PRIMARYCOLOR,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    dateButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.LIGHTPRIMARYCOLOR,
        borderRadius: 10,
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
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
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

// Estilos para ProfileScreen
const ProfileStyles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
    },
    profileItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    label: {
        fontWeight: "bold",
        fontSize: 18,
        width: 100,
        color: colors.BLACK,
    },
    value: {
        flex: 1,
        fontSize: 16,
        color: "#666",
    },
    editButton: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: colors.PRIMARYCOLOR,
        padding: 15,
        alignItems: "center",
        borderRadius: 20,
        marginTop: 15,
    },
    editButtonText: {
        marginLeft: 15,
        paddingRight: 10,
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    logoutButton: {
        backgroundColor: colors.RED,
        padding: 15,
        alignItems: "center",
        borderRadius: 20,
        marginTop: 15,
    },
    logoutButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

// Estilos para EditProfScreen
const EditProfStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButtonText: {
        color: colors.PRIMARYCOLOR,
        marginLeft: 5,
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: 'center',
        color: colors.PRIMARYCOLOR,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    saveButton: {
        backgroundColor: colors.PRIMARYCOLOR,
        padding: 15,
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
    },
    saveButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

// Estilos para ChatBoxScreen
const ChatBoxStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    chat: {
        height: '50%',
    },
    messageContainer: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        maxWidth: '75%',
    },
    question: {
        alignSelf: 'flex-end',
        backgroundColor: colors.LIGHTPRIMARYCOLOR,
    },
    answer: {
        alignSelf: 'flex-start',
        backgroundColor: colors.PRIMARYCOLOR,
    },
    messageText: {
        color: 'white',
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    faqList: {
        marginBottom: 20,
    },
    faqItem: {
        backgroundColor: colors.LIGHTPRIMARYCOLOR,
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
    },
    faqText: {
        color: 'white',
        fontSize: 16,
    },
});

// Estilos para PrincipalAdminScreen
const PrincipalAdminStyles = StyleSheet.create({
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

const ReservasAdminStyles = StyleSheet.create({
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
        backgroundColor: '#fff',
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
        shadowColor: '#000',
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
    modalText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
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
        backgroundColor: '#f0ad4e',
        flex: 1, // Cambiado a un color de advertencia (naranja)
    },
    deleteButton: {
        backgroundColor: '#d9534f',
        flex: 1, // Cambiado a un color de peligro (rojo)
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

const ProfileAdminStyles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
    },
    profileItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    label: {
        fontWeight: "bold",
        fontSize: 18,
        width: 100,
        color: colors.BLACK,
    },
    value: {
        flex: 1,
        fontSize: 16,
        color: "#666",
    },
    logoutButton: {
        backgroundColor: colors.RED,
        padding: 15,
        alignItems: "center",
        borderRadius: 30,
        marginTop: "auto",
    },
    logoutButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

const ChatBoxAdminStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: colors.LIGHTPRIMARYCOLOR,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
    },
    faqList: {
        marginBottom: 20,
    },
    faqItem: {
        backgroundColor: colors.LIGHTPRIMARYCOLOR,
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        position: 'relative',
    },
    faqQuestion: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    faqAnswer: {
        color: 'white',
        fontSize: 16,
        marginTop: 5,
    },
    deleteButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        padding: 5,
        backgroundColor: 'red',
        borderRadius: 10,
    },
});


export { header, loginStyles, NavigatorStyles, PrincipalStyles, CreateReservaStyles, ReservasStyles, ChatBoxStyles,
    EditProfStyles, ForgotPasswordStyles, MuseumStyles, ProfileStyles, ProfileAdminStyles, PrincipalAdminStyles,
    ReservasAdminStyles, ChatBoxAdminStyles };
