import React, { Component } from 'react';
import { Alert, BackHandler, TextInput, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import CameraButton from '../component/CameraButton';
import MenuButton from '../component/MenuButton';
import Styles from '../style/MainStyle';
import firebase from 'react-native-firebase';

export default class Main extends Component{
  state = { currentUser: null }

  // When showing the page, get the user email and store it
  componentDidMount() {
      const { currentUser } = firebase.auth();
      this.setState({ currentUser });
      this.props.navigation.addListener("didFocus", this.backHandler);
      this.props.navigation.addListener("willBlur", () => BackHandler.removeEventListener('hardwareBackPress', this.logoutConfirmation));
  }

  backHandler = () => BackHandler.addEventListener('hardwareBackPress', this.logoutConfirmation);

  logoutConfirmation = () => {
                 const Logout = StackActions.reset({
                     index: 0,
                     key: null,
                     actions: [
                         NavigationActions.navigate({ routeName: 'Login' }),
                     ],
                 });
                 Alert.alert(
                   '               Confirm logout?',
                   '',
                   [
                     {
                       text: 'Cancel',
                       onPress: () => {},
                       style: 'cancel',
                     },
                     {text: 'OK', onPress: () => this.props.navigation.dispatch(Logout)},
                   ],
                   {cancelable: false},
                 );
                 return true;
           }

  render() {
        return (
                <View style = {Styles.container}>
                    <Header
                        containerStyle = { Styles.headerContainer }
                        leftComponent={<MenuButton/>}
                    />
                    <View style = {Styles.logoBox}>
                        <Text style = {Styles.logo}>
                            EasyClaim
                        </Text>
                    </View>
                    <View style = {Styles.cameraBox}>
                        <CameraButton/>
                    </View>
                </View>
        );
  }
}

