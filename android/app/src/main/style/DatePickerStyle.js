import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F1F9FF',
        width: '100%',
        height: '100%'
      },
      date: {
        alignItems: 'center',
        flexDirection: 'row',
        height: '10%',
        width: '100%',
        justifyContent: 'space-around'
      },
      button: {
        backgroundColor: 'skyblue',
        borderRadius: 30,
        width: 150
      },
      backButton: {
        alignSelf: 'flex-start',
        marginLeft: 30
      },
      headerContainer: {
        height: 50,
        paddingVertical: 20
      },
      buttonContainer: {
        height: 35,
        marginBottom: 20,
        marginTop: 20,
        borderRadius: 20
      },
      text: {
        fontSize: 12,
      }
});

export default Styles;