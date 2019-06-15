import React, { Component } from 'react';
import { ImageBackground, TextInput, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from '../style/LoginStyle';
import LoginButton from '../component/LoginButton';
import ForgetButton from '../component/ForgetButton';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class Login extends Component{

  state = {
      username: '',
      password: '',
  }

  render() {
        return (
            <View style = {Styles.container}>
            <ImageBackground source = {{ uri: "http://sf.co.ua/15/05/wallpaper-1167a.jpg" }} style = {{ width: '100%', height: '100%' }}>
                <View style = {Styles.logoBox}>
                    <Text style = {Styles.logo}>
                        EasyClaim
                    </Text>
                </View>
                <View style = {Styles.inputBox}>
                    <View style = {Styles.textBox}>
                        <TextInput
                            maxLength = {20}
                            placeholderTextColor = {'white'}
                            placeholder = "Username"
                            style = {Styles.textInput}
                            selectionColor = {'skyblue'}
                            underlineColorAndroid = {'skyblue'}
                            onChangeText={(username) => this.setState({username})}
                            value = {this.state.username}/>
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
                    <LoginButton/>
                    <ForgetButton/>
                    <Text style = { Styles.registerText }
                        onPress = {() => this.props.navigation.navigate('Register')}>
                        Do not have an account? Register now !
                    </Text>
                </View>
            </ImageBackground>
            </View>
        );
  }
}