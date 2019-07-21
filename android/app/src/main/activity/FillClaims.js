import React, { Component } from 'react';
import { Button, ScrollView, Text, View, StyleSheet} from 'react-native';
import { Input, Avatar, Image } from 'react-native-elements';
import Styles from '../style/EditStyle';
import ClaimButton from '../component/ClaimButton';

export default class FillClaims extends Component{
    state = {
        date: this.props.navigation.getParam('date'),
        time: this.props.navigation.getParam('time'),
        price: this.props.navigation.getParam('price'),
        uri: this.props.navigation.getParam('uri'),
        invalidDate: false,
        invalidPrice: false,
        invalidTime: false,
    }

    checkClaim = () =>
    {
        let valid = false;
        // regular expression to match required date format
        dFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

        if (this.state.date.trim() != '') {
            if (new Date(this.formatDate(this.state.date)) == 'Invalid Date') {
                this.setState({ invalidDate: true });
                valid = true;
            } else {
                this.setState({ invalidDate: false });
            }
        } else {
                this.setState({ invalidDate: true });
                valid = true;
        }

        // regular expression to match required time format
        tFormat = /^\d{1,2}\:\d{2}$/;

        if (this.state.time.trim() != '') {
            if (this.state.time.match(tFormat)) {
                regs = this.state.time.split(':');
                if (regs[0] > 23) {
                    this.setState({ invalidTime: true });
                    valid = true;
                } else {
                    this.setState({ invalidTime: false });
                }
                if (regs[1] > 59) {
                    this.setState({ invalidTime: true });
                    valid = true;
                }
            } else {
                this.setState({ invalidTime: true });
                valid = true;
            }
        } else {
              this.setState({ invalidTime: true });
              valid = true;
        }

       pFormat = /^\$\d{1,3}\.\d{2}$/;
       if ((this.state.price != '' && !this.state.price.match(pFormat)) || this.state.price.trim() == '') {
          this.setState({ invalidPrice: true });
          valid = true;
       } else {
           this.setState({ invalidPrice: false });
       }
       return valid;
    }

    formatDate(date) {
        return date.split('/').reverse().join('-');
    }

    render() {
        return (
            <ScrollView keyboardDismissMode = "on-drag" overScrollMode = "always"
                                        style = { Styles.container }>
                <Avatar
                  rounded
                  size = { 200 }
                  containerStyle = { Styles.avatar }
                  onPress = { () => this.props.navigation.navigate('ShowImage', { fileUri: this.state.uri })}
                  source = {{ uri: this.state.uri }}
                />
                <View style = { Styles.textContainer }>
                    <Input
                        label = 'Date'
                        placeholder = 'dd/mm/yyyy'
                        labelStyle = { Styles.label }
                        inputStyle = { Styles.text }
                        containerStyle = { Styles.inputContainer }
                        errorMessage = {this.state.invalidDate? 'Please input date in dd/mm/yyyy' : ''}
                        errorStyle = { Styles.error }
                        onChangeText = { (date) => this.setState({date}) }
                        value = { this.state.date }/>
                    <Input
                        label = 'Time'
                        placeholder = 'hh:mm'
                        labelStyle = { Styles.label }
                        inputStyle = { Styles.text }
                        containerStyle = { Styles.inputContainer }
                        errorMessage = {this.state.invalidTime? 'Please input time in hh:mm' : ''}
                        errorStyle = { Styles.error }
                        onChangeText = { (time) => this.setState({time}) }
                        value = { this.state.time }/>
                    <Input
                        label = 'Price'
                        placeholder = '$0.00'
                        labelStyle = { Styles.label }
                        inputStyle = { Styles.text }
                        containerStyle = { Styles.inputContainer }
                        errorMessage = {this.state.invalidPrice? 'Please input price in $0.00' : ''}
                        errorStyle = { Styles.error }
                        onChangeText = { (price) => this.setState({price}) }
                        value = { this.state.price }/>
                </View>
                <ClaimButton
                    date = {this.state.date}
                    price = {this.state.price}
                    time = {this.state.time}
                    uri = {this.state.uri}
                    validate = { this.checkClaim }/>
             </ScrollView>
        );
    }
}

