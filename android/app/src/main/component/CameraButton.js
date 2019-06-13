import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from '../style/ButtonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';

class CameraButton extends Component {
    render() {
        return (
                <Button
                    containerStyle = {Styles.cameraButton}
                    titleStyle = {{ marginHorizontal : 30}}
                    onPress = {() => this.props.navigation.navigate('FillDetails')}
                    icon = {
                        <Icon
                            name = "camera"
                            size = { 20 }
                            color = "black"
                        />
                    }
                    title = "Claim now"
                />
        );
    }
}



export default withNavigation(CameraButton);