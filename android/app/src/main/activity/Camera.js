import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Slider, Icon } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';

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
        canDetectText: true,
        textBlocks: [],
    };

    toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });

    }

    takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, fixOrientation: true };
      const data = await this.camera.takePictureAsync(options);
      FileUri = data.uri;
      console.log(this.state.textBlock);
      this.props.navigation.navigate('FillClaims');
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
                onTextRecognized = {canDetectText ? this.textRecognized : null}
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
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}
                  >
                    <TouchableOpacity style={styles.flipButton}
                        onPress = {this.toggleFlash.bind(this)}>
                        <Icon
                              name = 'flash'
                              type = 'entypo'
                              size = { 25 }
                              color =  {this.state.flash == 'on'? 'yellow': 'white'}
                        />
                    </TouchableOpacity>
                  </View>
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
                  style={{
                    flex: 0.2,
                    backgroundColor: 'transparent',
                    alignSelf: 'center',
                  }}
                >
                <Icon
                    style = {{ }}
                    name = 'camera'
                    type = 'material'
                    size = { 80 }
                    color = 'white'
                    onPress = { this.takePicture.bind(this) }
                />
                </View>
                {!!canDetectText && this.renderTextBlocks()}
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
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 8,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
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