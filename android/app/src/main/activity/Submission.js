import React, { Component } from 'react';
import { SectionList, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { Header, Divider, CheckBox } from 'react-native-elements'
import MenuButton from '../component/MenuButton';
import Icon from 'react-native-vector-icons/Feather';
import firebase from 'react-native-firebase';

export default class Submission extends Component{

    state = {
        result: [],
        done: false,
        loading: false,
        checked: false,
        sendDetails: [],
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
            .orderByChild('submitted').equalTo(false)
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
            const current = new Date(date.split(" ")[0]);
            const month = months[current.getMonth()];
            const year = current.getFullYear();
            var item = {"data": [], "title": {date: "", price: "", checked: false}};
            let result = this.state.result;
            var containTitle = false;
            for (each in result) {
                if (result[each].title.date == month + " " + year) {
                   result[each].data.push(this.convertDate(info[date]));
                   result[each].title.price =
                        this.sumPrice(result[each].title.price, info[date].price);
                   containTitle = true;
                }
            }
            // Create new array for the month
            if (containTitle == false) {
                item.title.date = month + " " + year;
                item.title.price = info[date].price;
                item.data.push(this.convertDate(info[date]));
                result.push(item);
            }
            this.setState({ result:  result });
        }
        //this.ascendingSort(this.state.result);
        this.setState({ done: true });
    }

    convertDate(data) {
        let value = data;
        value.date = value.date.split('-').reverse().join('/');
        return value;
    }

    sumPrice = (first, second) => {
        var result = parseFloat(first.substr(1, 4));
        const addValue = parseFloat(second.substr(1, 4));
        result += addValue;
        result = result.toFixed(2);
        return "$" + result ;
    }

    addOrRemoveInfo = (Info) => {
        Info.title.checked = !Info.title.checked
        this.setState({ checked: !this.state.checked});
        if (Info.title.checked == true) {
            let result = this.state.sendDetails;
            result.push(Info.data);
            this.setState({sendDetails: result});
        } else {
            let result = this.state.sendDetails;
            for (data in result) {
                if (result[data] == Info.data) {
                    result.splice(data, 1);
                }
            }
            this.setState({sendDetails: result});
        }
    }

    keyExtractor = (item, index) => item + index;

    renderHeader = ({ section }) => (
        <View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style = {{ flexDirection: 'column' }}>
                <Text style = {{ fontSize: 20, marginLeft: 10 }}>
                    { section.title.date }
                </Text>
                <Text style = {{ marginLeft: 10, fontSize: 15 }}>
                    Total claim: { section.title.price }
                </Text>
            </View>
            <CheckBox
                right
                checkedIcon = 'check-circle-o'
                uncheckedIcon = 'circle-o'
                checked = { section.title.checked }
                onPress = { () => this.addOrRemoveInfo(section) }/>
        </View>
    )

    renderItem = ({ item }) => (
       <>
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
                                editing: true,
                          })}
            />
        </View>
      </View>
      <Divider/>
      </>
    )

    render () {
        return (
            <>
                <Header
                    containerStyle = {{ height: 50, paddingVertical: 20}}
                    leftComponent = {<MenuButton/>}
                    centerComponent = {{ text: 'Submission', style: { fontSize: 20 }}}
                />
                { this.state.done == false &&
                    <View style = {{ height: 600, justifyContent: 'center', flexDirection: 'column' }}>
                        <ActivityIndicator size = { 100 }/>
                        <Text style = {{ fontSize: 15, textAlign: 'center' }}> Getting information </Text>
                    </View>
                }
                { (this.state.done && this.state.result.length < 1) &&
                        <View style = {{ height: 600, justifyContent: 'center' }}>
                            <Text style = {{ textAlign: 'center', fontSize: 20 }}>
                                No claims required to submit !
                            </Text>
                        </View>
                }
                { this.state.done && this.state.checked &&
                    <SectionList
                        renderItem = { this.renderItem }
                        renderSectionHeader = { this.renderHeader }
                        sections = { this.state.result }
                        keyExtractor = { this.keyExtractor }
                    />
                }
                { this.state.done && !this.state.checked &&
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