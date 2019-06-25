import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import Styles from '../style/MenuStyle';
import LogoutDialog from '../dialog/LogoutDialog';
import MenuDivider from '../component/MenuDivider';

export default class Menu extends Component {

    render() {

        return (
            <View style = { Styles.container }>
                <View style = { Styles.profilePic }>
                    <Avatar
                        rounded
                        source = {{
                        uri:
                          'https://previews.123rf.com/images/vadymvdrobot/vadymvdrobot1509/vadymvdrobot150900446/45025475-closeup-portrait-of-a-handsome-man-at-gym.jpg'
                        }}
                        size = { 120 }
                        containerStyle = {{ marginTop: 20, alignSelf: 'center' }}
                    />
                    <Text style = { Styles.profileName } >
                        John
                    </Text>
                </View>
                <View style = { Styles.itemContainer }>
                    <MenuDivider/>
                    <View style = { Styles.icon }>
                        <Icon
                            name = 'home'
                            type = 'font-awesome'
                            color = '#FFFFFF'

                        />
                        <Text
                          onPress = {() => this.props.navigation.navigate('Home')}
                          style = { Styles.drawerItem }
                        >
                          Main
                        </Text>
                    </View>
                    <MenuDivider/>
                    <View style = { Styles.icon }>
                        <Icon
                            name = 'list-alt'
                            type = 'font-awesome'
                            color = '#FFFFFF'

                        />
                        <Text
                          onPress = {() => this.props.navigation.navigate('Notifications')}
                          style = { Styles.drawerItem }
                        >
                          History
                        </Text>
                    </View>
                    <MenuDivider/>
                    <View style = { Styles.icon }>
                        <Icon
                            name = 'ios-person'
                            type = 'ionicon'
                            color = '#FFFFFF'

                        />
                        <Text
                          onPress = {() => this.props.navigation.navigate('Profile')}
                          style = { Styles.drawerItem }
                        >
                          Profile
                        </Text>
                    </View>
                    <MenuDivider/>
                </View>
                <View style = { Styles.logoutContainer}>
                    <LogoutDialog/>
                </View>
            </View>
        )
    }
}