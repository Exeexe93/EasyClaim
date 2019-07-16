import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Styles from '../style/LoginStyle';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';

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
  }

  handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
            const user = firebase.auth().currentUser;
            if (user.emailVerified) {
                this.props.navigation.dispatch(goToMain)
            } else {
                Alert.alert(
                  'Email has not been verified',
                  'Please verify your email !',
                  [
                    {text: 'OK', onPress: () => {}},
                  ],
                  {cancelable: false},
                );
            }
        }).catch(error => this.updateError(error))
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
            </ImageBackground>
            </View>
        );
  }
}

 //<ForgetButton/>
// <View style = {Styles.textBox}>
// <TextInput
//     maxLength = {25}
//     placeholderTextColor = {'white'}
//     placeholder = "Email"
//     style = {Styles.textInput}
//     selectionColor = {'skyblue'}
//     underlineColorAndroid = {'skyblue'}
//     onChangeText={(email) => this.setState({email})}
//     value = {this.state.email}/>
// </View>
//                    <View style = {Styles.textBox}>
//<TextInput
//    maxLength = {20}
//    placeholderTextColor = {'white'}
//    placeholder = "Password"
//    secureTextEntry = { true }
//    style = {Styles.textInput}
//    selectionColor = {'skyblue'}
//    underlineColorAndroid = {'skyblue'}
//    onChangeText={(password) => this.setState({password})}
//    value = {this.state.password}/>
//                 </View>