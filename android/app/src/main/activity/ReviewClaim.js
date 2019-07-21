import React, { Component } from 'react';
import { TouchableHighlight, Button, ScrollView,
            Text, View, StyleSheet } from 'react-native';
import { Input, Image, Header } from 'react-native-elements';
import ReviewButton from '../component/ReviewButton';
import DeleteIcon from '../component/DeleteIcon';
import Styles from '../style/EditStyle';

export default class Main extends Component{

    state = {
        time: this.props.navigation.getParam('item').time,
        date: this.props.navigation.getParam('item').date,
        price: this.props.navigation.getParam('item').price,
        picUri: this.props.navigation.getParam('item').picUri,
        invalidDate: false,
        invalidPrice: false,
        invalidTime: false,
    }

    checkForm = () =>
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
           if (this.state.price.trim() != '' && !this.state.price.match(pFormat)) {
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
                <>
                    <Header
                        containerStyle = { Styles.header }
                        rightComponent =
                        {
                            <DeleteIcon
                                time = { this.props.navigation.getParam('item').time }
                                date = { this.props.navigation.getParam('item').date }/>
                        }
                    />
                    <ScrollView keyboardDismissMode = "on-drag" overScrollMode = "always"
                                    style = { Styles.textContainer }>
                        <TouchableHighlight
                            onPress = {() => this.props.navigation.navigate('ShowImage', {fileUri: this.state.picUri})}>
                            <Image
                              source = {{ uri: this.state.picUri }}
                              style = { Styles.picture }
                            />
                        </TouchableHighlight>
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
                        <ReviewButton
                            editing = { this.props.navigation.getParam('editing') }
                            checkEdit = { this.checkEdit }
                            date = { this.state.date }
                            originalDate = { this.props.navigation.getParam('item').date }
                            originalTime = { this.props.navigation.getParam('item').time }
                            time = { this.state.time }
                            price = { this.state.price }
                            picUri = { this.state.picUri }
                            validate = { this.checkForm }/>
                    </ScrollView>
                </>
            );
        } else {
            return (
                <ScrollView keyboardDismissMode = "on-drag" overScrollMode = "always"
                                style = { Styles.textContainer }>
                    <TouchableHighlight
                        onPress = {() => this.props.navigation.navigate('ShowImage', {fileUri: this.state.picUri})}>
                        <Image
                          source = {{ uri: this.state.picUri }}
                          style = { Styles.picture }
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

