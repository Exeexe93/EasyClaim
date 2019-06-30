import React, { Component } from 'react';
import { Button, ScrollView, TextInput, Text, View, StyleSheet} from 'react-native';
import { Image } from 'react-native-elements';
import ReviewButton from '../component/ReviewButton';
import Styles from '../style/EditStyle';

export default class Main extends Component{

  render() {
        const { navigation } = this.props;
        const item = navigation.getParam('item');

        return (
            <ScrollView keyboardDismissMode = "on-drag" overScrollMode ="always"
                            style = { Styles.textContainer }>
                <Image
                  source = {{ uri: item.picUri }}
                  style = {{ width: 400, height: 350 }}
                />
                <Text style = { Styles.title }>
                    Date:
                </Text>
                <Text style = { Styles.text } >
                    { item.date }
                </Text>
                <Text style = { Styles.title }>
                    Time:
                </Text>
                <Text style = { Styles.text }>
                    { item.time }
                </Text>
                <Text style = { Styles.title }>
                    Price:
                </Text>
                <Text style = { Styles.text }>
                    { item.price }
                </Text>
                <ReviewButton/>
            </ScrollView>
        );
  }
}

