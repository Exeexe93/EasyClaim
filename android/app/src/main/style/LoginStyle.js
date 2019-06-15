import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  logo: {
        fontSize: 40,
        textAlign: 'center',
        margin: 20,
        fontFamily: 'ScriptMTBold',
        color: '#2699FB',
  },
  container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F9FF',
  },
  logoBox: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
  },
  inputBox: {
        flex: 0.5,
        width: 250,
        height: 300,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
  },
  textBox: {
        backgroundColor: 'white',
        marginVertical: 10,
        flex: 1,
        height: 250,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
  },
  textInput: {
        borderColor: '#F1F9FF',
        borderWidth: 2,
        width: "90%",
        height: 40,
        padding: 6
  },
  loginBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
  },
  registerText: {
        lineHeight: 50,
        fontSize: 14,
        color: 'red',
        textAlign: 'center'
  },
});

export default Styles;