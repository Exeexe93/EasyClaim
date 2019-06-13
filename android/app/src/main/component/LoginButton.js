import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-elements';
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
                    containerStyle = {Styles.loginButton}
                    color = 'skyblue'
                    onPress = { () => this.props.navigation.dispatch(goToMain)}
                    title = "Login"/>
        );
    }
}

export default withNavigation(LoginButton);