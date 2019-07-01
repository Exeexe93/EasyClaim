import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import Styles from '../style/MenuStyle';
import LogoutDialog from '../dialog/LogoutDialog';
import MenuDivider from '../component/MenuDivider';
import firebase from 'react-native-firebase';

export default class Menu extends Component {
    constructor() {
        super();
        global.currentId = '';
    }
    state = {
        profile: '',
    }
    componentDidMount() {
            currentId = firebase.auth().currentUser.uid;
            firebase.database().ref('Users/' + currentId )
                                 .once('value').then((data) => this.getProfileInfo(data.val()));
    }

    getProfileInfo(value) {
        this.setState({ profile: value });
    }

    render() {

        return (
            <View style = { Styles.container }>
                <View style = { Styles.profilePic }>
                    <Avatar
                        rounded
                        source = {{ uri: this.state.profile.picture }}
                        size = { 120 }
                        containerStyle = {{ marginTop: 20, alignSelf: 'center' }}
                    />
                    <Text style = { Styles.profileName } >
                        { this.state.profile.name }
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
                          onPress = {() => this.props.navigation.navigate('History')}
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
                          onPress = {() => this.props.navigation.navigate('Profile',
                          {
                              profile: this.state.profile
                          })}
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