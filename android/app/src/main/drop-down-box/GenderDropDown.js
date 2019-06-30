import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';

export default class GenderDropDown extends Component {


    render() {
        let data = [{
            value: 'Male',
        }, {
            value: 'Female',
        }];

        return (
            <Dropdown
                label = 'Gender'
                data = { data }
                fontSize = { 15 }
                onChangeText = { (gender) => this.props.callback(gender) }
            />
        );
    }
}