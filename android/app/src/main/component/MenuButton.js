import React, { Component } from 'react';
import { Appbar } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

class MenuButton extends Component {
    render() {
        return (
            <Appbar style = {{paddingHorizontal: 10, backgroundColor: '#2699FB'}}>
                <Icon name = "menu" size = {25} onPress={() => this.props.navigation.openDrawer()}/>
            </Appbar>
        );
    }
}
export default withNavigation(MenuButton);