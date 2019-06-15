import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button } from 'react-native-elements'
import Styles from '../style/ButtonStyle';
import { withNavigation } from 'react-navigation';

class ClaimButton extends Component {

    render() {
        const ClaimAlert = () => Alert.alert(
              'Claim Success',
              ' ',
              [
                {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
              ],
              {cancelable: false},
        );

        return (
            <View>
                <Button
                    onPress = { ClaimAlert }
                    title = "Confirm"
                    color =  "skyblue"
                    containerStyle = { Styles.claimButton }/>
            </View>
        );
    }
}

export default withNavigation(ClaimButton);




