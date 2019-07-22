import React, { Component } from 'react';
import { ImageBackground, TextInput, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Styles from '../style/LoginStyle';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import { ConfirmDialog } from 'react-native-simple-dialogs';

const goToMain = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Drawer' }),
  ],
});

export default class Login extends Component{

  state = {
      email: '',
      password: '',
      errorMessage: null,
      error: false,
      notVerified: false,
  }

  handleLogin = () => {
    if (this.state.email == '') {
        this.setState({ errorMessage: 'Please input your email'});
        this.setState({ error: true });
    } else if (this.state.password == '') {
        this.setState({ errorMessage: 'Please input your password'});
        this.setState({ error: true });
    } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => {
                const user = firebase.auth().currentUser;
                if (user.emailVerified) {
                    this.props.navigation.dispatch(goToMain)
                } else {
                    this.setState({ notVerified: true });
                }
            }).catch(error => this.updateError(error))
    }
  }

  updateError(error) {
        this.setState({ errorMessage: error.message });
        this.setState({ error: true });
  }

  render() {
        return (
            <View style = {Styles.container}>
            <ImageBackground source =
                            {{
                                uri: "http://sf.co.ua/15/05/wallpaper-1167a.jpg"
                            }}
                            style = {{ width: '100%', height: '100%' }}>
                <View style = {Styles.logoBox}>
                    <Text style = {Styles.logo}>
                        EasyClaim
                    </Text>
                    {
                        this.state.error &&
                        <Text style = {{ color: 'red', textAlign: 'center' }}>
                            { this.state.errorMessage }
                        </Text>
                    }
                </View>
                <View style = {Styles.inputBox}>
                    <Input
                        label = 'Email'
                        labelStyle = {{ fontSize: 12 }}
                        containerStyle ={{ marginVertical: 10 }}
                        inputContainerStyle = {{ height: 30 }}
                        inputStyle = { Styles.textInput }
                        onChangeText={(email) => this.setState({email})}
                        value = {this.state.email}
                    />
                    <Input
                        label = 'Password'
                        labelStyle = {{ fontSize: 12 }}
                        containerStyle ={{ marginVertical: 10 }}
                        inputContainerStyle = {{ height: 30 }}
                        inputStyle = { Styles.textInput }
                        secureTextEntry = { true }
                        onChangeText={(password) => this.setState({password})}
                        value = {this.state.password}
                    />
                </View>
                <View style = {Styles.loginBox}>
                    <Button
                        containerStyle = {Styles.loginButton}
                        color = '#2699FB'
                        onPress = { this.handleLogin }
                        title = "Login"/>
                    <Text
                        style ={ Styles.forgotText }
                        onPress = { () => this.props.navigation.navigate('ForgetPassword') }>
                        Forgot Password ?
                    </Text>
                    <View style = { Styles.registerBox }>
                        <Text style = { Styles.text }>
                            Do not have an account?
                        </Text>
                        <Text style = { Styles.registerText }
                            onPress = { () => this.props.navigation.navigate('Register') }>
                            Join now
                        </Text>
                    </View>
                </View>
                <ConfirmDialog
                   messageStyle = {{ alignSelf: 'center', color: "black"}}
                   dialogStyle = {{ borderRadius: 20 }}
                   buttonsStyle = {{ alignItems: 'center' }}
                   message = 'Please verify your email !'
                   visible = { this.state.notVerified }
                   onTouchOutside = {() => this.setState({ notVerified: false }) }
                   positiveButton = {{
                       fontSize: 70,
                       title: "Confirm",
                       onPress: () => {
                           this.setState({ notVerified: false });
                       }
                   }}
               />
            </ImageBackground>
            </View>
        );
  }
}