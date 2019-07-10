import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import RNMlKit from 'react-native-firebase-mlkit';
import { withNavigation } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';

class UploadFile extends Component{

    constructor() {
        super();
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.processingImage = this.processingImage.bind(this);
    }

    state = {
        textBlocks: [],
        date: '',
        time: '',
        price: '',
        uri: '',
    }

    selectPhotoTapped() {

        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.launchImageLibrary(options, (response) => {

            if (response.didCancel) { }
            else if (response.error) {
               Alert.alert(
                 'Error',
                 ' ',
                 [
                   {text: response.error, onPress: () => {}},
                   {text: 'OK', onPress: () => {}},
                 ],
                 {cancelable: false},
               );
            } else {
                this.processingImage(response.uri);
            }
        });
    }

    processingImage = async(uri) => {
        this.setState({ uri: uri });
        const cloudTextRecognition = await RNMlKit.cloudTextRecognition(uri);
        this.setState({ textBlocks: cloudTextRecognition });
        console.log(this.state.textBlocks);
        this.state.textBlocks.map(this.searchInfo);
        this.props.navigation.navigate('FillClaims', {
                                                        date: this.state.date,
                                                        time: this.state.time,
                                                        price: this.state.price,
                                                        uri: this.state.uri
                                                    });
    }

    searchInfo = ({ blockText }) => {
        blockText.split('/n').map((v) => {
            this.searchDateAndTime(v);
            this.searchPrice(v);
        })
    }

    searchDateAndTime(value) {
        const posOfDate = value.indexOf('time:');
        const posOfColon = value.indexOf(':');
        const posOfPlus = value.indexOf('+');

        if(posOfDate != -1) {
            // String in time: 01 Jan 19
            var date = new Date(value.substr(posOfDate + 6, 9));
            var day = date.getDate();
            day = day < 10? "0" + day: day;
            var month = date.getMonth() + 1;
            month = month < 10? "0" + month: month;
            const year = date.getFullYear();
            date = day + "/" + month + "/" + year;
            // Required to change to DD/MM/YYYY instead of MM/DD/YYYY
            this.setState ({ date: date });
            console.log('date: ' + this.state.date);
        }
        if (posOfColon != -1 && posOfPlus != -1) {
            // Time in 04:39 +0800
            const time = value.substr(posOfColon - 2, 5);
            this.setState({ time: time });
            console.log('time: ' + this.state.time);
        }
    }

    searchPrice(value) {
        var number = '';
        const posOfDot = value.indexOf('.');
        const array = value.split('/n');
        if (posOfDot != -1) {
            if (posOfDot - 2 == -1) {
                number = parseFloat(value.substr(posOfDot - 1, 4)).toFixed(2);
            } else {
                number = parseFloat(value.substr(posOfDot - 2, 5)).toFixed(2);
            }
            if (!isNaN(number)) {
                number = '$' + number;
                this.setState({ price: number });
                console.log('price: ' + this.state.price);
            }
        }
    }

    render() {
        return (
            <Button
                title = "Select Image"
                icon = {
                         <Icon
                           name = "image-search-outline"
                           size = { 30 }
                           type = "material-community"
                         />
                }
                containerStyle = {{ width : 200, marginTop: 20 }}
                titleStyle = {{ marginHorizontal : 10 }}
                onPress = { this.selectPhotoTapped.bind(this) }/>
        );
    }
}

export default withNavigation(UploadFile);