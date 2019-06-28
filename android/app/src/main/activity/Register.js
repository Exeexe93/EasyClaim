import React, { Component } from 'react';
import { TextInput, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from '../style/RegisterStyle';
import firebase from 'react-native-firebase'
import { StackActions, NavigationActions } from 'react-navigation';

const goToMain = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Drawer' }),
      ],
});

export default class Register extends Component{

    state = {
        email: '',
        password: '',
        errorMessage: '',
        error: false,
    }

    handleSignUp = () => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => this.props.navigation.dispatch(goToMain))
          .catch(error => this.updateError(error))
      }

      updateError(error) {
            this.setState({ errorMessage: error.message });
            this.setState({ error: true });
      }

    render() {
        return (
            <ScrollView  style = { Styles.container}
                contentContainerStyle = { Styles.contentContainer }
                keyboardDismissMode = 'on-drag'>
                <Text style = { Styles.logo }>
                    EasyClaim
                </Text>
                {
                    this.state.error &&
                    <Text style = {{ color: 'red', textAlign: 'center' }}>
                        { this.state.errorMessage }
                    </Text>
                }
                <View style = { Styles.textContainer }>
                        <TextInput
                            placeholder = 'Email'
                            style = { Styles.textInput }
                            selectionColor = {'skyblue'}
                            underlineColorAndroid = {'skyblue'}
                            onChangeText={(email) => this.setState({email})}
                            value = {this.state.email}/>
                        <TextInput
                            placeholder = 'Password'
                            style = { Styles.textInput }
                            selectionColor = {'skyblue'}
                            underlineColorAndroid = {'skyblue'}
                            onChangeText={(password) => this.setState({password})}
                            value = {this.state.password}/>
                </View>
                <View style ={ Styles.button }>
                    <Button
                        containerStyle = { Styles.signUpButton }
                        color = '#2699FB'
                        onPress = { this.handleSignUp }
                        title = "Sign Up"/>
                </View>
            </ScrollView>
        );
    }
}