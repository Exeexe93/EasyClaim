import React, { Component } from 'react';
import { Alert, TextInput, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from '../style/RegisterStyle';
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions, withNavigation } from 'react-navigation';
import { ConfirmDialog } from 'react-native-simple-dialogs';

export default class ForgotPassword extends Component{

    state = {
        email: '',
        visible: false,
    }

    resetPassword = () => {
        firebase.auth().fetchSignInMethodsForEmail(this.state.email)
            .then((data) => {
                if(data.length != 0) {
                    // When account has been registered
                    firebase
                        .auth().sendPasswordResetEmail(this.state.email)
                        .then(() => {this.setState({ visible: true });})
                        .catch((error) => this.setState({ visible: true }))
                } else {
                    // When account not registered
                    Alert.alert(
                      'Invalid email',
                      'Email has not been registered',
                      [
                        {text: 'OK', onPress: () => {}},
                      ],
                      {cancelable: false},
                    );
                }}
            )
            .catch((data) => {
                              Alert.alert(
                                'Invalid input',
                                'Please key in a valid email',
                                [
                                  {text: 'OK', onPress: () => {}},
                                ],
                                {cancelable: false},
                              );}
            );
    }

    render() {
        const Logout = StackActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: 'Login' }),
          ],
        });

        return (
            <ScrollView  style = { Styles.container }
                contentContainerStyle = { Styles.contentContainer }
                keyboardDismissMode = 'on-drag'>
                <Text style = { Styles.logo }>
                    EasyClaim
                </Text>
                <View style = { Styles.textContainer}>
                        <TextInput
                            placeholder = 'Email'
                            style = { Styles.textInput }
                            selectionColor = {'skyblue'}
                            underlineColorAndroid = {'skyblue'}
                            onChangeText={(email) => this.setState({email})}
                            value = {this.state.email}/>
                </View>
                <View style = { Styles.button }>
                   <Button
                       onPress = { this.resetPassword }
                       title = "Retrieve password!"
                       containerStyle = { Styles.retrieveButton }/>
                   <ConfirmDialog
                       messageStyle = {{ alignSelf: 'center'}}
                       message = "Please check your email!"
                       visible = { this.state.visible }
                       onTouchOutside = {() => this.setState({visible: false}) }
                       positiveButton = {{
                           fontSize: 70,
                           title: "Confirm",
                           onPress: () => {
                               this.setState({ visible: false });
                               this.props.navigation.dispatch(Logout);
                           }
                       }}
                   />
                </View>
            </ScrollView>

        );
    }
}