import React, { Component } from 'react';
import { TextInput, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import CameraButton from '../component/CameraButton';
import MenuButton from '../component/MenuButton';
import Styles from '../style/MainStyle'

export default class Main extends Component{

  render() {
        return (
                <View style = {Styles.container}>
                    <Header
                        containerStyle = {{ height: 50, paddingVertical: 20}}
                        leftComponent={<MenuButton/>}
                    />
                    <View style = {Styles.logoBox}>
                        <Text style = {Styles.logo}>
                            EasyClaim
                        </Text>
                    </View>
                    <View style = {Styles.cameraBox}>
                        <CameraButton/>
                    </View>
                </View>
        );
  }
}

