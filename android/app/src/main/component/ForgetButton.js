import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from '../style/ButtonStyle';
import { withNavigation } from 'react-navigation';

class ForgetButton extends Component {

    render() {
        return (
                <Button
                    containerStyle = { Styles.forgetButton }
                    color = '#2699FB'
                    onPress = { () => this.props.navigation.navigate('ForgetPassword') }
                    title = "Forgot Password"/>
        );
    }
}

export default withNavigation(ForgetButton);