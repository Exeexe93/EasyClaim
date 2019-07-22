import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import Styles from '../style/ButtonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';

class uploadButton extends Component {
    render() {
        return (
                <Button
                    containerStyle = { Styles.uploadButton }
                    titleStyle = {{ marginHorizontal : 30 }}
                    onPress = {() => this.props.navigation.navigate('Camera')}
                    icon = {
                        <Icon
                            name = "image"
                            size = { 20 }
                            color = "black"
                        />
                    }
                    title = "Upload image"
                />
        );
    }
}

export default withNavigation(uploadButton);