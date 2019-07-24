import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
      textContainer: {
            flex: 1,
            backgroundColor: '#F1F9FF',

      },
      error: {
            color: 'red',
            fontSize: 12
      },
      label: {
            fontSize: 16,
      },
      title: {
            fontSize: 16,
            textAlign: 'left',
            paddingLeft: 40,
            marginVertical: 20,
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
            width: '90%',
            height: 350,
            alignSelf: 'center'
      },
      inputContainer: {
            width: '70%',
            alignSelf: 'center',
            marginTop: 10,
      },
      avatar: {
            alignSelf: 'center',
            marginVertical: 30
      },
      highlight: {
        marginTop: 20,
      }
})

export default Styles;