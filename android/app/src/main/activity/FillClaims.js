import React, { Component } from 'react';
import { Button, ScrollView, TextInput, Text, View, StyleSheet} from 'react-native';
import { Image } from 'react-native-elements';
import Styles from '../style/EditStyle';
import ClaimButton from '../component/ClaimButton';

export default class Main extends Component{

    render() {
        return (

            <ScrollView keyboardDismissMode = "on-drag" overScrollMode = "always"
                                        style = { Styles.container }>
                <Image
                  source = {require('../assets/image/receipt.jpg')}
                  style = {{ width: 400, height: 250 }}
                />
                <View style = { Styles.textContainer }>
                    <Text style = { Styles.title }>
                        Date:
                    </Text>
                    <TextInput placeholder = 'value1' style = { Styles.text }/>
                    <Text style = { Styles.title }>
                        Time:
                    </Text>
                    <TextInput placeholder = 'value2' style = { Styles.text }/>
                    <Text style = { Styles.title }>
                        Price:
                    </Text>
                    <TextInput placeholder = 'value3' style = { Styles.text }/>
                    <ClaimButton/>
                </View>
             </ScrollView>
        );
    }
}

