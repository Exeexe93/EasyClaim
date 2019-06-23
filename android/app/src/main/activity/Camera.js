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
    }

    state = {
        flash: 'off',
        zoom: 0,
        type: 'back',
        whiteBalance: 'auto',
        ratio: '16:9',
        canDetectText: false,
        textBlocks: [],
    };

    toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });

    }

    takePicture = async() => {
        try{
            if (this.camera) {
              const options = { quality: 0.5, base64: true, fixOrientation: true };
              const data = await this.camera.takePictureAsync(options);
              FileUri = data.uri;
              const textData = await RNTextDetector.detectFromUri(FileUri);
              this.setState({textBlocks: textData});
              console.warn(this.state.textBlocks);
              //this.props.navigation.navigate('FillClaims');
            }
        } catch (e) {
            console.warn(e);
        }
    };

    toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));

    renderTextBlocks = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.textBlocks.map(this.renderTextBlock)}
    </View>
    );

    renderTextBlock = ({ bounds, value }) => (
    <React.Fragment key={value + bounds.origin.x}>
      <Text style={[styles.textBlock, { left: bounds.origin.x, top: bounds.origin.y }]}>
        {value}
      </Text>
      <View
        style={[
          styles.text,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      />
    </React.Fragment>
    );

    textRecognized = object => {
    const { textBlocks } = object;
    this.setState({ textBlocks });
    };

    renderCamera() {
        const { canDetectText } = this.state;
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
        return <View style={styles.container}>{this.renderCamera()}</View>;
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
    flipText: {
        color: 'white',
        fontSize: 15,
    },
    zoomText: {
        position: 'absolute',
        bottom: 70,
        zIndex: 2,
        left: 2,
    },
    picButton: {
        backgroundColor: 'skyblue',
    },
    text: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#F00',
        justifyContent: 'center',
    },
    textBlock: {
        color: '#F00',
        position: 'absolute',
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
});