import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#F1F9FF',
        paddingVertical: 10
  },
  logo: {
        fontSize: 40,
        textAlign: 'center',
        margin: 20,
        fontFamily: 'ScriptMTBold',
        color: '#2699FB',
    },
  textInput: {
        height: 40,
        width: 250,
        textAlign: 'center',
        paddingHorizontal: 10,
        borderColor: 'skyblue',
        borderWidth: 2,
        borderRadius: 30,
        marginBottom: 20,
        paddingHorizontal: 20
  },
  contentContainer: {
        alignItems: 'center'
  },
  textContainer: {
        paddingTop: 60,
        paddingBottom: 20,
  },
  button: {
        marginBottom: 40
  },
  signUpButton: {
      width: 150,
      height: 40,
      marginHorizontal: 50,
  },
  retrieveButton: {
      alignSelf: 'center',
      width: 150,
      height: 40
  },
});

export default Styles;