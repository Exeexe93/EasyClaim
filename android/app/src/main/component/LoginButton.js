import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';
import Styles from '../style/ButtonStyle';

export default class CameraButton extends Component {
    render() {
        return (
                <Button
                    style = {Styles.loginButton}
                    mode = "contained"
                    color = 'skyblue'>
                    Login
                </Button>

        );
    }
}