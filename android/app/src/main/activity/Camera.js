import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Slider, Icon } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';
import RNMlKit from 'react-native-firebase-mlkit';
import Styles from'../style/CameraStyle';

const flashModeOrder = {
  off: 'on',
  on: 'off',
};

export default class Camera extends Component {
    constructor() {
        super();
        global.FileUri = '';
        global.date = '';
        global.time = '';
        global.price = '';
    }

    state = {
        flash: 'off',
        zoom: 0,
        type: 'back',
        whiteBalance: 'auto',
        ratio: '16:9',
        textBlocks: [],
        detectDate: false,
        loading: false,
    };

    toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });

    }

    searchInfo = ({ blockText }) => {
        blockText.split('/n').map((v) => {
            this.searchDateAndTime(v);
            this.searchPrice(v);
        })
    }

    searchDateAndTime(value) {
        if (this.state.detectDate == false ) {
            posOfSlash = value.indexOf('/');
            posOfColon = value.indexOf(':');
            if(posOfSlash != -1 && posOfColon != -1) {
            // Date in dd/mm/yyyy so is 10 number
            date = value.substr(posOfSlash - 2, 10);
            // Time in hh:mm so is 5 number
            time = value.substr(posOfColon - 2, 5);
            this.setState({ detectDate: true })
            }
        }
    }

    searchPrice(value) {
        var number = '';
        posOfDot = value.indexOf('.');
        posOfKM = value.toUpperCase().indexOf('KM');
        // Check whether there are . in the string and 'km' word afterward
        if (posOfDot != -1 && posOfKM == -1) {
            if(posOfDot - 2 == -1) {
                number = parseFloat(value.substr(posOfDot - 1, 4)).toString();
            } else {
                number = parseFloat(value.substr(posOfDot - 2, 5)).toString();
            }
            // Add zero behind when is only 1 decimal place
            if (number.length - number.indexOf('.') == 2) {
               number = number + '0';
            }
            price = '$' + number;
        }
    }

    takePicture = async() => {
        try{
            if (this.camera) {
                const options = { quality: 0.5, base64: true, fixOrientation: true };
                const data = await this.camera.takePictureAsync(options);
                FileUri = data.uri;
                this.setState({ loading: true });
                const cloudTextRecognition = await RNMlKit.cloudTextRecognition(data.uri);
                this.setState({ textBlocks: cloudTextRecognition });
                this.state.textBlocks.map(this.searchInfo);
                this.setState({ loading: false });
                this.props.navigation.navigate('FillClaims');
            }
        } catch (e) {
            console.warn(e);
        }
    };

    toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));

    renderCamera() {
        return (
            <RNCamera
                ref = { ref => {
                  this.camera = ref;
                }}
                style = {{
                  flex: 1,
                }}
                type = { this.state.type }
                flashMode = { this.state.flash }
                autoFocus = { RNCamera.Constants.AutoFocus.on }
                zoom = { this.state.zoom }
                whiteBalance = { this.state.whiteBalance }
                ratio = { this.state.ratio }
                captureAudio = { false }
                androidCameraPermissionOptions = {{
                    title: 'Permission to use camera',
                    message: 'This application requires your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                >
                <View
                  style = { Styles.topContainer }
                >
                  <View
                            style = { Styles.sliderContainer }
                          >
                            <Slider
                              style = { Styles.slider }
                              thumbTintColor = '#307ecc'
                              orientation = {'vertical'}
                              maximumValue = { 1 }
                              minimumValue = { 0 }
                              step = { 0.1 }
                              minimumTrackTintColor = "#307ecc"
                              maximumTrackTintColor = "#000000"
                              value = { this.state.zoom }
                              onValueChange = { (sliderValue) => this.setState({ zoom: sliderValue })}
                            />
                          </View>
                </View>
                <View
                    style = { Styles.bottomContainer }>
                    <View
                      style={ Styles.buttonContainer }
                    >
                    <Icon
                        name = 'camera'
                        type = 'material'
                        size = { 80 }
                        color = 'white'
                        onPress = { this.takePicture.bind(this) }
                    />
                    </View>

                    <TouchableOpacity style={Styles.flipButton}
                        onPress = {this.toggleFlash.bind(this)}>
                        <Icon
                              name = 'flash'
                              type = 'entypo'
                              size = { 35 }
                              color =  {this.state.flash == 'on'? 'yellow': 'white'}
                        />
                    </TouchableOpacity>
                </View>
            </RNCamera>
        );
    }

    render() {
        const { loading } = this.state;
        if (loading) {
            return (
                <View style = {{ flex:1 , backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
                <Text style = {{fontSize: 20}}> Please wait ! </Text>
                <Text style = {{fontSize: 15}}> Processing Image </Text>
                <ActivityIndicator size = "large" />
                </View>
            );
        } else {
            return (
                <View style = { Styles.container }>
                    {this.renderCamera()}
                </View>
            );
        }
    }
}