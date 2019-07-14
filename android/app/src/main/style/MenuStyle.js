import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
      container: {
            flex: 1,
      },
      itemContainer: {
            flex: 5,
            backgroundColor: '#2699FB',
            paddingTop: 20,
            paddingHorizontal: 20
      },
      profilePic: {
            height: "30%",
            justifyContent: 'space-around',
            backgroundColor: '#2699FB'
      },
      profileName: {
            alignSelf: 'center',
            fontSize: 18,
            color: 'white'
      },
      icon: {
            flexDirection: 'row',
            alignItems: 'center'
      },
      drawerItem: {
            fontSize: 16,
            color: '#FFFFFF',
            padding: 15,
            margin: 5,
            borderRadius: 2,
            textAlign: 'left',
      },
      logoutContainer: {
            flex: 1,
            backgroundColor: '#2699FB',
            paddingTop: 20,
            paddingHorizontal: 20
      },
      logout: {
            fontSize: 16,
            color: '#2699FB',
            padding: 15,
            margin: 5,
            borderRadius: 2,
            borderColor: '#F1F9FF',
            borderWidth: 1,
            textAlign: 'left'
      }
})

export default Styles;