import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from '../style/ButtonStyle';
import { withNavigation } from 'react-navigation';

class ReviewButton extends Component {
    render() {
        return (
                <Button color = "skyblue" title = "Ok" containerStyle = { Styles.reviewButton }
                    onPress = { () => this.props.navigation.navigate('History')}/>
        );
    }
}

export default withNavigation(ReviewButton);