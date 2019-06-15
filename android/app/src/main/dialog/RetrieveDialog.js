import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { StackActions, NavigationActions, withNavigation } from 'react-navigation';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import Styles from '../style/ButtonStyle';

class RetrieveDialog extends Component {

    state = {
        visible: false,
    };

    render() {

        const Logout = StackActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: 'Login' }),
          ],
        });

        return (
            <View>
                <Button
                    onPress = { () => this.setState({ visible: true }) }
                    title = "Retrieve password!"
                    containerStyle = { Styles.retrieveButton }/>
                <ConfirmDialog
                    messageStyle = {{ alignSelf: 'center'}}
                    message = "An email has been sent to you!"
                    visible = { this.state.visible }
                    onTouchOutside = {() => this.setState({visible: false}) }
                    positiveButton = {{
                        fontSize: 70,
                        title: "Confirm",
                        onPress: () => {
                            this.setState({ visible: false });
                            this.props.navigation.dispatch(Logout);
                        }
                    }}
                />
            </View>
        );
    }
}

export default withNavigation(RetrieveDialog);
