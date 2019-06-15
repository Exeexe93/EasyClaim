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
        paddingTop: 50,
        paddingBottom: 10,
        paddingHorizontal: 30,
        fontSize: 16,
        alignSelf: 'flex-start'
  },
  text: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        fontSize: 16,
        alignSelf: 'flex-start'
  },
  editText: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        fontSize: 16,
        alignSelf: 'flex-end'
  }
});

export default Styles;