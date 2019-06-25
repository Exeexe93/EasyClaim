import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Slider, Icon } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';
import RNTextDetector from "react-native-text-detector";

const flashModeOrder = {
  off: 'on',
  on: 'off',
};

export default class CameraScreen extends React.Component {
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
    };

    toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });

    }

    searchInfo = ({ text }) => {
        text.split('/n').map((v) => {
            this.searchDateAndTime(v);
            this.searchPrice(v);
        })
    }

    searchDateAndTime(value) {
        //posOfStart = value.toUpperCase().indexOf('START');
        posOfSlash = value.indexOf('/');
        posOfColon = value.indexOf(':');
        // Check if this is the start date and time
        //if (posOfStart != -1 && posOfSlash != -1 && posOfColon != -1)  {
        if (this.state.detectDate == false && posOfSlash != -1 && posOfColon != -1) {
            // Date in dd/mm/yyyy so is 10 number
            date = value.substr(posOfSlash - 2, 10);
            // Time in hh:mm so is 5 number
            time = value.substr(posOfColon - 2, 5);
            this.setState({ detectDate: true })
        }
    }

    searchPrice(value) {
        var number = '';
        posOfDot = value.indexOf('.');
        posOfKM = value.toUpperCase().indexOf('KM');
        // Check whether there are . in the string and 'km' word afterward
        if (posOfDot != -1 && posOfKM == -1) {
            number = parseFloat(value.substr(posOfDot - 2, 5)).toString();
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
                const visionResp = await RNTextDetector.detectFromUri(FileUri);
                this.setState({ textBlocks: visionResp });
                this.state.textBlocks.map(this.searchInfo);
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
                  style = {{
                    flex: 1,
                    justifyContent: 'flex-start',
                  }}
                >
                  <View
                            style = {{
                              backgroundColor: 'transparent',
                              alignSelf: 'flex-start',
                              justifyContent: 'center',
                              width: "100%", height: "90%",
                            }}
                          >
                            <Slider
                              style = {{width: 40, height: 200,
                              marginHorizontal: 10, alignSelf: 'flex-start'}}
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
                    style = {{
                        flex: 0.2,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        alignContent: 'center',
                        justifyContent: 'flex-end',
                }}>
                    <View
                      style={{
                        alignSelf: 'center',
                        marginHorizontal: 40,
                        backgroundColor: 'transparent',
                      }}
                    >
                    <Icon
                        name = 'camera'
                        type = 'material'
                        size = { 80 }
                        color = 'white'
                        onPress = { this.takePicture.bind(this) }
                    />
                    </View>

                    <TouchableOpacity style={styles.flipButton}
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
        return (
            <View style = { styles.container }>
                {this.renderCamera()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#000',
    },
    flipButton: {
        alignSelf: 'center',
        height: 40,
        marginHorizontal: 40,
        marginBottom: 10,
        marginTop: 10,
        padding: 5,
    },
});