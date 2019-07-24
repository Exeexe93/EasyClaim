import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-elements';
import Styles from '../style/ButtonStyle';
import { withNavigation } from 'react-navigation';
import firebase from 'react-native-firebase';

class ReviewButton extends Component {
    processClaim = () => {
        if (!this.props.validate()) {
            this.processDetails();
        }
    }

    processDetails = () => {
        if (this.props.checkEdit() == 0) {
            this.props.navigation.navigate('Submission', {refresh: false});
        } else if (this.props.checkEdit() == 1) {
            this.uploadInfo(global.currentId);
        } else {
            this.deletePost(global.currentId, this.props.originalDate, this.props.originalTime);
        }
    }

    deletePost(id, date, time) {
        const sortDate = this.splitDate(date);
        firebase.database()
            .ref('Transport Claim/' + id + "/" + sortDate + " " + time)
            .remove().then(() => this.uploadInfo(id));
    }

    uploadInfo(id) {
        const sortDate = this.splitDate(this.props.date);
        firebase.database()
            .ref('Transport Claim/' + id + "/" + sortDate + " " + this.props.time)
            .set(
            {
                Date: sortDate,
                Time: this.props.time,
                Amount: this.props.price,
                Link: this.props.picUri,
                Submitted: false,
            }
        ).then(() => this.props.navigation.navigate('Submission', {refresh: true}));
    }

    splitDate(date) {
        return date.split('/').reverse().join('-');
    }

    render() {
        if (this.props.editing) {
                return (
                        <Button color = "skyblue" title = "Ok" containerStyle = { Styles.reviewButton }
                            onPress = { this.processClaim }/>
                );
        } else {
            return (
                    <Button color = "skyblue" title = "Ok" containerStyle = { Styles.reviewButton }
                        onPress = { () => this.props.navigation.navigate('History', {refresh: false}) }/>
            );
        }
    }
}

export default withNavigation(ReviewButton);