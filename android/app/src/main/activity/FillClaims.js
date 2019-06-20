import React, { Component } from 'react';
import { Button, ScrollView, TextInput, Text, View, StyleSheet} from 'react-native';
import { Avatar, Image } from 'react-native-elements';
import Styles from '../style/EditStyle';
import ClaimButton from '../component/ClaimButton';

export default class FillClaims extends Component{

    render() {
        return (

            <ScrollView keyboardDismissMode = "on-drag" overScrollMode = "always"
                                        style = { Styles.container }>
                <Avatar
                  rounded
                  size = "xlarge"
                  containerStyle = {{ alignSelf: 'center' }}
                  onPress = { () => this.props.navigation.navigate('ShowImage')}
                  source = {{
                    uri:
                      global.FileUri
                  }}
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

