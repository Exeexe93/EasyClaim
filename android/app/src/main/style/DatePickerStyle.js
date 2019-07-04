import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F9FF',
        width: '100%',
        height: '60%'
      },
      date: {
        alignItems: 'center',
        flexDirection: 'row',
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
      }
});

export default Styles;