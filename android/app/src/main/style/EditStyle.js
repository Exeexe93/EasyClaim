import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
      textContainer: {
            flex: 1,
            backgroundColor: '#F1F9FF',
            marginVertical: 20,
      },
      error: {
            color: 'red',
            fontSize: 12
      },
      label: {
            fontSize: 18,
      },
      title: {
            fontSize: 20,
            textAlign: 'left',
            paddingLeft: 20,
            marginVertical: 10,
      },
      text: {
            fontWeight: 'bold',
            fontSize: 15,
            textAlign: 'center',
      },
      container: {
            flex: 1,
            backgroundColor: '#F1F9FF',
      },
      header: {
            height: 50,
            paddingVertical: 20
      },
      picture: {
            width: 400,
            height: 350,
      },
      inputContainer: {
            width: '70%',
            alignSelf: 'center'
      },
      avatar: {
            alignSelf: 'center',
            marginVertical: 30
      }
})

export default Styles;