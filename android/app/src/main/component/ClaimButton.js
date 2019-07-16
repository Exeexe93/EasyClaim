import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button } from 'react-native-elements'
import Styles from '../style/ButtonStyle';
import { withNavigation } from 'react-navigation';
import firebase from 'react-native-firebase';

class ClaimButton extends Component {
    getImageUrl(id, sortDate, time, price) {
        firebase.storage()
            .ref('Transport Claim/' + id + "/" + sortDate + "/" + time + "/image.jpg")
            .getDownloadURL().then((url) => this.uploadInfo(id, sortDate, time, price, url));
    }

    uploadInfo(id, sortDate, time, price, picUri) {
        firebase.database()
            .ref('Transport Claim/' + id + "/" + sortDate + "/" + time)
            .set(
            {
                picUri: picUri,
                date: sortDate,
                time: time,
                price: price,
            }
        );
    }

    uploadClaim(id, picUri, date, time, price) {
        const sortDate = this.splitDate(date);
        // Upload picture to firebase storage
        firebase.storage()
            .ref('Transport Claim/' + id + '/' + sortDate + "/" + time + '/image.jpg')
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

    render() {
        const ClaimAlert = () => {
            this.uploadClaim(global.currentId, this.props.uri,
                this.props.date, this.props.time, this.props.price);
            Alert.alert(
                  'Claim Success',
                  ' ',
                  [
                    {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
                  ],
                  {cancelable: false},
            );
        }

        return (
            <View >
                <Button
                    onPress = { ClaimAlert }
                    title = "Confirm"
                    color =  "#2699FB"
                    containerStyle = { Styles.claimButton }/>
            </View>
        );
    }
}

export default withNavigation(ClaimButton);




