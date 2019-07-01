import React, { Component } from 'react';
import { Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class EditIcon extends Component {
    render() {
        return (
                <Icon
                    name = 'account-edit'
                    type = 'material-community'
                    size = { 25 }
                    onPress = { () => this.props.navigation.replace('EditProfile',
                                    {
                                        profile: this.props.profile,
                                    })}/>
        );
    }
}

export default withNavigation(EditIcon);