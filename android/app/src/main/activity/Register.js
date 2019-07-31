import React, { Component } from 'react';
import { TextInput, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from '../style/RegisterStyle';
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import GenderDropDown from '../drop-down-box/GenderDropDown';
import { ConfirmDialog } from 'react-native-simple-dialogs';

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
        picture: '',
        email: '',
        password: '',
        confirmPass: '',
        gender: '',
        errorMessage: '',
        error: false,
        emailSent: false,
    }

    handleSignUp = () => {
        if (this.state.name.trim() == '') {
            this.setState({ errorMessage: 'Please input your name' });
            this.setState({ error: true });
        } else if (this.state.position.trim() == '') {
            this.setState({ errorMessage: 'Please input your position' });
            this.setState({ error: true });
        } else if (this.state.company == '') {
            this.setState({ errorMessage: 'Please input your company' });
            this.setState({ error: true });
        } else if (this.state.email.trim() == '') {
            this.setState({ errorMessage: 'Please input your email' });
            this.setState({ error: true });
        } else if (this.state.password.trim() == '') {
            this.setState({ errorMessage: 'Please input your password' });
            this.setState({ error: true });
        } else if (this.state.gender.trim() == '') {
            this.setState({ errorMessage: 'Please input your gender' });
            this.setState({ error: true });
        } else if (this.state.confirmPass.trim() == '') {
            this.setState({ errorMessage: 'Please input for confirm password'});
            this.setState({ error: true });
        } else if (this.state.confirmPass != this.state.password) {
            this.setState({ errorMessage: 'Passwords do not match'});
            this.setState({ error: true });
        } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.state.email, this.state.password)
              .then(() => {
                    const user = firebase.auth().currentUser;
                    const { name, position, company, picture, gender }  = this.state;
                    this.uploadProfile(user.uid, name, position, company, picture, gender, email);
                    // Send user email
                    user.sendEmailVerification()
                        .then(() => this.setState({ emailSent: true }))
              })
              .catch(error => this.updateError(error))
        }
    }

    uploadProfile(id, name, position, company, picture, gender, email) {
        firebase.database()
            .ref('Users/' + id)
            .set(
            {
                name: name,
                position: position,
                company: company,
                picture: picture,
                gender: gender,
                email: email,
            }
        );
    }

    updateError(error) {
        this.setState({ errorMessage: error.message });
        this.setState({ error: true });
    }

    getGender(gender) {
        this.setPicture(gender);
        this.setState({gender});
    }

    setPicture(gender) {
        if (gender == 'Male') {
            firebase.storage()
                .ref("Profile Picture/Default/men profile pic.png")
                .getDownloadURL().then((url) => this.setState({ picture: url}));
        } else {
            firebase.storage()
                .ref("Profile Picture/Default/female profile pic.png")
                .getDownloadURL().then((url) => this.setState({ picture: url}));
        }
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
                            onChangeText={(name) => this.setState({name})}
                            value = {this.state.name}/>
                        <TextInput
                            placeholder = 'Position'
                            style = { Styles.textInput }
                            selectionColor = {'skyblue'}
                            onChangeText={(position) => this.setState({position})}
                            value = {this.state.position}/>
                        <TextInput
                            placeholder = ' Company'
                            style = { Styles.textInput }
                            selectionColor = {'skyblue'}
                            onChangeText={(company) => this.setState({company})}
                            value = {this.state.company}/>
                        <TextInput
                            placeholder = 'Email'
                            style = { Styles.textInput }
                            selectionColor = {'skyblue'}
                            onChangeText={(email) => this.setState({email})}
                            value = {this.state.email}/>
                        <TextInput
                            placeholder = 'Password'
                            style = { Styles.textInput }
                            selectionColor = {'skyblue'}
                            secureTextEntry = { true }
                            onChangeText={(password) => this.setState({password})}
                            value = {this.state.password}/>
                        <TextInput
                            placeholder = 'Confirm password'
                            style = { Styles.textInput }
                            selectionColor = {'skyblue'}
                            secureTextEntry = { true }
                            onChangeText={(confirmPass) => this.setState({confirmPass})}
                            value = {this.state.confirmPass}/>
                        <GenderDropDown callback = { this.getGender.bind(this) }/>
                </View>
                <View style ={ Styles.button }>
                    <Button
                        containerStyle = { Styles.signUpButton }
                        color = '#2699FB'
                        onPress = { this.handleSignUp }
                        title = "Sign Up"/>
                </View>
                <ConfirmDialog
                   messageStyle = {{ alignSelf: 'center', color: "black"}}
                   dialogStyle = {{ borderRadius: 20 }}
                   buttonsStyle = {{ alignItems: 'center' }}
                   message = {'An email has been send to ' + this.state.email}
                   visible = { this.state.emailSent }
                   onTouchOutside = {() => {
                                        this.setState({ emailSent: false });
                                        this.props.navigation.navigate('Login');
                                         }}
                   positiveButton = {{
                       fontSize: 70,
                       title: "Confirm",
                       onPress: () => {
                           this.setState({ emailSent: false });
                           this.props.navigation.navigate('Login');
                       }
                   }}
               />
            </ScrollView>
        );
    }
}