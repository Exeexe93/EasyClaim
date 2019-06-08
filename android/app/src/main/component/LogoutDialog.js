import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StackActions, NavigationActions, withNavigation } from 'react-navigation';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import Styles from '../style/MenuStyle';

class LogoutDialog extends Component {

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
                <Text
                    onPress = { () => this.setState({ visible: true }) }
                    style = { Styles.drawerItem }>
                    Logout
                </Text>
                <ConfirmDialog
                    messageStyle = {{ alignSelf: 'center'}}
                    message = "Confirm Logout?"
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
                    negativeButton = {{
                        title: "Cancel",
                        onPress: () => this.setState({ visible: false }),
                    }}
                />
            </View>
        );
    }
}

export default withNavigation(LogoutDialog);
