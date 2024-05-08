import { StyleSheet } from 'react-native'
import color from './colors'

//Estilos para SplashScreen
const splashStyles = StyleSheet.create({
    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.WHITE,
    }
})

//Estilos para LoginScreen
const loginStyles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },

    containerBtns: {
        flex: 0,
        paddingBottom: 20,
        flexDirection: 'row', // Add this line
        alignItems: 'flex-start',
    },

    containerScroll: {
        padding: 10,
        alignItems: 'center',
        flexGrow: 1
    },

    logo: {
        paddingTop: 50,
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
        backgroundColor: color.BLUE,
        borderRadius: 30,
    },
    
    btnMainRegist: {
        flex: 1,
        marginRight: 10,
        backgroundColor: color.BLUE,
        borderRadius: 30,
    },

    btnTransparent: {
        backgroundColor: 'rgba(52, 52, 52, 0)',
        borderColor: color.BLUE,
        width: 150,
        borderWidth: 2,
        borderRadius: 30
    },

    btntxt: {
        textAlign: 'center',
        fontSize: 17,
        color: color.WHITE,
        paddingVertical: 15,
        fontWeight: 'bold'
    },

    btnAdmin: {
        textAlign: 'center',
        fontSize: 17,
        width: 280,
        marginTop:20,
        marginBottom: 20,
        backgroundColor: color.RED,
        borderRadius: 60
    },

    txtTransparent: {
        padding: 5,
        color: color.LIGHTPRIMARYCOLOR,
        fontSize: 15
    },

    txtBold: {
        fontWeight: 'bold',
        color: color.LIGHTPRIMARYCOLOR,
        fontSize: 14
        
    },
    txtTitle: {
        fontWeight: 'bold',
        color: color.PRIMARYCOLOR,
        fontSize: 24,
        paddingBottom: 20
    }
})

export { loginStyles, splashStyles }