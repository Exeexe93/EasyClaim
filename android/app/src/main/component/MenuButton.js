import React, { Component } from 'react';
import { Appbar } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

class CameraButton extends Component {
    render() {
        return (
            <Appbar style = {{paddingHorizontal: 10}}>
                <Icon name = "menu" size = {25} onPress={() => this.props.navigation.openDrawer()}/>
            </Appbar>
        );
    }
}
export default withNavigation(CameraButton);