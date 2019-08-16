import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#F1F9FF',
  },
  picture: {
        width: 500,
        height: 200
  },
  name: {
        paddingTop: 20,
        fontWeight: 'bold',
        paddingBottom: 10,
        paddingHorizontal: 30,
        fontSize: 20,
        alignSelf: 'center'
  },
  gender: {
        fontSize: 14,
        alignSelf: 'center'
  },
  text: {
        marginTop: 15,
        fontSize: 15,
        alignSelf: 'center'
  },
  editText: {
        fontSize: 16,
        alignSelf: 'center',
        width: '60%',
  }
});

export default Styles;