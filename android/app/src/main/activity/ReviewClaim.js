import React, { Component } from 'react';
import { TouchableHighlight, Button, ScrollView,
            TextInput, Text, View, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import ReviewButton from '../component/ReviewButton';
import Styles from '../style/EditStyle';

export default class Main extends Component{

    state = {
        time: this.props.navigation.getParam('item').time,
        date: this.props.navigation.getParam('item').date,
        price: this.props.navigation.getParam('item').price,
        picUri: this.props.navigation.getParam('item').picUri,
    }

    checkEdit = () => {
        if (this.state.date != this.props.navigation.getParam('item').date ||
            this.state.time != this.props.navigation.getParam('item').time) {
            return 2;
        } else if (this.state.price != this.props.navigation.getParam('item').price) {
            // If price is edit
            return 1;
        } else {
            return 0;
        }
    }
    render() {
        if (this.props.navigation.getParam('editing')) {
            return (
                <ScrollView keyboardDismissMode = "on-drag" overScrollMode = "always"
                                style = { Styles.textContainer }>
                    <TouchableHighlight
                        onPress = {() => this.props.navigation.navigate('ShowImage', {fileUri: this.state.picUri})}>
                        <Image
                          source = {{ uri: this.state.picUri }}
                          style = {{ width: 400, height: 350 }}
                        />
                    </TouchableHighlight>
                    <Text style = { Styles.title }>
                        Date:
                    </Text>
                    <TextInput
                        style = { Styles.text }
                        onChangeText = { (date) => this.setState({date}) }
                        value = { this.state.date }/>
                    <Text style = { Styles.title }>
                        Time:
                    </Text>
                    <TextInput
                        style = { Styles.text }
                        onChangeText = { (time) => this.setState({time}) }
                        value = { this.state.time }/>
                    <Text style = { Styles.title }>
                        Price:
                    </Text>
                    <TextInput
                        style = { Styles.text }
                        onChangeText = { (price) => this.setState({price}) }
                        value = { this.state.price }/>
                    <ReviewButton
                        editing = { this.props.navigation.getParam('editing') }
                        checkEdit = { this.checkEdit }
                        date = { this.state.date }
                        originalDate = { this.props.navigation.getParam('item').date }
                        originalTime = { this.props.navigation.getParam('item').time }
                        time = { this.state.time }
                        price = { this.state.price }
                        picUri = { this.state.picUri }/>
                </ScrollView>
            );
        } else {
            return (
                <ScrollView keyboardDismissMode = "on-drag" overScrollMode = "always"
                                style = { Styles.textContainer }>
                    <TouchableHighlight
                        onPress = {() => this.props.navigation.navigate('ShowImage', {fileUri: this.state.picUri})}>
                        <Image
                          source = {{ uri: this.state.picUri }}
                          style = {{ width: 400, height: 350 }}
                        />
                    </TouchableHighlight>
                    <Text style = { Styles.title }>
                        Date:
                    </Text>
                    <Text style = { Styles.text } >
                        { this.state.date }
                    </Text>
                    <Text style = { Styles.title }>
                        Time:
                    </Text>
                    <Text style = { Styles.text }>
                        { this.state.time }
                    </Text>
                    <Text style = { Styles.title }>
                        Price:
                    </Text>
                    <Text style = { Styles.text }>
                        { this.state.price }
                    </Text>
                    <ReviewButton editing = { this.props.navigation.getParam('editing') }/>
                </ScrollView>
            );
        }
    }
}

