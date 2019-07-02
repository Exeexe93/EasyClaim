import React, { Component } from 'react';
import { FlatList, ScrollView, Text, View, ActivityIndicator} from 'react-native';
import { ListItem, Header } from 'react-native-elements'
import MenuButton from '../component/MenuButton';
import Icon from 'react-native-vector-icons/Feather';
import firebase from 'react-native-firebase';

export default class History extends Component{

    state = {
        data: [],
        done: false,
    };

    componentDidMount() {
        this.refresh = this.props.navigation.addListener("didFocus", this.getJsonFile);
    }

    componentWillUnmount() {
        this.refresh.remove();
    }

    getJsonFile = () => {
        this.setState({data: [], done: false});
        firebase.database().ref("Transport Claim/"
            + global.currentId).once('value').then((data) => {
                this.getInfo(data.toJSON());
            });
        };

    getInfo(info) {
        for (year in info) {
            for (month in info[year]) {
                for (day in info[year][month]) {
                    let result = this.state.data;
                    result.push(info[year][month][day]);
                    this.setState({ data:  result });
                }
            }
        }
        this.ascendingSort(this.state.data);
        this.setState({ done: true });
    }

    ascendingSort(data) {
        var result = data;

        function compare(a, b) {
            var aDate = new Date(a.date.split('/').reverse().join('/'));
            var bDate = new Date(b.date.split('/').reverse().join('/'));
            return  bDate - aDate;
        }
        result.sort((a, b) => compare(a, b));
        this.setState({ data, result });
        console.log(this.state.data);
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
      <ListItem
        containerStyle = {{backgroundColor: '#F1F9FF'}}
        bottomDivider = {true}
        title = { item.date }
        subtitle = { item.price }
        rightIcon = {<Icon name = "arrow-right" size = {15}
            onPress = {() => this.props.navigation.navigate('ReviewClaim', {
                            item: item,
                      })}/>}
      />
    )

    render () {
        return (
            <ScrollView style = {{ flex:1, backgroundColor: '#F1F9FF'}}>
                <Header
                    containerStyle = {{ height: 50, paddingVertical: 20}}
                    leftComponent = {<MenuButton/>}
                />
                { this.state.done == false &&
                    <View style = {{ height: 600, justifyContent: 'center' }}>
                    <ActivityIndicator size = { 100 }/>
                    </View>}
                {this.state.done &&
                    <FlatList
                          keyExtractor = { this.keyExtractor }
                          data = { this.state.data }
                          renderItem = { this.renderItem }
                    />
                }
            </ScrollView>
        );
    }
}

