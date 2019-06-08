import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: '#F1F9FF',
      },
      imageContainer: {
            flex: 1,
      },
      textContainer: {
            flex: 2,
            backgroundColor: '#F1F9FF',
            paddingTop: 20,
            paddingHorizontal: 20
      },
      title: {
            fontSize: 16,
            color: 'red',
            padding: 15,
            margin: 5,
            textAlign: 'left'
      },
      text: {
            fontSize: 12,
            textAlign: 'right'
      }
})

export default Styles;