import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F9FF',
  },
  logoBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
  },
   logo: {
        fontSize: 40,
        textAlign: 'center',
        margin: 20,
        fontFamily: 'ScriptMTBold',
        color: '#2699FB',
   },
  cameraBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

  },
  headerContainer: {
        height: 50,
        paddingVertical: 20
  },
  text: {
        textAlign: 'center',
        fontSize: 15,
  },
});

export default Styles;