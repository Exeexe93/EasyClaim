import React, { Component } from 'react';
import { Alert, TextInput, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from '../style/RegisterStyle';
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import GenderDropDown from '../drop-down-box/GenderDropDown'

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
        gender: '',
        errorMessage: '',
        error: false,
    }

    handleSignUp = () => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => {
                const user = firebase.auth().currentUser;
                const { name, position, company, picture, gender }  = this.state;
                this.uploadProfile(user.uid, name, position, company, picture, gender);
                //this.props.navigation.dispatch(goToMain);
                // Send user email
                user.sendEmailVerification()
                    .then(() => Alert.alert(
                                  'An email has been send to ' + user.email,
                                  'Please verify your email',
                                  [
                                    {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
                                  ],
                                  {cancelable: false},
                                )
                        )
          })
          .catch(error => this.updateError(error))
    }

    uploadProfile(id, name, position, company, picture, gender) {
        firebase.database()
            .ref('Users/' + id)
            .set(
            {
                name: name,
                position: position,
                company: company,
                picture: picture,
                gender: gender,
            }
        );
    }

    updateError(error) {
        this.setState({ errorMessage: error.message });
        this.setState({ error: true });
    }

    getGender(gender) {
        this.setState({gender});
        this.setPicture(gender);
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
                        <GenderDropDown callback = { this.getGender.bind(this) }/>
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