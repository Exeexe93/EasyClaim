import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import RNMlKit from 'react-native-firebase-mlkit';
import { withNavigation } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import { ConfirmDialog, ProgressDialog } from 'react-native-simple-dialogs';

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
        amount: '',
        uri: '',
        error: false,
        errorMessage: '',
        onProcess: false,
    }

    selectPhotoTapped() {

        const options = {
            quality: 1.0,
            maxWidth: 800,
            maxHeight: 1700,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.launchImageLibrary(options, (response) => {

            if (response.didCancel) { }
            else if (response.error) {
                this.setState({ errorMessage: response.error });
                this.setState({ error: true });
            } else {
                this.processingImage(response.uri);
            }
        });
    }

    processingImage = async(uri) => {
        this.setState({ onProcess: true });
        this.setState({ uri: uri });
        const cloudTextRecognition = await RNMlKit.cloudTextRecognition(uri);
        this.setState({ textBlocks: cloudTextRecognition });
        this.state.textBlocks.map(this.searchInfo);
        this.setState({ onProcess: false });
        this.props.navigation.navigate('FillClaims',
        {
            date: this.state.date,
            time: this.state.time,
            amount: this.state.amount,
            uri: this.state.uri,
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
        }
        if (posOfColon != -1 && posOfPlus != -1) {
            // Time in 04:39 +0800
            const time = value.substr(posOfPlus - 6, 5);
            this.setState({ time: time });
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
                this.setState({ amount: number });
            }
        }
    }

    render() {
        return (
            <>
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
                <ProgressDialog
                     visible={this.state.onProcess}
                     activityIndicatorSize = {'large'}
                     titleStyle = {{ alignSelf: 'center'}}
                      dialogStyle = {{ borderRadius: 20, width: '90%', alignSelf:'center' }}
                     title = "Please wait"
                     message="Processing Image ..."
                 />
                <ConfirmDialog
                   messageStyle = {{ alignSelf: 'center', color: "black"}}
                   dialogStyle = {{ borderRadius: 20 }}
                   buttonsStyle = {{ alignItems: 'center' }}
                   message = { this.state.errorMessage }
                   visible = { this.state.error }
                   onTouchOutside = {() => this.setState({ error: false }) }
                   positiveButton = {{
                       fontSize: 70,
                       title: "Confirm",
                       onPress: () => {
                           this.setState({ error: false });
                       }
                   }}
               />
           </>
        );
    }
}

export default withNavigation(UploadFile);