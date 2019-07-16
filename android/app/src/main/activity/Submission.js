import React, { Component } from 'react';
import { SectionList, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { Header } from 'react-native-elements'
import MenuButton from '../component/MenuButton';
import Icon from 'react-native-vector-icons/Feather';
import firebase from 'react-native-firebase';

export default class Submission extends Component{

    state = {
        result: [],
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
            this.setState({result: [], done: false});
            firebase.database().ref("Transport Claim/" + global.currentId)
            .once('value').then((data) => {
                    this.getInfo(data.toJSON());
                }
            );
        }
    };

    getInfo = (info) => {
        const months = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        // Structure for the section

        for (date in info) {
            // Finding the month for the date
            const current = new Date(date);
            const month = months[current.getMonth()];
            const year = current.getFullYear();
            for (time in info[date]) {
                var item = {"data": [], "title": ""};
                let result = this.state.result;
                var containTitle = false;
                for (each in result) {
                    if (result[each].title == month + " " + year) {
                       result[each].data.push(info[date][time]);
                       containTitle = true;
                    }
                }
                // Create new array for the month
                if (containTitle == false) {
                    item.title = month + " " + year;
                    item.data.push(info[date][time]);
                    result.push(item);
                }
                this.setState({ result:  result });
            }
        }
        //this.ascendingSort(this.state.result);
        this.setState({ done: true });
    }

    /*ascendingSort = (data) => {
        var result = data;

        //function compare(a, b) {
        //    return  b.date - a.date;
        //
        //result.sort((a, b) => compare(a, b));
        // Convert the date into dd/mm/yyyy instead of yyyy-mm-dd
        for (item in result) {
            result[item].date = result[item].date.split('-').reverse().join('/');
        }
        this.setState({ result: result });
    }*/

    keyExtractor = (item, index) => item + index;

    renderHeader = ({ section }) => (
        <Text style = {{ color: 'blue', fontSize: 20, textAlign: 'center' }}>
            { section.title }
        </Text>
    )
    renderItem = ({ item }) => (
      <View style = {{ backgroundColor: '#F1F9FF', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style = {{ flexDirection: 'column', marginLeft: 10 }}>
            <Text style = {{ fontSize: 18 }}>
                { item.date }
            </Text>
            <Text style = {{ fontSize: 15 }}>
                { item.price }
            </Text>
        </View>
        <View style = {{ alignSelf: 'center', marginRight: 10 }}>
            <Icon
                name = "arrow-right" size = { 15 }
                onPress = {() => this.props.navigation.navigate('ReviewClaim', {
                                item: item,
                          })}
            />
        </View>
      </View>
    )

    render () {
        return (
            <>
                <Header
                    containerStyle = {{ height: 50, paddingVertical: 20}}
                    leftComponent = {<MenuButton/>}
                    centerComponent={{ text: 'Submission', style: { fontSize: 20 }}}
                />
                { this.state.done == false &&
                    <View style = {{ height: 600, justifyContent: 'center' }}>
                        <ActivityIndicator size = { 100 }/>
                    </View>
                }
                { (this.state.done && this.state.result.length < 1) &&
                        <View style = {{ height: 600, justifyContent: 'center' }}>
                            <Text style = {{ textAlign: 'center', fontSize: 20 }}>
                                No claims required to submit !
                            </Text>
                        </View>
                }
                { this.state.done &&
                    <SectionList
                        renderItem = { this.renderItem }
                        renderSectionHeader = { this.renderHeader }
                        sections = { this.state.result }
                        keyExtractor = { this.keyExtractor }
                    />
                }

            </>
        );
    }
}

