import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from '../style/ButtonStyle';
import { StackActions, NavigationActions, withNavigation } from 'react-navigation';

const goToLogin = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Login' }),
      ],
    });

class SignUpButton extends Component {

    render() {
        return (
                <Button
                    containerStyle = {Styles.signUpButton}
                    color = '#2699FB'
                    onPress = { () => this.props.navigation.dispatch(goToLogin)}
                    title = "Sign Up"/>
        );
    }
}

export default withNavigation(SignUpButton);