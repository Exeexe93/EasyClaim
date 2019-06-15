import React, { Component } from 'react';
import { TextInput, Text, View, ScrollView } from 'react-native';
import RetrieveDialog from '../dialog/RetrieveDialog';
import Styles from '../style/RegisterStyle';

export default class ForgotPassword extends Component{

    state = {
        username: '',
        email: ''
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
                </View>
                <View style ={ Styles.button }>
                    <RetrieveDialog/>
                </View>
            </ScrollView>

        );
  }
}