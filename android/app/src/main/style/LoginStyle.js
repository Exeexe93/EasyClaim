import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  logo: {
        fontSize: 40,
        textAlign: 'center',
        margin: 20,
        fontFamily: 'ScriptMTBold',
        color: '#0FA1FF',
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
        alignSelf: 'center',
  },
  textBox: {
        alignItems: 'center',
        marginVertical: 20,
        flex: 1,
        height: 250,
        width: 200,
        alignItems: 'center',
        alignSelf: 'center',
  },
  textInput: {
        color: 'white',
        width: "90%",
        fontSize: 15,
        height: 40,
        padding: 6
  },
  loginBox: {
        marginTop: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
  },
  text: {
      lineHeight: 50,
      fontSize: 14,
      color: 'black',
      textAlign: 'center',
  },
  registerText: {
        lineHeight: 50,
        fontSize: 14,
        color: '#0000CD',
        textAlign: 'center',
        textAlignVertical: 'top',
        textDecorationLine: 'underline',
  },
  loginButton: {
        width: 250,
        height: 40,
        marginBottom: 20,
  },
  registerBox: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width:'75%'
  },
  forgotText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'blue'
  }
});

export default Styles;