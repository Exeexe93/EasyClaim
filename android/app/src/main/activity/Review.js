import React, { Component } from 'react';
import { TextInput, Text, View, StyleSheet} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import MenuButton from '../component/MenuButton';

export default class Review extends Component{

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

