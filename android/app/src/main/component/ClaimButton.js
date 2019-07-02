import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button } from 'react-native-elements'
import Styles from '../style/ButtonStyle';
import { withNavigation } from 'react-navigation';
import firebase from 'react-native-firebase';

class ClaimButton extends Component {
    constructor() {
        super();
    }

    getImageUrl(id, sortDate, date, time, price) {
        firebase.storage()
            .ref('Transport Claim/' + id + "/" + sortDate + "/image.jpg")
            .getDownloadURL().then((url) => this.uploadInfo(id, sortDate, date, time, price, url));
    }

    uploadInfo(id, sortDate, date, time, price, picUri) {
        firebase.database()
            .ref('Transport Claim/' + id + "/" + sortDate)
            .set(
            {
                picUri: picUri,
                date: date,
                time: time,
                price: price,
            }
        );
    }

    uploadClaim(id, picUri, date, time, price) {
        const sortDate = this.splitDate(date);
        // Upload picture to firebase storage
        firebase.storage()
            .ref('Transport Claim/' + id + "/" + sortDate + "/image.jpg")
            .putFile(picUri).on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                        this.getImageUrl(id, sortDate, date, time, price);
                    }
                },
            );
    }

    splitDate(date) {
        const year = date.substr(6, 4);
        const month = date.substr(2, 4);
        const day = date.substr(0, 2);
        return year + month + day;
    }

    render() {
        const ClaimAlert = () => {
            this.uploadClaim(global.currentId, global.FileUri,
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
            <View>
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




