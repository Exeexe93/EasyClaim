import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
      modalVisible: false,
    };
    this.onDateChange = this.onDateChange.bind(this);
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
    const { selectedStartDate, selectedEndDate } = this.state;
    const currentDate = new Date();
    const minDate = new Date(currentDate.getFullYear() - 5,
                        currentDate.getMonth, currentDate.getDate());
    const maxDate = currentDate;
    const startDate  =  selectedStartDate ? this.getStartDate() : '';
    const endDate = selectedEndDate ? this.getEndDate() : '';

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
                <View style = { styles.container }>
                    <View style = { styles.date }>
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
                      todayBackgroundColor = "#f2e6ff"
                      selectedDayColor = "#7300e6"
                      selectedDayTextColor = "#FFFFFF"
                      onDateChange = { this.onDateChange }
                    />

                    <Button
                        buttonStyle = { styles.button }
                        title = "Search"
                        onPress = { () => this.checkDates(startDate, endDate)}
                    />
                </View>
            </Modal>
        </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F9FF',
    width: '100%',
    height: '60%'
  },
  date: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'
  },
  button: {
    backgroundColor: 'skyblue',
    borderRadius: 30,
    width: 150
  }
});