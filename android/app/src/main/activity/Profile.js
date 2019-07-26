import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { Avatar, Header, Image } from 'react-native-elements';
import MenuButton from '../component/MenuButton';
import EditIcon from '../component/EditIcon';
import firebase from 'react-native-firebase';
import Styles from '../style/ProfileStyle';

export default class Profile extends Component{

    state = {
        profile: ' ',
    }

     componentDidMount() {
            this.refresh = this.props.navigation.addListener("didFocus", this.initialiseScreen);
     }

    componentWillUnmount() {
        this.refresh.remove();
    }

    initialiseScreen = () => {
        const currentId = firebase.auth().currentUser.uid;
        firebase.database().ref('Users/' + currentId )
                            .once('value').then((data) => this.getProfileInfo(data.val()));
    }

    getProfileInfo(value) {
        this.setState({ profile: value });
    }

    render() {
        return(
                <View style = { Styles.container }>
                    <Header
                        containerStyle = {{ height: 50, paddingVertical: 20 }}
                        leftComponent = { <MenuButton/> }
                        rightComponent = { <EditIcon profile = { this.state.profile }/> }
                    />
                    <Avatar
                        rounded
                        source = {{ uri: this.state.profile.picture }}
                        size = { 180 }
                        containerStyle = {{ marginTop: 20, alignSelf: 'center' }}
                    />
                    <Text style = { Styles.name }>
                        { this.state.profile.name }
                    </Text>
                    <Text style = { Styles.gender }>
                        { this.state.profile.gender }
                    </Text>
                    <View style = {{alignSelf: 'center', marginTop: 50}}>
                        <Text style = { Styles.text }>
                            Company: { this.state.profile.company }
                        </Text>
                        <Text style = { Styles.text }>
                            Position: { this.state.profile.position }
                        </Text>
                    </View>
                </View>
        );
  }
}

