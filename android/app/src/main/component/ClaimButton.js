import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements'
import Styles from '../style/ButtonStyle';
import { withNavigation } from 'react-navigation';
import firebase from 'react-native-firebase';
import { ConfirmDialog } from 'react-native-simple-dialogs';

class ClaimButton extends Component {

    state = {
        error: false,
        errorMessage: '',
    }

    getImageUrl(id, sortDate, time, price) {
        firebase.storage()
            .ref('Transport Claim/' + id + "/" + sortDate + " " + time + "/image.jpg")
            .getDownloadURL().then((url) => this.uploadInfo(id, sortDate, time, price, url));
    }

    uploadInfo(id, sortDate, time, price, picUri) {
        firebase.database()
            .ref('Transport Claim/' + id + "/" + sortDate + " " + time)
            .set(
            {
                picUri: picUri,
                date: sortDate,
                time: time,
                price: price,
                submitted: false,
            }
        );
    }

    uploadClaim(id, picUri, date, time, price) {
        const sortDate = this.splitDate(date);
        // Upload picture to firebase storage
        firebase.storage()
            .ref('Transport Claim/' + id + "/" + sortDate + " " + time + '/image.jpg')
            .putFile(picUri).on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                        this.getImageUrl(id, sortDate, time, price);
                    }
                },
            );
    }

    splitDate(date) {
        return date.split('/').reverse().join('-');
    }

    processClaim = () => {
        if (!this.props.validate()) {
            this.uploadClaim(global.currentId, this.props.uri,
                this.props.date, this.props.time, this.props.price);
              this.showError('Claim success !');
        }
    }

    showError(errorMessage) {
        this.setState({ errorMessage: errorMessage });
        this.setState({ error: true });
    }

    render() {
        return (
            <View >
                <Button
                    onPress = { this.processClaim }
                    title = "Confirm"
                    color =  "#2699FB"
                    containerStyle = { Styles.claimButton }/>
                <ConfirmDialog
                   messageStyle = {{ alignSelf: 'center', color: "black"}}
                   dialogStyle = {{ borderRadius: 20, width: "70%", alignSelf: 'center' }}
                   buttonsStyle = {{ alignItems: 'center' }}
                   message = { this.state.errorMessage }
                   visible = { this.state.error }
                   onTouchOutside = {() => this.setState({ error: false }) }
                   positiveButton = {{
                       fontSize: 70,
                       title: "Confirm",
                       onPress: () => {
                           this.setState({ error: false });
                           this.props.navigation.navigate('Home');
                       }
                   }}
               />
            </View>
        );
    }
}

export default withNavigation(ClaimButton);




