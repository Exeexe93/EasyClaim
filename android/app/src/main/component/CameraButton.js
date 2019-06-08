import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Styles from '../style/ButtonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';

class CameraButton extends Component {
    render() {
        return (
                <Button
                    style = {Styles.claimButton}
                    mode = "contained"
                    onPress = {() => this.props.navigation.navigate('FillDetails')}>
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

export default withNavigation(CameraButton);