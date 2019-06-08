import React, { Component } from 'react';
import { TextInput, Text, View, StyleSheet} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import CameraButton from '../component/CameraButton';
import MenuButton from '../component/MenuButton';
import Styles from '../style/MainStyle'

export default class Main extends Component{

  state = {
      username: '',
      password: '',
  }

  render() {
        return (
        <PaperProvider>
            <MenuButton/>

            <View style = {Styles.container}>
                <View style = {Styles.logoBox}>
                    <Text style = {Styles.logo}>
                        EasyClaim
                    </Text>
                </View>
                <View style = {Styles.loginBox}>
                    <CameraButton/>
                </View>
            </View>
        </PaperProvider>
        );
  }
}

