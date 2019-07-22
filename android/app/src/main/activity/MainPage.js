import React, { Component } from 'react';
import { BackHandler, TextInput, Text, View, ActivityIndicator } from 'react-native';
import { Header } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import CameraButton from '../component/CameraButton';
import MenuButton from '../component/MenuButton';
import Styles from '../style/MainStyle';
import firebase from 'react-native-firebase';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import UploadFile from './UploadFile';

export default class Main extends Component{

    constructor() {
        super();
        global.currentId = '';
    }

    state = {
        visible: false,
    }

    // When showing the page, get the user email and store it
    componentDidMount() {
          currentId  = firebase.auth().currentUser.uid;
          this.props.navigation.addListener("didFocus", this.backHandler);
          this.props.navigation.addListener("willBlur", () => BackHandler.removeEventListener('hardwareBackPress', this.logoutConfirmation));
    }

    backHandler = () => BackHandler.addEventListener('hardwareBackPress', this.logoutConfirmation);

    logout = StackActions.reset({
         index: 0,
         key: null,
         actions: [
             NavigationActions.navigate({ routeName: 'Login' }),
         ],
     });

    logoutConfirmation = () => {
                 this.setState({ visible: true });
                 return true;
           }

    render() {
        return (
                <View style = {Styles.container}>
                    <Header
                        containerStyle = { Styles.headerContainer }
                        leftComponent={<MenuButton/>}
                    />
                    <View style = { Styles.logoBox }>
                        <Text style = { Styles.logo }>
                            EasyClaim
                        </Text>
                    </View>
                    <View style = { Styles.cameraBox }>
                        <CameraButton/>
                        <UploadFile/>
                    </View>
                    <ConfirmDialog
                        messageStyle = {{ alignSelf: 'center', color: "black"}}
                        dialogStyle = {{ borderRadius: 20, width: '70%', alignSelf: 'center'}}
                        buttonsStyle = {{ alignItems: 'center' }}
                        message = "Confirm logout?"
                        visible = { this.state.visible }
                        onTouchOutside = {() => this.setState({ visible: false })}
                        positiveButton = {{
                            fontSize: 70,
                            title: "Confirm",
                            onPress: () => {
                                this.setState({ visible: false });
                                this.props.navigation.dispatch(this.logout);
                            }
                        }}
                        negativeButton = {{
                            title: "Cancel",
                            onPress: () => this.setState({ visible: false }),
                        }}
                    />
                </View>
        );
    }
}

