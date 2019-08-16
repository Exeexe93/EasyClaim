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
        error: false,
        errorMessage: '',
    }

    resetPassword = () => {
        if (this.state.email == '') {
            this.setState({ errorMessage: 'Please input your email !'});
            this.setState({ error: true });
        } else {
        firebase.auth().fetchSignInMethodsForEmail(this.state.email)
            .then((data) => {
                if(data.length != 0) {
                    // When account has been registered
                    firebase
                        .auth().sendPasswordResetEmail(this.state.email)
                        .then(() => {this.setState({ visible: true });})
                        .catch((error) => {
                                this.setState({ errorMessage: error.message});
                                this.setState({ error: true });
                            })
                } else {
                    // When account not registered
                      this.setState({ errorMessage: 'Email has not been registered !'});
                      this.setState({ error: true });
                }}
            )
            .catch((data) => {
                    this.setState({errorMessage: 'Please key in a valid email !'});
                    this.setState({ error: true });
                }
            );
        }
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
                <Text style = { Styles.description }>
                    Please input your email address!
                </Text>
                <View style = { Styles.textContainer}>
                        <TextInput
                            placeholder = 'Email'
                            style = { Styles.textInput }
                            selectionColor = {'skyblue'}
                            onChangeText={(email) => this.setState({email})}
                            value = {this.state.email}/>
                </View>
                <View style = { Styles.button }>
                   <Button
                       onPress = { this.resetPassword }
                       title = "Retrieve password!"
                       containerStyle = { Styles.retrieveButton }
                       buttonStyle = {{borderRadius: 80}}/>
                   <ConfirmDialog
                       messageStyle = {{ alignSelf: 'center', color: "black"}}
                       dialogStyle = {{ borderRadius: 20 }}
                       buttonsStyle = {{ alignItems: 'center' }}
                       message = "Please check your email!"
                       visible = { this.state.visible }
                       onTouchOutside = {() => {
                                            this.setState({visible: false});
                                            this.props.navigation.dispatch(Logout);
                                        }}
                       positiveButton = {{
                           fontSize: 70,
                           title: "Confirm",
                           onPress: () => {
                               this.setState({ visible: false });
                               this.props.navigation.dispatch(Logout);
                           }
                       }}
                   />
                   <ConfirmDialog
                       messageStyle = {{ alignSelf: 'center', color: "black"}}
                       dialogStyle = {{ borderRadius: 20 }}
                       buttonsStyle = {{ alignItems: 'center' }}
                       message = { this.state.errorMessage }
                       visible = { this.state.error }
                       onTouchOutside = {() => this.setState({ error: false }) }
                       positiveButton = {{
                           fontSize: 70,
                           title: "Confirm",
                           onPress: () => {
                               this.setState({ error: false });
                           }
                       }}
                   />
                </View>
            </ScrollView>

        );
    }
}