import React, { Component } from 'react';
import { ImageBackground, TextInput, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from '../style/LoginStyle';
import ForgetButton from '../component/ForgetButton';
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
      .then(() => this.props.navigation.dispatch(goToMain))
      .catch(error => this.updateError(error))
  }

  updateError(error) {
        this.setState({ errorMessage: error.message });
        this.setState({ error: true });
  }

  render() {
        return (
            <View style = {Styles.container}>
            <ImageBackground source = {{ uri: "http://sf.co.ua/15/05/wallpaper-1167a.jpg" }} style = {{ width: '100%', height: '100%' }}>
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
                    <View style = {Styles.textBox}>
                        <TextInput
                            maxLength = {20}
                            placeholderTextColor = {'white'}
                            placeholder = "Email"
                            style = {Styles.textInput}
                            selectionColor = {'skyblue'}
                            underlineColorAndroid = {'skyblue'}
                            onChangeText={(email) => this.setState({email})}
                            value = {this.state.email}/>
                    </View>
                    <View style = {Styles.textBox}>
                        <TextInput
                            maxLength = {20}
                            placeholderTextColor = {'white'}
                            placeholder = "Password"
                            secureTextEntry = { true }
                            style = {Styles.textInput}
                            selectionColor = {'skyblue'}
                            underlineColorAndroid = {'skyblue'}
                            onChangeText={(password) => this.setState({password})}
                            value = {this.state.password}/>
                    </View>
                </View>
                <View style = {Styles.loginBox}>
                    <Button
                        containerStyle = {Styles.loginButton}
                        color = '#2699FB'
                        onPress = { this.handleLogin }
                        title = "Login"/>
                    <ForgetButton/>
                    <Text style = { Styles.registerText }
                        onPress = { () => this.props.navigation.navigate('Register') }>
                        Do not have an account? Register now !
                    </Text>
                </View>
            </ImageBackground>
            </View>
        );
  }
}