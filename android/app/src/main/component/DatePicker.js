import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, Alert } from 'react-native';
import { Button, Icon, Header, ButtonGroup } from 'react-native-elements';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import Styles from '../style/DatePickerStyle';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
      modalVisible: false,
      selectedIndex: null,
    };
    this.updateIndex = this.updateIndex.bind(this);
    this.allocateDate = this.allocateDate.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {
    this.initialiseDate();
  }

  initialiseDate() {
    moment.updateLocale('en', {
        week: {
            dow: 1,
        },
    })
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex});
    this.allocateDate(selectedIndex);
    console.log(selectedIndex);
  }

  allocateDate(index) {

    const today = moment();

    if (index == 0) {
        this.setState({ selectedStartDate: today, selectedEndDate: today});
    } else if (index == 1) {
        this.setState({ selectedStartDate: moment(today.startOf('week')), selectedEndDate: moment(today.endOf('week'))});
    } else {
        this.setState({
            selectedStartDate: moment(today.startOf('month')),
            selectedEndDate: moment(today.endOf('month'))});
    }
  }

  setModalVisible = () => this.setState({ modalVisible: true });

  onDateChange(date, type) {
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }

  getStartDate = () => {
    return this.state.selectedStartDate.format("DD/MM/YYYY").toString();
  }

  getEndDate = () => {
    return this.state.selectedEndDate.format("DD/MM/YYYY").toString();
  }

  checkDates(startDate, endDate) {
        if (endDate == '') {
            Alert.alert(
              'End date required',
              'Please select end date',
              [
                {text: 'OK', onPress: () => {} },
              ],
              {cancelable: false},
            );
        } else {
            this.setState({ modalVisible: false });
            this.props.getSearchDates(startDate, endDate);
        }
  }

  render() {
    const { selectedStartDate, selectedEndDate, selectedIndex } = this.state;
    const currentDate = new Date();
    const minDate = new Date(currentDate.getFullYear() - 5,
                        currentDate.getMonth, currentDate.getDate());
    const maxDate = currentDate;
    const startDate  =  selectedStartDate ? this.getStartDate() : '';
    const endDate = selectedEndDate ? this.getEndDate() : '';

    const buttons = ['Today', 'This Week', 'This month'];

    return (
        <>
            <Icon
                type = 'material'
                name = 'search'
                size = { 30 }
                underlayColor = 'transparent'
                onPress = { this.setModalVisible }
            />
            <Modal
              animationType = "slide"
              transparent = { false }
              visible = { this.state.modalVisible }
            >

                <View style = { Styles.container }>
                    <Header
                        containerStyle = { Styles.headerContainer }
                        leftComponent = {
                            <Icon
                                 name = 'back'
                                 type = 'entypo'
                                 size = { 25 }
                                 onPress = { () => this.setState({ modalVisible: false })}
                            />
                        }
                    />
                    <ButtonGroup
                      onPress={this.updateIndex}
                      selectedIndex = { selectedIndex }
                      buttons = { buttons }
                      containerStyle = { Styles.buttonContainer }
                      textStyle = { Styles.text }
                    />
                    <View style = { Styles.date }>
                        <View>
                            <Text>  Start Date </Text>
                            <Text>{ startDate }</Text>
                        </View>
                        <View>
                            <Text>  End Date </Text>
                            <Text>{ endDate }</Text>
                        </View>
                    </View>
                    <CalendarPicker
                      startFromMonday = { true }
                      allowRangeSelection = { true }
                      minDate = { minDate }
                      maxDate = { maxDate }
                      selectedStartDate = { selectedStartDate }
                      selectedEndDate = { selectedEndDate }
                      todayBackgroundColor = "#f066b9"
                      selectedDayColor = "#7300e6"
                      selectedDayTextColor = "#FFFFFF"
                      onDateChange = { this.onDateChange }
                    />

                    <Button
                        buttonStyle = { Styles.button }
                        title = "Search"
                        onPress = { () => this.checkDates(startDate, endDate)}
                    />
                </View>
            </Modal>
        </>
    );
  }
}