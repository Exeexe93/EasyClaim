import React, { Component } from 'react';
import { Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import firebase from 'react-native-firebase';

class EditIcon extends Component {

    updateProfile(id, picUrl) {
       if (picUrl != this.props.picUrl) {
           firebase.database()
               .ref('Users/' + id)
               .set(
               {
                   name: this.props.name,
                   position: this.props.position,
                   company: this.props.company,
                   picture: picUrl,
                   gender: this.props.gender,
               }
           ).then(this.props.navigation.navigate('Profile'));
       } else {
            firebase.database()
               .ref('Users/' + id)
               .update(
               {
                   name: this.props.name,
                   position: this.props.position,
                   company: this.props.company,
                   gender: this.props.gender,
               }
           ).then(this.props.navigation.navigate('Profile'));
       }
    }

    updatePhoto(id, picUrl) {
        firebase.storage()
            .ref('Profile Picture/' + id + '/image.jpg')
            .putFile(picUrl).on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                        this.getImageUrl(id, picUrl);
                    }
                },
            );
    }

    getImageUrl(id, picUrl) {
            firebase.storage()
                .ref('Profile Picture/' + id + '/image.jpg')
                .getDownloadURL().then((url) => this.updateProfile(id, url));
    }

    updateStatus() {
        const id = firebase.auth().currentUser.uid;
        const picUrl = this.props.selectedPic;
        if (picUrl != null) {
            this.updatePhoto(id, picUrl);
        } else {
            this.updateProfile(id, this.props.picUrl);
        }
    }

    render() {
        return (
                <Icon
                    name = 'done'
                    type = 'material'
                    size = { 25 }
                    onPress = { () => {
                        this.updateStatus();

                }}/>
        );
    }
}

export default withNavigation(EditIcon);