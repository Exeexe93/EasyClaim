import React, { Component } from 'react';
import { FlatList, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { ListItem, Header } from 'react-native-elements'
import MenuButton from '../component/MenuButton';
import Icon from 'react-native-vector-icons/Feather';
import firebase from 'react-native-firebase';
import DatePicker from '../component/DatePicker';

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
            this.setState({data: [], done: false});
            firebase.database().ref("Transport Claim/" + global.currentId)
            .once('value').then((data) => {
                    this.getInfo(data.toJSON());
                }
            );
        }
    };

    getRangeDate = (startDate, endDate) => {
        this.setState({data: [], done: false});
        firebase.database().ref("Transport Claim/" + global.currentId)
            .orderByChild('date').startAt(startDate).endAt(endDate)
            .once('value').then((data) => {
                this.getInfo(data.toJSON());
            }
        );
    }

    getInfo = (info) => {
        for (date in info) {
            //for (time in info[date]) {
                let result = this.state.data;
                result.push(info[date]);
                this.setState({ data:  result });
            //}
        }
        this.ascendingSort(this.state.data);
        this.setState({ done: true });
    }

    ascendingSort = (data) => {
        var result = data;

        //function compare(a, b) {
        //    return  b.date - a.date;
        //
        //result.sort((a, b) => compare(a, b));
        // Convert the date into dd/mm/yyyy instead of yyyy-mm-dd
        for (item in result) {
            result[item].date = result[item].date.split('-').reverse().join('/');
        }
        this.setState({ data: result });
    }

    getSearchDates = (startDate, endDate) => {
        this.getRangeDate(this.formatDate(startDate), this.formatDate(endDate));
    }

    formatDate(date) {
        return date.split('/').reverse().join('-');
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
      <ListItem
        containerStyle = {{ backgroundColor: '#F1F9FF' }}
        bottomDivider =  {true }
        title = { item.date }
        subtitle = { item.price }
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
                                Yeah ! No Claim !
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

