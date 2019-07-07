import React, { Component } from 'react';
import { Button, ScrollView, TextInput, Text, View, StyleSheet} from 'react-native';
import { Avatar, Image } from 'react-native-elements';
import Styles from '../style/EditStyle';
import ClaimButton from '../component/ClaimButton';

export default class FillClaims extends Component{
    state = {
        date: global.date,
        time: global.time,
        price: global.price,
    }

    render() {
        return (
            <ScrollView keyboardDismissMode = "on-drag" overScrollMode = "always"
                                        style = { Styles.container }>
                <Avatar
                  rounded
                  size = { 200 }
                  containerStyle = {{ alignSelf: 'center', marginVertical: 30 }}
                  onPress = { () => this.props.navigation.navigate('ShowImage', { fileUri: global.FileUri })}
                  source = {{
                    uri:
                      global.FileUri
                  }}
                />
                <View style = { Styles.textContainer }>
                    <Text style = { Styles.title }>
                        Date:
                    </Text>
                    <TextInput
                        style = { Styles.text }
                        placeholder = { 'dd/mm/yyyy' }
                        onChangeText={(date) => this.setState({date})}
                        value = {this.state.date}/>
                    <Text style = { Styles.title }>
                        Time:
                    </Text>
                    <TextInput
                        style = { Styles.text }
                        placeholder = { 'hh:mm' }
                        onChangeText = { (time) => this.setState({time}) }
                        value = { this.state.time }/>
                    <Text style = { Styles.title }>
                        Price:
                    </Text>
                    <TextInput
                        style = { Styles.text }
                        placeholder = { '$0.00' }
                        onChangeText={(price) => this.setState({price})}
                        value = {this.state.price}/>
                </View>
                <ClaimButton
                    date = {this.state.date}
                    price = {this.state.price}
                    time = {this.state.time} />
             </ScrollView>
        );
    }
}

