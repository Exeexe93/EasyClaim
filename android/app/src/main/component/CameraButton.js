import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Styles from '../style/ButtonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CameraButton extends Component {
    render() {
        return (
                <Button
                    style = {Styles.claimButton}
                    mode = "contained"
                    onPress = {() => console.log("Claim now")}>
                    <Icon
                        name = "camera"
                        size={20}
                        color = "black"
                    />
                    <Text>     </Text>
                    <Text style = {{color: 'white', fontSize: 15}}>
                        Claim now
                    </Text>
                </Button>
        );
    }
}