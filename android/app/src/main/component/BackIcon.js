import React, { Component } from 'react';
import { Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class EditIcon extends Component {
    render() {
        return (
                <Icon
                    name = 'keyboard-backspace'
                    type = 'material-community'
                    size = { 25 }
                    onPress = { () => this.props.navigation.navigate('Profile')}/>
        );
    }
}

export default withNavigation(EditIcon);