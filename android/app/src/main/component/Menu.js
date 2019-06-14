import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Styles from '../style/MenuStyle';
import LogoutDialog from '../dialog/LogoutDialog';

export default class Menu extends Component {

    render() {

        return (
            <View style = {Styles.container}>
                <View style = { Styles.itemContainer }>
                    <Text
                      onPress = {() => this.props.navigation.navigate('Home')}
                      style = { Styles.drawerItem }
                    >
                      Main
                    </Text>
                    <Text
                      onPress = {() => this.props.navigation.navigate('Notifications')}
                      style = { Styles.drawerItem }
                    >
                      Notifications
                    </Text>
                    <Text
                      onPress = {() => this.props.navigation.navigate('Profile')}
                      style = { Styles.drawerItem }
                    >
                      Profile
                    </Text>
                </View>
                <View style = { Styles.logoutContainer}>
                    <LogoutDialog/>
                </View>
            </View>
        )
    }
}

/*
<Text
                      onPress = { () => this.props.navigation.dispatch(Logout) }
                      style = { Styles.logout }
                      >
                      Logout
                    </Text>*/
