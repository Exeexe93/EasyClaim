import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
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
            <View style = {{flexDirection: 'row'}}>
                <Icon
                     name = 'logout'
                     type = 'antdesign'
                     color = '#FFFFFF'
                     underlayColor = '#2699FB'
                     size = { 20 }
                     containerStyle = {{ justifyContent: 'center' }}
                     onPress = { () => this.setState({ visible: true }) }
                />
                <Text
                    onPress = { () => this.setState({ visible: true }) }
                    style = { Styles.drawerItem }>
                    Logout
                </Text>
                <ConfirmDialog
                    messageStyle = {{ alignSelf: 'center', color: "black"}}
                    dialogStyle = {{ borderRadius: 20}}
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
