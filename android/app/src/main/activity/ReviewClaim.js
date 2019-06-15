import React, { Component } from 'react';
import { Button, ScrollView, TextInput, Text, View, StyleSheet} from 'react-native';
import { Image } from 'react-native-elements';
import ReviewButton from '../component/ReviewButton';
import Styles from '../style/EditStyle';

export default class Main extends Component{

  render() {
        return (
            <ScrollView keyboardDismissMode = "on-drag" overScrollMode ="always"
                            style = { Styles.textContainer }>
                <Image
                  source = {{uri: 'https://mothership.sg/wp-content/uploads/2015/02/10169165_10203599641304216_69228669637295842_n.jpg'}}
                  style = {{ width: 400, height: 250 }}
                />
                <Text style = { Styles.title }>
                    Date:
                </Text>
                <Text style = { Styles.text } >
                    12/06/2018
                </Text>
                <Text style = { Styles.title }>
                    Time:
                </Text>
                <Text style = { Styles.text }>
                    12:59
                </Text>
                <Text style = { Styles.title }>
                    Price:
                </Text>
                <Text style = { Styles.text }>
                    $3.56
                </Text>
                <ReviewButton/>
            </ScrollView>
        );
  }
}

