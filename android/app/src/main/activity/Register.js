import React, { Component } from 'react';
import { TextInput, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from '../style/RegisterStyle';
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions } from 'react-navigation';

const goToMain = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Drawer' }),
      ],
});

export default class Register extends Component{

    state = {
        name: '',
        position: '',
        company: '',
        email: '',
        password: '',
        errorMessage: '',
        error: false,
    }

    handleSignUp = () => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => {
                const id = firebase.auth().currentUser.uid;
                const { name, position, company }  = this.state;
                this.uploadProfile(id, name, position, company);
                this.props.navigation.dispatch(goToMain);
                })
          .catch(error => this.updateError(error))
    }

    uploadProfile(id, name, position, company) {
        firebase.database()
            .ref('Users/' + id)
            .set(
            {
                name: name,
                position: position,
                company: company,
            }
        );
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
                            placeholder = 'Name'
                            style = { Styles.textInput }
                            selectionColor = {'skyblue'}
                            underlineColorAndroid = {'skyblue'}
                            onChangeText={(name) => this.setState({name})}
                            value = {this.state.name}/>
                        <TextInput
                            placeholder = 'Position'
                            style = { Styles.textInput }
                            selectionColor = {'skyblue'}
                            underlineColorAndroid = {'skyblue'}
                            onChangeText={(position) => this.setState({position})}
                            value = {this.state.position}/>
                        <TextInput
                            placeholder = 'Company'
                            style = { Styles.textInput }
                            selectionColor = {'skyblue'}
                            underlineColorAndroid = {'skyblue'}
                            onChangeText={(company) => this.setState({company})}
                            value = {this.state.company}/>
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