import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';
import Styles from '../style/ButtonStyle';
import { StackActions, NavigationActions, withNavigation } from 'react-navigation';

const goToMain = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Drawer' }),
      ],
    });

class LoginButton extends Component {

    render() {
        return (
                <Button
                    style = {Styles.loginButton}
                    mode = "contained"
                    color = 'skyblue'
                    onPress = { () => this.props.navigation.dispatch(goToMain)}>
                    Login
                </Button>
        );
    }
}

export default withNavigation(LoginButton);