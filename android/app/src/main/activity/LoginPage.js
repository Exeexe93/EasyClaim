import React, { Component } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Styles from '../style/LoginStyle'
import LoginButton from '../component/LoginButton'
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class Login extends Component{

  state = {
      username: '',
      password: '',
  }

  render() {
        return (
        <PaperProvider>
            <View style = {Styles.container}>
                <View style = {Styles.logoBox}>
                    <Text style = {Styles.logo}>
                        EasyClaim
                    </Text>
                </View>
                <View style = {Styles.inputBox}>
                    <View style = {Styles.textBox}>
                        <TextInput
                            mode = {'outlined'}
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
                            mode = {'outlined'}
                            maxLength = {20}
                            placeholderTextColor = {'blue'}
                            placeholder = "Password"
                            secureTextEntry = {true}
                            style = {Styles.textInput}
                            selectionColor = {'skyblue'}
                            underlineColorAndroid = {'skyblue'}
                            onChangeText={(password) => this.setState({password})}
                            value = {this.state.password}/>
                    </View>
                </View>
                <View style = {Styles.loginBox}>
                    <LoginButton/>
                </View>
            </View>
        </PaperProvider>
        );
  }
}