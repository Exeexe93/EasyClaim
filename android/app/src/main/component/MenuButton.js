import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

class MenuButton extends Component {
    render() {
        return (
            <Icon name = "menu" size = {25} onPress={() => this.props.navigation.openDrawer()}/>
        );
    }
}

export default withNavigation(MenuButton);