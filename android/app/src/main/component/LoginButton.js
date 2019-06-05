import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';
import Styles from '../style/ButtonStyle';
import { withNavigation } from 'react-navigation';

class LoginButton extends Component {
    render() {
        return (
                <Button
                    style = {Styles.loginButton}
                    mode = "contained"
                    color = 'skyblue'
                    onPress = { () => this.props.navigation.navigate('Main')}>
                    Login
                </Button>
        );
    }
}

export default withNavigation(LoginButton);