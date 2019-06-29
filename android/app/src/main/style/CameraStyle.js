import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#000',
    },
    flipButton: {
        alignSelf: 'center',
        height: 40,
        marginHorizontal: 40,
        marginBottom: 10,
        marginTop: 10,
        padding: 5,
    },
    sliderContainer: {
        backgroundColor: 'transparent',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        width: "100%",
        height: "90%",
    },
    slider: {
        width: 40,
        height: 200,
        marginHorizontal: 10,
        alignSelf: 'flex-start'
    },
    topContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    bottomContainer: {
        flex: 0.2,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignContent: 'center',
        justifyContent: 'flex-end',
    },
    buttonContainer: {
        alignSelf: 'center',
        marginHorizontal: 40,
        backgroundColor: 'transparent',
    },
});

export default Styles;