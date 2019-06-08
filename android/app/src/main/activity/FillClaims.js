import React, { Component } from 'react';
import { TextInput, Text, View, StyleSheet} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import CameraButton from '../component/CameraButton';
import MenuButton from '../component/MenuButton';
import Styles from '../style/EditStyle';

export default class Main extends Component{

//  var date = "15/05/2019";
//  var time = "15:13";
//  var price = 19;

  render() {
        return (
        <PaperProvider>
            <View style = {Styles.container}>
                <View style = { Styles.ImageContainer }>
                    <Text>
                        This is pic
                    </Text>
                </View>
                <View style = { Styles.textContainer }>
                    <Text style = { Styles.title }>
                        Date:
                    </Text>
                    <TextInput style = { Styles.text }>
                        value1
                    </TextInput>
                    <Text style = { Styles.title }>
                        Time:
                    </Text>
                    <TextInput style = { Styles.text }>
                         value2
                    </TextInput>
                    <Text style = { Styles.title }>
                        Price:
                    </Text>
                    <TextInput style = { Styles.text }>
                         value3
                    </TextInput>
                </View>
            </View>
        </PaperProvider>
        );
  }
}

