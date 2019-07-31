import React, { Component } from 'react';
import { FlatList, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { ListItem, Header } from 'react-native-elements'
import MenuButton from '../component/MenuButton';
import Icon from 'react-native-vector-icons/Feather';
import firebase from 'react-native-firebase';
import DatePicker from '../component/DatePicker';
import moment from 'moment';

export default class History extends Component{

    state = {
        data: [],
        done: false,
        loading: false,
    };

    componentDidMount() {
        this.refresh = this.props.navigation.addListener("didFocus", this.getJsonFile);
    }

    componentWillUnmount() {
        this.refresh.remove();
    }

    getJsonFile = () => {
        if (this.props.navigation.getParam('refresh')) {

            // Calcualate today date and three month before
            const today = moment().format('YYYY-MM-DD');
            const threeMonth = moment().startOf('month').subtract(2, 'months').format('YYYY-MM-DD');

            this.setState({data: [], done: false});
            firebase.database().ref("Transport Claim/" + global.currentId)
            .orderByChild('Date').startAt(threeMonth).endAt(today)
            .once('value').then((data) => {
                    this.getInfo(data.toJSON());
                }
            );
        }
    };

    getRangeDate = (startDate, endDate) => {
        this.setState({data: [], done: false});
        firebase.database().ref("Transport Claim/" + global.currentId)
            .orderByChild('Date').startAt(startDate).endAt(endDate)
            .once('value').then((data) => {
                this.getInfo(data.toJSON());
            }
        );
    }

    getInfo = (info) => {
        for (date in info) {
                let result = this.state.data;
                result.push(info[date]);
                this.setState({ data:  result });
        }
        this.ascendingSort(this.state.data);
        this.setState({ done: true });
    }

    ascendingSort = (data) => {
        var result = data;

        // Convert the date into dd/mm/yyyy instead of yyyy-mm-dd
        for (item in result) {
            result[item].Date = result[item].Date.split('-').reverse().join('/');
        }
        this.setState({ data: result });
    }

    getSearchDates = (startDate, endDate) => {
        this.getRangeDate(this.formatDate(startDate), this.formatDate(endDate));
    }

    formatDate(date) {
        // Convert from dd/mm/yyyy to yyyy-mm-dd
        return date.split('/').reverse().join('-');
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
      <ListItem
        containerStyle = {{ backgroundColor: '#F1F9FF' }}
        bottomDivider =  {true }
        title = { item.Date }
        subtitle = { item.Amount }
        rightIcon = {<Icon name = "arrow-right" size = { 15 }
            onPress = {() => this.props.navigation.navigate('ReviewClaim', {
                            item: item,
                      })}/>}
      />
    )

    render () {
        return (
            <>
                <Header
                    containerStyle = {{ height: 50, paddingVertical: 20}}
                    leftComponent = {<MenuButton/>}
                    centerComponent={{ text: 'History', style: { fontSize: 20 }}}
                    rightComponent = {<DatePicker getSearchDates = {this.getSearchDates} />}
                />
                { this.state.done == false &&
                    <View style = {{ height: 600, justifyContent: 'center' }}>
                        <ActivityIndicator size = { 100 }/>
                    </View>
                }
                { (this.state.done && this.state.data.length < 1) &&
                        <View style = {{ height: 600, justifyContent: 'center' }}>
                            <Text style = {{ textAlign: 'center', fontSize: 20 }}>
                                No claim found !
                            </Text>
                        </View>
                }
                { this.state.done &&
                    <FlatList
                          keyExtractor = { this.keyExtractor }
                          data = { this.state.data }
                          renderItem = { this.renderItem }
                    />
                }

                </>
        );
    }
}

