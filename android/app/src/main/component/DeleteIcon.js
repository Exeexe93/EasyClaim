import React, { Component } from 'react';
import { Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import firebase from 'react-native-firebase';

class DeleteIcon extends Component {
    deleteClaim = () => {
        const sortDate = this.splitDate(this.props.date);
        firebase.database()
            .ref('Transport Claim/' + global.currentId + "/" + sortDate + "/" + this.props.time)
            .remove().then(() => this.deletePic(sortDate));
    }

    deletePic(date) {
        firebase.storage()
            .ref('Transport Claim/' + global.currentId + "/" + date + "/" + this.props.time + "/image.jpg")
            .delete().then(() => this.props.navigation.navigate('Submission', {refresh: true}));
    }

    splitDate(date) {
        return date.split('/').reverse().join('-');
    }

    render() {
        return (
                <Icon
                    name = 'delete'
                    type = 'material-community'
                    size = { 25 }
                    onPress = { this.deleteClaim }/>
        );
    }
}

export default withNavigation(DeleteIcon);