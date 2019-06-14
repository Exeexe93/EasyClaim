import React, { Component } from 'react';
import { TextInput, Text, View, ScrollView } from 'react-native';
import SignUpButton from '../component/SignUpButton';
import Styles from '../style/RegisterStyle';

export default class Register extends Component{

    state = {
        username: '',
        email: '',
        confirmation: ''
    }

  render() {
        return (
            <ScrollView  style = { Styles.container}
                contentContainerStyle = { Styles.contentContainer }
                keyboardDismissMode = 'on-drag'>
                <Text style = { Styles.logo }>
                    EasyClaim
                </Text>
                <View style = { Styles.textContainer}>
                        <TextInput
                            placeholder = 'Username'
                            style = { Styles.textInput }
                            selectionColor = {'skyblue'}
                            underlineColorAndroid = {'skyblue'}
                            onChangeText={(username) => this.setState({username})}
                            value = {this.state.username}/>
                        <TextInput
                            placeholder = 'Email'
                            style = { Styles.textInput }
                            selectionColor = {'skyblue'}
                            underlineColorAndroid = {'skyblue'}
                            onChangeText={(email) => this.setState({email})}
                            value = {this.state.email}/>
                        <TextInput
                            placeholder = 'Confirm Email'
                            style = { Styles.textInput }
                            selectionColor = {'skyblue'}
                            underlineColorAndroid = {'skyblue'}
                            onChangeText={(confirmation) => this.setState({confirmation})}
                            value = {this.state.confirmation}/>
                </View>
                <View style ={ Styles.button }>
                    <SignUpButton/>
                </View>
            </ScrollView>

        );
  }
}