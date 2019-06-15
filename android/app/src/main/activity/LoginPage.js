import React, { Component } from 'react';
import { TextInput, Text, View } from 'react-native';
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
                <View style = {Styles.logoBox}>
                    <Text style = {Styles.logo}>
                        EasyClaim
                    </Text>
                </View>
                <View style = {Styles.inputBox}>
                    <View style = {{flex:2}}/>
                    <View style = {Styles.textBox}>
                        <TextInput
                            maxLength = {20}
                            placeholderTextColor = {'blue'}
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
                            placeholderTextColor = {'blue'}
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
            </View>
        );
  }
}